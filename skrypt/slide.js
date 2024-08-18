document.addEventListener('DOMContentLoaded', () => {
  const dates = document.querySelectorAll('.liniaczasu_daty');
    const slides = document.querySelectorAll('.slide_zawartosc');
  
    // Intersection Observer to monitor active slide
    const options = {
      root: null, // Observe the entire viewport
      threshold: 0.5 // Adjust this value according to your needs
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeSlide = entry.target;
          const activeYear = activeSlide.id;
  
          dates.forEach(date => date.classList.remove('aktywny', 'poprzedni', 'kolejny'));
          slides.forEach(slide => slide.classList.remove('poprzedni', 'kolejny'));
  
          // Add active class to the current date
          document.querySelector(`.liniaczasu_daty[data-${activeYear}]`).classList.add('aktywny');
  
          // Add previous and next classes
          const activeIndex = Array.from(slides).indexOf(activeSlide);
  
          if (activeIndex > 0) {
            slides[activeIndex - 1].classList.add('poprzedni');
            document.querySelector(`.liniaczasu_daty[data-${slides[activeIndex - 1].id}]`).classList.add('poprzedni');
          }
          if (activeIndex < slides.length - 1) {
            slides[activeIndex + 1].classList.add('kolejny');
            document.querySelector(`.liniaczasu_daty[data-${slides[activeIndex + 1].id}]`).classList.add('kolejny');
          }
  
          // Call ustawTranslateY function to update translation
          ustawTranslateY();
        }
      });
    }, options);
  
    slides.forEach(slide => observer.observe(slide));
  
  
    // Function to set translateY on .hronologia element
    function ustawTranslateY() {
      const hronologia = document.querySelector('.hronologia');
      const aktywnySlajd = document.querySelector('.liniaczasu_daty.aktywny');
      

      if (aktywnySlajd) {
        const aktywnyIndex = Array.from(document.querySelectorAll('.liniaczasu_daty')).indexOf(aktywnySlajd);
        const translateY = aktywnyIndex * -32 ; 
        hronologia.style.transform = `translateY(${translateY}px)`;
      }
    };

    dates.forEach(date => {
      date.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor click behavior

        // Get the id from the data- attribute
        const slideId = Object.keys(date.dataset)[0];
        const targetSlide = document.getElementById(slideId);

        if (!targetSlide) {
          console.error(`Slide with id ${slideId} not found`);
          return;
        }

        const scrollAmount = targetSlide.offsetLeft;
        document.querySelector('.slider').scrollTo({ left: scrollAmount, behavior: "smooth" });
      });
    });
    // let isDown = false;
    // let startX;
    // let scrollLeft;
    // const slider = document.querySelector('.slider');
    
    // const end = () => {
    //   isDown = false;
    //   slider.classList.remove('interakcja');
    // }
    
    // const start = (e) => {
    //   isDown = true;
    //   slider.classList.add('interakcja');
    //   startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    //   scrollLeft = slider.scrollLeft;	
    // }
    
    // const move = (e) => {
    //   if(!isDown) return;
    
    //   e.preventDefault();
    //   const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    //   const dist = (x - startX);
    //   slider.scrollLeft = scrollLeft - dist;
    // }
    
    // (() => {
    //   slider.addEventListener('mousedown', start);
    
    //   slider.addEventListener('mousemove', move);
    
    //   slider.addEventListener('mouseleave', end);
    //   slider.addEventListener('mouseup', end);
    //   slider.addEventListener('touchend', end);
    // })();
    
});
