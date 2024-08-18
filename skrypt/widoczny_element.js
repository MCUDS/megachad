document.addEventListener('DOMContentLoaded', (event) => {
  const section = document.querySelector('#sprzedaz'); 
  const uslugi = document.querySelectorAll('.uslugi');
  let poprzedniIndeksUslugi = null;
  let poprzedniIndeksListy = null;
  let animacjaIntervalId = null;
  let wybranyIntervalId = null;

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              aktywujAnimacje(section); // Aktywuj animację w sekcji #sprzedaz
          } else {
              dezaktywujAnimacje(section); // Dezaktywuj animację w sekcji #sprzedaz
          }
      });
  }, {
      threshold: .2 // Wyzwól zdarzenie, gdy co najmniej 40% sekcji jest widoczne
  });
  observer.observe(section); // Obserwuj sekcję #sprzedaz

  function losowaAnimacja() {
      const wybranyElement = document.querySelector('.uslugi.wybrany');
      if (!wybranyElement) return; // Jeśli nie ma wybranego elementu, zakończ funkcję

      const listaElementow = wybranyElement.querySelectorAll('li');
      if (listaElementow.length === 0) return; // Jeśli lista jest pusta, zakończ funkcję

      const losowyIndeksListy = Math.floor(Math.random() * listaElementow.length); // Wygeneruj losowy indeks

      // Usuń klasę .animacja z poprzedniego elementu (jeśli istnieje)
      if (poprzedniIndeksListy !== null) {
          listaElementow[poprzedniIndeksListy].classList.remove('animacja');
      }

      // Dodaj klasę .animacja do losowego elementu listy
      listaElementow[losowyIndeksListy].classList.add('animacja');

      // Zaktualizuj zmienną z indeksem poprzedniego elementu listy
      poprzedniIndeksListy = losowyIndeksListy;
  }

  function losowyWybrany() {
      const losowyIndeksUslugi = Math.floor(Math.random() * uslugi.length); // Wygeneruj losowy indeks

      // Usuń klasę .wybrany oraz .animacja z poprzedniego elementu (jeśli istnieje)
      if (poprzedniIndeksUslugi !== null) {
          const poprzedniElementUslugi = uslugi[poprzedniIndeksUslugi];
          poprzedniElementUslugi.classList.remove('wybrany');
          poprzedniElementUslugi.querySelectorAll('li').forEach(li => li.classList.remove('animacja'));
      }

      // Dodaj klasę .wybrany do losowego elementu .uslugi
      uslugi[losowyIndeksUslugi].classList.add('wybrany');

      // Zaktualizuj zmienną z indeksem poprzedniego elementu .uslugi
      poprzedniIndeksUslugi = losowyIndeksUslugi;

      // Zaktualizuj animację dla nowego wybranego elementu
      losowaAnimacja();
  }

  function aktywujAnimacje(section) {
      section.classList.add('widoczna');
      if (animacjaIntervalId) {
          clearInterval(animacjaIntervalId); // Wyczyść poprzedni interval, jeśli istnieje
      }
      if (wybranyIntervalId) {
          clearInterval(wybranyIntervalId); // Wyczyść poprzedni interval, jeśli istnieje
      }
      wybranyIntervalId = setInterval(losowyWybrany, 50000); // Zmieniaj wybrany element co 60 sekund
      animacjaIntervalId = setInterval(losowaAnimacja, 10000); // Zmieniaj animację co 10 sekund
      losowyWybrany(); // Wybierz początkowy element
  }

  function dezaktywujAnimacje(section) {
      section.classList.remove('widoczna'); // Usuń klasę widoczna z sekcji
      if (animacjaIntervalId) {
          clearInterval(animacjaIntervalId); // Wyczyść interval, gdy sekcja jest niewidoczna
      }
      if (wybranyIntervalId) {
          clearInterval(wybranyIntervalId); // Wyczyść interval, gdy sekcja jest niewidoczna
      }
      uslugi.forEach(element => {
          element.classList.remove('wybrany'); // Usuń klasę wybrany z każdego elementu .uslugi
          element.querySelectorAll('li').forEach(li => li.classList.remove('animacja')); // Usuń klasę animacja z każdego elementu listy
      });
  }
 
});
