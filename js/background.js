const images = [
  "img01.jpg",
  "img02.jpg",
  "img03.jpg",
  "img04.jpg",
  "img05.jpg",
  "img06.jpg",
  "img07.jpg",
  "img08.jpg",
  "img09.jpg",
  "img10.jpg"
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

document.body.style.backgroundImage = `url("img/${chosenImage}")`;