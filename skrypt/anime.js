const pokaz = document.querySelectorAll('.pokaz');
const observerOptions = {
    root: null, // viewport
    rootMargin: '100px',
    threshold: .2 // 100% widoczności
};
const zobaczCzyWidoczny = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        if (entry.isIntersecting){
            entry.target.classList.add('widze');
        }
    });
}, observerOptions);


pokaz.forEach((el) => zobaczCzyWidoczny.observe(el));
