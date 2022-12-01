const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const timeout = require('connect-timeout'); // express v4
const RateLimit = require('express-rate-limit');

console.log(process.env.PROJECT_DOMAIN);
const PROJECT_URL = `https://${process.env.PROJECT_DOMAIN}.glitch.me/`;
console.log(PROJECT_URL);

// run the same functions on the front & back
const f = require('./public/funs');

// set up rate limiter: maximum of 10 requests per 30 seconds
const limiter = new RateLimit({
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

  for (let p = 1; p <= 2; p++) {
    // string part
    const part = '' + p;
    app.post('/day' + day + 'part' + p, function (request, response) {
      // name of the timer
      const timer = 'day ' + dd + ', part ' + part;
      console.time(timer);

      // pass in string of day number and part, and send the request body's imput param to that function
      const answer = f.funs(dd, part)(request.body.input);

      console.log(answer);
      console.timeEnd(timer);

      // respond with the json that includes the answer
      response.status(200).json({ output: answer });
    });
  }
}

// secret page of /stats
let funsJs = '';
let funsJsCounts = null;
fs.readFile(path.join(__dirname, 'public/funs.js'), function (err, content) {
  if (err) {
    console.log(err);
  }
  funsJs = content.toString();

  const funsJsLines = funsJs.split('\n').map(l => l.trim()).filter(l => l !== '' && !l.startsWith('\\\\'));

  let curDay = -1;
  let curPart = -1;
  const rxDay = /^day(\d+):/;
  const rxPart = /^part(\d):/;
  funsJsCounts = funsJsLines.reduce((a, l) => {
    const mDay = l.match(rxDay);
    if (mDay) {
      curDay = +mDay[1];
      curPart = -1;
    }
    const mPart = l.match(rxPart);
    if (mPart) {
      curPart = +mPart[1];
    } else if (curDay > 0 && curPart > 0) {
      const dk = 'day ' + curDay;
      const pk = 'part ' + curPart;
      if (!a[dk]) {
        a[dk] = {};
      }
      if (!a[dk][pk]) {
        a[dk][pk] = {
          charCount: 0,
          lineCount: 0
        };
      }
      a[dk][pk].charCount += l.length;
      a[dk][pk].lineCount++;
      a.maxChars = Math.max(a.maxChars, a[dk][pk].charCount);
      a.maxLines = Math.max(a.maxLines, a[dk][pk].lineCount);
    }

    return a;
  }, { maxChars: 0, maxLines: 0 });

  if (funsJsCounts) {
    const statHtml = Object.keys(funsJsCounts).reduce((a, k) => {
      if (!k.startsWith('max') && funsJsCounts[k]) {
        const day = funsJsCounts[k];
        const key = k.replace(/\s/, '_');
        const p1 = day['part 1'];
        const p2 = day['part 2'];
        a += "<li id='" + key + "'>" + k + "<ol><li id='" + key + "_part_1'>part 1 ";
        if (p1 && funsJsCounts) {
          a += "<b id='" + key + "_part_1_chars' style='width:" + (100 * p1.charCount / funsJsCounts.maxChars) + "%' title='" + Math.round(100 * p1.charCount / funsJsCounts.maxChars) + "%'>" + p1.charCount + ' chars</b> ';
          a += "<b id='" + key + "_part_1_lines' style='width:" + (100 * p1.lineCount / funsJsCounts.maxLines) + "%' title='" + Math.round(100 * p1.lineCount / funsJsCounts.maxLines) + "%'>" + p1.lineCount + ' lines</b>';
        }
        a += "</li><li id='" + key + "_part_2'>part 2 ";
        if (p2 && funsJsCounts) {
          a += "<b id='" + key + "_part_2_chars' style='width:" + (100 * p2.charCount / funsJsCounts.maxChars) + "%' title='" + Math.round(100 * p2.charCount / funsJsCounts.maxChars) + "%'>" + p2.charCount + ' chars</b> ';
          a += "<b id='" + key + "_part_2_lines' style='width:" + (100 * p2.lineCount / funsJsCounts.maxLines) + "%' title='" + Math.round(100 * p2.lineCount / funsJsCounts.maxLines) + "%'>" + p2.lineCount + ' lines</b>';
        }

        a += '</li></ol></li>';
      }
      return a;
    }, '<ol>') + '</ol>';

    fs.readFile(path.join(__dirname, 'views/stats.ntl'), function (err, content) {
      if (err) {
        console.log(err);
      }
      const htmlTemplate = content.toString();
      const html = GetFormattedString(htmlTemplate, { 0: statHtml });
      app.get('/stats', function (request, response) {
        response.send(html);
      });
    });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('This cool app is listening on port ' + listener.address().port);
});
