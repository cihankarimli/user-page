const heartBtn = document.getElementById("heart-button");
buttonColor(
  heartBtn,
  "red",
  `<i class="bi bi-heart-fill"></i>`,
  `<i class="bi bi-heart"></i>`
);
const bookmarkBtn = document.getElementById("bookmark");
// console.log(bookmarkBtn);

buttonColor(
  bookmarkBtn,
  "black",
  `<i class="bi bi-bookmark-fill"></i>`,
  `<i class="bi bi-bookmark"></i>`
);

function buttonColor(btn, color, htmlClick, htmlClickOver) {
  let bollean = true;
  btn.addEventListener("click", function () {
    if (bollean) {
      btn.innerHTML = htmlClick;
      btn.style.color = color;
      bollean = false;
    } else {
      btn.innerHTML = htmlClickOver;
      btn.style.color = `black`;
      bollean = true;
    }
  });
}
heartBtn.addEventListener("click", function () {
  if (bollean) {
    heartBtn.innerHTML = `<i class="bi bi-heart-fill"></i>`;
    heartBtn.style.color = `red`;
    bollean = false;
  } else {
    heartBtn.innerHTML = `<i class="bi bi-heart"></i>`;
    heartBtn.style.color = `black`;
    bollean = true;
  }
});
