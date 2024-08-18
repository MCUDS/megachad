document.addEventListener('DOMContentLoaded', function () {
  function zmianaKlasy(){
    const oryginalnaKlasa = document.querySelectorAll('.malo');
    const szerokoscEkranu = window.innerWidth;

    oryginalnaKlasa.forEach(element => {
        if (szerokoscEkranu <= 1100){
            element.classList.remove('malo');
            element.classList.add('cennik--oferty-zawartosc');
        }else{
            element.classList.remove('cennik--oferty-zawartosc');
            element.classList.add('malo');
        }
        
    });
  }
  zmianaKlasy()

  window.addEventListener('resize', zmianaKlasy)

  let isDown = false;
  let startX;
  let scrollLeft;

  const sliders = document.querySelectorAll('.cennik--oferty-zawartosc');

  const end = (e) => {
    isDown = false;
    e.currentTarget.classList.remove('interakcja');
  }

  const start = (e) => {
    isDown = true;
    e.currentTarget.classList.add('interakcja');
    startX = e.pageX || e.touches[0].pageX - e.currentTarget.offsetLeft;
    scrollLeft = e.currentTarget.scrollLeft;
  }

  const move = (e) => {
    if (!isDown) return;

    e.preventDefault();
    const slider = e.currentTarget;
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = (x - startX);
    slider.scrollLeft = scrollLeft - dist;
  }

  sliders.forEach(slider => {
    slider.addEventListener('mousedown', start);
    slider.addEventListener('touchstart', start);

    slider.addEventListener('mousemove', move);
    slider.addEventListener('touchmove', move);

    slider.addEventListener('mouseleave', end);
    slider.addEventListener('mouseup', end);
    slider.addEventListener('touchend', end);
  });
});