const drag = document.querySelector('.drag');
const note_app = document.querySelector(`.container`);
const maximize_button = document.querySelector(`.closed`);
const minimize_button = document.querySelector(`.minimize`);
const add_button = document.querySelector(`.add`);
const note = document.querySelector(`.note`);
const save_buttons = note.querySelectorAll(`buttons`); //adding anothor button type is a !!!BREAKING CHANGE!!!(currently only has save button)

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
drag.addEventListener(`mousedown`, mousedown);

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
// id track
let note_id = 1;
function id_traker() {
  return note_id++;
}
//save button
function save(e) {
  const para = e.currentTarget.parentElement.parentElement.querySelector(`p`);
  const expand = e.currentTarget.querySelector(`.expand`);
  const mini = e.currentTarget.querySelector(`.mini`);

  if (e.target.classList.contains(`save`)) {
    alert(`note saved`);
  }
  if (e.target.classList.contains(`mini`)) {
    para.classList.add(`none`);
    mini.classList.add(`none`);
    expand.classList.remove(`none`);
  }
  if (e.target.classList.contains(`expand`)) {
    para.classList.remove(`none`);
    mini.classList.remove(`none`);
    expand.classList.add(`none`);
  }
}

add_button.addEventListener(`click`, () => {
  const note_div = document.createElement(`div`);
  const title_div = document.createElement(`div`);
  const title = document.createElement(`h4`);
  const save_button = document.createElement(`div`);
  const text_body = document.createElement(`p`);
  // id track
  const id = id_traker();
  //text content
  const node = document.createTextNode(`Note ${id}`);
  save_button.innerHTML = `<div class="controls">
          <img class="save" id="s-${id}" src="./SVGs/save.svg" alt="save button" />
          <img class="mini" id="m-${id}" src="./SVGs/mini.svg" alt="collapse button" />
          <img class="expand none" id="e-${id}" src="./SVGs/expand.svg" alt="expend button" />
        </div>`;
  const text_body_placeholder = document.createTextNode(
    `This is a note content`
  );

  // save_button.setAttribute(`id`, `btn-${id}`);
  note_div.setAttribute(`id`, `${id}`);

  //appending to the screen
  note_div.appendChild(title_div);
  title_div.appendChild(title);
  title_div.appendChild(save_button);
  text_body.appendChild(text_body_placeholder);

  title.appendChild(node);
  // save_button.appendChild(button_text);
  note_div.appendChild(text_body);
  note.appendChild(note_div);
  //editing
  text_body.contentEditable = true;
  title.contentEditable = true;

  title_div.classList.add(`flex-row-spaced`); //display flex
  // save_button.classList.add(`save`);

  //expend and collapse

  //save functionality

  save_button.addEventListener(`click`, save);
});
