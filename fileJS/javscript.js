var barIcon = document.getElementById("bar_icon");

var openIcon = document.getElementById("open");

var openHeader = document.getElementById("nav_header");
var iconClose = document.getElementById("icon_close");
var closeIcon = document.getElementById("close");

function openClicl() {
  openHeader.style.display = "block";
  closeIcon.style.display = "block";
  openIcon.style.display = "none";
}

function closeCLick() {
  openHeader.style.display = "none";
  closeIcon.style.display = "none";
  openIcon.style.display = "block";
}
