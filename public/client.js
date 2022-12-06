// import funs from "/funs.js";
const process = function (funs, day, part) {
  const timer = 'day ' + day + ', part ' + part;
  const html = document.querySelector('html');
  const input = document.getElementById('input' + part);
  const getInput = document.querySelector('#input' + part + ' + .get-input');
  const answer = document.getElementById('part' + part);
  const button = document.getElementById('button' + part);

  getInput.addEventListener('click', async (ev) => {
    ev.preventDefault();
    const local = await window.fetch('/input/' + day);
    const json = await local.json();
    input.value = json.input;
  });

  const onevent = function (/* ev */) {
    html.classList.add('wait');
    // put function in a timeout so that it doesn't block UI thread
    setTimeout(function () {
      console.info('starting...', new Date());
      console.time(timer);

      // fun time
      answer.innerText = funs(day, part)(input.value);

      console.timeEnd(timer);
      html.classList.remove('wait');
    }, 21);
  };

  button.addEventListener('click', onevent);
};

const day = function (funs, day) {
  process(funs, day, 1);
  process(funs, day, 2);
};

export default day;
