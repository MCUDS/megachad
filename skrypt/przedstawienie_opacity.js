document.addEventListener('DOMContentLoaded', () => {
    const przedstawienieImgs = document.querySelectorAll('.przedstawienie_img');
    const przedstawienieImgLength = przedstawienieImgs.length;
  
    let activeIndex = 0;
    przedstawienieImgs[0].style.opacity = 1;
    function showImage() {
      przedstawienieImgs.forEach((img, index) => {
        img.style.opacity = index === activeIndex ? 1 : 0;
        img.style.animation = 'zblizenie 5s infinite alternate ease-in-out';
      });
  
      activeIndex = (activeIndex + 1) % przedstawienieImgLength;
    }
    setInterval(showImage, 5000);
  
  });
  