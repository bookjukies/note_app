const el = document.querySelector('.item');

el.addEventListener(`mousedown`, mousedown);

function mousedown(e) {
  window.addEventListener(`mousemove`, mousemove);
  window.addEventListener(`mouseup`, mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {
    let newX = prevX - e.clientX;
    let newY = prevY - e.clientY;

    const rect = el.getBoundingClientRect();

    el.style.left = rect.left - newX + `px`;
    el.style.top = rect.top - newY + `px`;

    prevX = e.clientX;
    prevY = e.clientY;
  }
  function mouseup() {
    window.removeEventListener(`mousemove`, mousemove);
    window.removeEventListener(`mouseup`, mouseup);
  }
}
