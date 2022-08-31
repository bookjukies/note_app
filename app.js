const el = document.querySelector('.drag');
const note_app = document.querySelector(`.container`);
const maximize_button = document.querySelector(`.closed`);
const minimize_button = document.querySelector(`.minimize`);
const add_button = document.querySelector(`.add`);
const note = document.querySelector(`.note`);

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

add_button.addEventListener(`click`, () => {
  const note_div = document.createElement(`div`);
  const title_div = document.createElement(`div`);
  const title = document.createElement(`h4`);
  const save_button = document.createElement(`button`);
  const text_body = document.createElement(`p`);

  //text content
  const node = document.createTextNode(`Note 1`);
  const button_text = document.createTextNode(`save`);
  const text_body_placeholder = document.createTextNode(`body`);

  //appending to the screen
  note_div.appendChild(title_div);
  title_div.appendChild(title);
  title_div.appendChild(save_button);
  text_body.appendChild(text_body_placeholder);

  title.appendChild(node);
  save_button.appendChild(button_text);
  note_div.appendChild(text_body);
  note.appendChild(note_div);
  //editing
  text_body.contentEditable = true;
  title.contentEditable = true;

  title_div.classList.add(`flex-row-spaced`);
});
