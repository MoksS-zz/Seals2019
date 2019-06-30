'use strict';
const imageEl = document.querySelector('.img-main-background');

function changeBackground(imageEl) {
  console.log(imageEl);
  console.log(imageEl.style);
  imageEl.style.backgroundImage =
    "'url(../img/1020_preobrazovanny_withBlackScreen.png')";
}

setTimeout(changeBackground(imageEl), 5000);
