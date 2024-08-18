const topBtn = document.querySelector('.na-gore') 

if (topBtn) {
    topBtn.addEventListener("click", toTop);
  } else {
    // Handle the case where the element is not found (optional)
    console.error("Element with class .na-gore not found");
  }

window.onscroll = function () {
    displayTopBtn();
  };

function displayTopBtn() {
if (window.scrollY > 2000) {
    topBtn.style.display = "flex";
} else {
    topBtn.style.display = "none";
}
}

topBtn.addEventListener("click", toTop);
function toTop() {
window.scrollTo(0, 0);
}