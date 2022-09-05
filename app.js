const drag = document.querySelector('.qn-drag');
const note_app = document.querySelector(`.qn-container`);
const maximize_button = document.querySelector(`.qn-closed`);
const minimize_button = document.querySelector(`.qn-minimize`);
const add_button = document.querySelector(`.qn-add`);
const note = document.querySelector(`.qn-note`);

// display
maximize_button.classList.add(`qn-none`);
// minimize
minimize_button.addEventListener(`click`, () => {
  note_app.classList.add(`qn-none`);
  maximize_button.classList.remove(`qn-none`);
});

// maximize functionality

maximize_button.addEventListener(`click`, () => {
  note_app.classList.remove(`qn-none`);
  maximize_button.classList.add(`qn-none`);
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
  const expand = e.currentTarget.querySelector(`.qn-expand`);
  const mini = e.currentTarget.querySelector(`.qn-mini`);

  if (e.target.classList.contains(`qn-save`)) {
    alert(`qn-note qn-saved`);
  }
  if (e.target.classList.contains(`qn-mini`)) {
    para.classList.add(`qn-none`);
    mini.classList.add(`qn-none`);
    expand.classList.remove(`qn-none`);
  }
  if (e.target.classList.contains(`qn-expand`)) {
    para.classList.remove(`qn-none`);
    mini.classList.remove(`qn-none`);
    expand.classList.add(`qn-none`);
  }
}

add_button.addEventListener(`click`, () => {
  const note_div = document.createElement(`div`);
  const title_div = document.createElement(`div`);
  const title = document.createElement(`h4`);
  const save_button = document.createElement(`div`);
  const text_body = document.createElement(`p`);
  const placehold = document.createElement(`span`);
  // id track
  const id = id_traker();
  //text content
  const node = document.createTextNode(`Note ${id}`);
  save_button.innerHTML = `<div class="qn-controls">
          <img class="qn-save" id="s-${id}" src="./SVGs/save.svg" alt="save button" />
          <img class="qn-mini" id="m-${id}" src="./SVGs/mini.svg" alt="collapse button" />
          <img class="qn-expand qn-none" id="e-${id}" src="./SVGs/expand.svg" alt="expend button" />
        </div>`;
  const text_body_placeholder = document.createTextNode(
    `This is a note content`
  );
  placehold.textContent = `l`;

  // save_button.setAttribute(`id`, `btn-${id}`);
  note_div.setAttribute(`id`, `${id}`);

  //appending to the screen
  note_div.appendChild(title_div);
  title_div.appendChild(title);
  title_div.appendChild(save_button);
  text_body.appendChild(text_body_placeholder);
  note.append(placehold);

  title.appendChild(node);
  // save_button.appendChild(button_text);
  note_div.appendChild(text_body);
  note.appendChild(note_div);
  //editing
  text_body.contentEditable = true;
  title.contentEditable = true;

  title_div.classList.add(`qn-flex-row-spaced`); //display flex
  // save_button.classList.add(`save`);

  //expend and collapse

  //save functionality

  save_button.addEventListener(`click`, save);
});
