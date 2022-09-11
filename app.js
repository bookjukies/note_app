const drag = document.querySelector('.qn-drag');
const note_app = document.querySelector(`.qn-container`);
const maximize_button = document.querySelector(`.qn-closed`);
const minimize_button = document.querySelector(`.qn-minimize`);
const add_button = document.querySelector(`.qn-add`);
const note = document.querySelector(`.qn-note`);
let replace;

//fetching users
let data_faker = [];
const loadCharacters = async () => {
  try {
    const res = await fetch('https://hp-api.herokuapp.com/api/characters');
    data_faker = await res.json();
  } catch (err) {
    console.error(err);
  }
};

let filterd_list = [];
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

dragElement(document.getElementById('mydiv'));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + 'header')) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
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
// modal

function displayData(data) {
  // populating the modal with the search results
  const data_layout = data
    .map((person) => {
      return `
            <div class="qn-person">
            <img class="qn-person-image" src="${person.image}" id="${person.name}"></img>
            <div class="qn-person-name">${person.name}</div> 
            </div>
        `;
    })
    .join('');

  document.querySelectorAll(`modal`).forEach((modal) => {
    modal.classList.add(`search_modal`);
  });

  return data_layout;
}
//search

//adning a note
add_button.addEventListener(`click`, () => {
  const note_div = document.createElement(`div`);
  const title_div = document.createElement(`div`);
  const title = document.createElement(`h4`);
  const controls = document.createElement(`div`);

  const text_body = document.createElement(`div`);
  const text = document.createElement(`p`);

  text_body.append(text);
  const placehold = document.createElement(`span`);

  const modal = document.createElement(`div`);
  modal.classList.add(`modal`, `qn-display-none`);
  text_body.placeholder = `hi`;
  // id track
  const id = id_traker();
  //text content
  const node = document.createTextNode(`Note ${id}`);
  //note control tab
  controls.innerHTML = `<div class="qn-controls">
          <img class="qn-save" id="s-${id}" src="./SVGs/save.svg" alt="save button" />
          <img class="qn-mini" id="m-${id}" src="./SVGs/mini.svg" alt="collapse button" />
          <img class="qn-expand qn-none" id="e-${id}" src="./SVGs/expand.svg" alt="expend button" />
        </div>`;
  const text_body_placeholder = document.createTextNode(
    `This is a note content`
  );
  text.append(text_body_placeholder);
  //seach Modal
  modal.innerHTML = `
  <div class="qn-modal-container">
  <h4>People</h4> 
    <div>
      <div class="qn-people">
      </div>
    </div>
    <h4 class="qn-display-none result">No results</h4> 
    </div>
  `;

  //

  placehold.innerHTML = `<div id="pl-${id}"></div>`;

  note_div.setAttribute(`id`, `${id}`);
  //
  modal.contentEditable = false;
  modal.style.visibility = 'visible';
  //appending to the screen

  note_div.appendChild(title_div);
  title_div.appendChild(title);
  title_div.appendChild(controls);

  text_body.prepend(modal);
  note.append(placehold);
  // text_body.prepend(modal);

  title.appendChild(node);
  note_div.appendChild(text_body);
  note.appendChild(note_div);
  //editing
  text.contentEditable = true;
  title.contentEditable = true;

  //ease of typing
  text.addEventListener(`click`, (current) => {
    if (current.target.textContent === `This is a note content`) {
      current.target.textContent = ``;
    }
    // text.onmouseleave = (event) => {
    //   modal.classList.add(`qn-display-none`);
    //   if (current.target.textContent === ``) {
    //     current.target.textContent = `This is a note content`;
    //   }
    // };
  });

  // search functionality
  text_body.addEventListener(`input`, (e) => {
    let seach_text = e.target.textContent;
    if (e.target.textContent === ``) {
      // modal.querySelector(`.result`).classList.add(`qn-display-none`);
      console.log(`hi`);
    }
    if (seach_text.includes(`@`)) {
      loadCharacters();

      let show = e.currentTarget.querySelector(`.modal`);

      let at = seach_text.indexOf(`@`) + 1;
      let start = seach_text.slice(at);

      if (start.length < 3) {
        show.classList.add(`qn-display-none`);
      }
      if (start.length >= 3) {
        show.classList.remove(`qn-display-none`);
        filterd_list = data_faker.filter((person) => {
          return person.name.toLowerCase().includes(`${start.toLowerCase()}`);
        });

        const people = e.target.parentElement.querySelector(`.qn-people`);
        people.innerHTML = displayData(filterd_list);
        if (start.length >= 3 && !modal.querySelector(`.qn-person-name`)) {
          modal.querySelector(`.result`).classList.remove(`qn-display-none`);
        } else {
          modal.querySelector(`.result`).classList.add(`qn-display-none`);
        }

        modal.addEventListener(`click`, (word) => {
          if (word.target.classList.contains('qn-person-name')) {
            show.classList.add(`qn-display-none`);
            replace = word.target.textContent;
            e.target.textContent = seach_text.slice(0, at - 1) + ` ` + replace;
          }
        });
        document.addEventListener(`keydown`, (event) => {
          if (event.isComposing || event.key === `Enter`) {
            if (
              modal.querySelector(`.qn-person-name`) &&
              seach_text.includes(`@`)
            ) {
              text.textContent =
                text.textContent.slice(0, at - 1) +
                ` ` +
                modal.querySelector(`.qn-person-name`).textContent;
              modal.classList.add(`qn-display-none`);
            }
          }
        });
      }
    }
  });
  title_div.classList.add(`qn-flex-row-spaced`); //display flex
  //save functionality

  controls.addEventListener(`click`, save);
});
