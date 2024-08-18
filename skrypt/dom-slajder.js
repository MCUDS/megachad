document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const parentElement = document.querySelector(".dom--przedstawienie-zdjecia");
  const children = parentElement.children;
  const intervalTime = 10000; // 10 sekund

  if (children.length === 0) {
    console.warn("Nie ma żadnych dzieci w wybranym elemencie rodzica.");
    return;
  }

  setInterval(() => {
    // Usuwamy klasę z poprzedniego dziecka
    if (children[currentIndex]) {
      children[currentIndex].classList.remove("prezentuje");
    }

    // Przechodzimy do następnego dziecka
    currentIndex = (currentIndex + 1) % children.length;

    // Dodajemy klasę do nowego dziecka
    if (children[currentIndex]) {
      children[currentIndex].classList.add("prezentuje");
    }
  }, intervalTime);

  
   const setFixedImageSize = (width, height) => {
    const images = document.querySelectorAll("img");
    images.forEach(image => {
      image.style.width = width + "%";
      image.style.height = height + "%";
    });
  };
  setFixedImageSize(100, 100);
  
  
});
