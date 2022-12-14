const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');
const app = express();
const timeout = require('connect-timeout'); // express v4
const rateLimit = require('express-rate-limit');
const { JSHINT } = require('jshint');

console.log(process.env.PROJECT_DOMAIN);
const PROJECT_URL = `https://${process.env.PROJECT_DOMAIN}.glitch.me/`;
console.log(PROJECT_URL);

// run the same functions on the front & back
const f = require('./public/funs');

// set up rate limiter: maximum of 10 requests per 30 seconds
const limiter = rateLimit({
  // 30 seconds
  windowMs: 30 * 1000,
  max: 10,
  // Return rate limit info in the `RateLimit-*` headers
  standardHeaders: true,
  // Disable the `X-RateLimit-*` headers
  legacyHeaders: false
});

app.use(timeout(1200000));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// apply rate limiter to all requests
app.use(limiter);
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});

const year = 2022;
const days = ['zero',
  'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
  'twentyone', 'twentytwo', 'twentythree', 'twentyfour', 'twentyfive'
];

let dayTemplate = '';
fs.readFile(path.join(__dirname, 'views/day.ntl'), function (err, content) {
  if (err) {
    console.log(err);
  }
  dayTemplate = content.toString();
});

// this template-replacer code keeps working
const keyFinder = /\{\{(\w+)\}\}/ig;
const GetFormattedString = (templateString, valueObject) => {
  return templateString.replace(keyFinder, (subString, group1 /*, offset, inputString */) => {
    return valueObject[group1] || '';
  });
};

app.engine('ntl', (filePath, options, callback) => { // define the template engine
  // this is an extremely simple template engine
  const rendered = GetFormattedString(dayTemplate, options);
  return callback(null, rendered);
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine

const dayStats = [];
// bind 25 days of html files, and post functions for both parts of each
for (let d = 1; d <= 25; d++) {
  const digit = d;
  // string day, leading zero
  const dd = '' + d;
  const day = dd.padStart(2, '0');

  // redirect previous urls for awhile
  app.get('/day' + day, function (request, response) {
    // response.sendFile(__dirname + "/views/day" + day + ".html");
    response.redirect('/day/' + day);
  });

  app.get('/day/' + day, (req, res) => {
    res.render('day', {
      title: days[digit],
      description: 'AOC ' + year + ', day ' + days[digit],
      prev_url: digit <= 1 ? '/' : '/day/' + ('' + (digit - 1)).padStart(2, '0'),
      next_url: digit >= 25 ? '/' : '/day/' + ('' + (digit + 1)).padStart(2, '0'),
      year: year,
      day: day,
      day_num: dd
    });
  });

  app.get('/input/' + d, (req, browserResponse) => {
    const url = 'https://adventofcode.com/' + year + '/day/' + d + '/input';
    const options = {
      headers: {
        Cookie: 'session=' + process.env.SESSION
      }
    };
    https.get(url, options, getResponse => {
      let rawData = '';

      getResponse.on('data', chunk => {
        rawData += chunk;
      });

      getResponse.on('end', () => {
        browserResponse.status(200).json({ input: rawData });
      });
    });
  });
  const partStats = [];
  for (let p = 1; p <= 2; p++) {
    // string part
    const part = '' + p;
    const fun = f.funs(dd, part);
    partStats.push(fun.toString());
    app.post('/day' + day + 'part' + p, function (request, response) {
      // name of the timer
      const timer = 'day ' + dd + ', part ' + part;
      console.time(timer);

      // pass in string of day number and part, and send the request body's imput param to that function
      const answer = fun(request.body.input);

      console.log(answer);
      console.timeEnd(timer);

      // respond with the json that includes the answer
      response.status(200).json({ output: answer });
    });
  }
  dayStats.push(partStats);
}

// secret page of /stats
fs.readFile(path.join(__dirname, 'views/stats.ntl'), function (err, content) {
  if (err) {
    console.log(err);
  }
  let maxChars = 0;
  let maxLines = 0;
  let maxComplex = 0;
  const jsStats = dayStats.reduce((a, d) => {
    const day = d.reduce((aa, p) => {
      JSHINT('const f = ' + p + ';', {
        esversion: 6,
        strict: 'implied',
        undef: true,
        devel: true
      }, {});
      const part = {
        charCount: p.length - 8,
        lineCount: p.split('\n').length,
        complex: JSHINT.data().functions[0].metrics.complexity
      };
      aa.push(part);
      maxChars = Math.max(maxChars, part.charCount);
      maxLines = Math.max(maxLines, part.lineCount);
      maxComplex = Math.max(maxComplex, part.complex);    
      return aa;
    }, []);

    a.push(day);
    return a;
  }, []);
  const statHtml = jsStats.reduce((a, d, i) => {
    const key = 'day_' + (i + 1);
    const p1 = d[0];
    const p2 = d[1];
    const hasPart1 = p1 && p1.charCount > 0 && p1.lineCount > 0;
    const hasPart2 = p2 && p2.charCount > 0 && p2.lineCount > 0;
    if (hasPart1 || hasPart2) {
      a += "<li id='" + key + "'><strong>day " + (i + 1) + "</strong><ol><li id='" + key + "_part_1'>part 1 ";

      if (hasPart1) {
        a += "<b id='" + key + "_part_1_chars' style='width:" + (100 * p1.charCount / maxChars) + "%' title='" + Math.round(100 * p1.charCount / maxChars) + "%'>" + p1.charCount + ' chars</b> ';
        a += "<b id='" + key + "_part_1_lines' style='width:" + (100 * p1.lineCount / maxLines) + "%' title='" + Math.round(100 * p1.lineCount / maxLines) + "%'>" + p1.lineCount + ' lines</b>';
        a += "<b id='" + key + "_part_1_complex' style='width:" + (100 * p1.complex / maxComplex) + "%' title='" + Math.round(100 * p1.complex / maxComplex) + "%'>" + p1.complex + ' complexity</b>';
      }

      a += "</li><li id='" + key + "_part_2'>part 2 ";

      if (hasPart2) {
        a += "<b id='" + key + "_part_2_chars' style='width:" + (100 * p2.charCount / maxChars) + "%' title='" + Math.round(100 * p2.charCount / maxChars) + "%'>" + p2.charCount + ' chars</b> ';
        a += "<b id='" + key + "_part_2_lines' style='width:" + (100 * p2.lineCount / maxLines) + "%' title='" + Math.round(100 * p2.lineCount / maxLines) + "%'>" + p2.lineCount + ' lines</b>';
        a += "<b id='" + key + "_part_2_complex' style='width:" + (100 * p2.complex / maxComplex) + "%' title='" + Math.round(100 * p2.complex / maxComplex) + "%'>" + p2.complex + ' complexity</b>';
      }

      a += '</li></ol></li>';
    }

    return a;
  }, '<ol>') + '</ol>';

  const htmlTemplate = content.toString();
  const html = GetFormattedString(htmlTemplate, { 0: statHtml });
  app.get('/stats', function (request, response) {
    response.send(html);
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('This cool app is listening on port ' + listener.address().port);
});
