const przyciskiPytania = document.querySelectorAll('.pytania--btn');
const odpowiedziPytan = document.querySelectorAll('.pytania--odpowiedz');
const btnPlus= document.querySelectorAll('.btn--plus')
przyciskiPytania.forEach((przyciskPytania, index) => {
  przyciskPytania.addEventListener('click', () => {
    odpowiedziPytan[index].style.display = odpowiedziPytan[index].style.display === 'block' ? 'none' : 'block';
    // odpowiedziPytan[index].style.height = odpowiedziPytan[index].style.height === 'auto'?'0px':'auto';
    // odpowiedziPytan[index].style.padding = odpowiedziPytan[index].style.padding === '20px 10px'?'0px':'20px 10px';
    btnPlus[index].style.transform = btnPlus[index].style.transform === 'rotate(135deg)'?'rotate(0deg)':'rotate(135deg)' ;
  });
});