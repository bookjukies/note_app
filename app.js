const el = document.querySelector('.drag');
const note_app = document.querySelector(`.container`);
const maximize_button = document.querySelector(`.closed`);
const minimize_button = document.querySelector(`.minimize`);

// display
maximize_button.classList.add(`none`);
// minimize
minimize_button.addEventListener(`click`, () => {
  note_app.classList.add(`none`);
  maximize_button.classList.remove(`none`);
});

// maximize functionality

maximize_button.addEventListener(`click`, () => {
  note_app.classList.remove(`none`);
  maximize_button.classList.add(`none`);
});
// dragging functionality
el.addEventListener(`mousedown`, mousedown);

function mousedown(e) {
  window.addEventListener(`mousemove`, mousemove);
  window.addEventListener(`mouseup`, mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {
    let newX = prevX - e.clientX;
    let newY = prevY - e.clientY;

    const rect = note_app.getBoundingClientRect();

    note_app.style.left = rect.left - newX + `px`;
    note_app.style.top = rect.top - newY + `px`;

    prevX = e.clientX;
    prevY = e.clientY;
  }
  function mouseup() {
    window.removeEventListener(`mousemove`, mousemove);
    window.removeEventListener(`mouseup`, mouseup);
  }
}
title = document.querySelector(`.note h2`).textContent;
console.log(title);
