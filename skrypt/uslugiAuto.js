document.addEventListener('DOMContentLoaded', function() {
    fetch('../skrypt/autoDetail.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Połączenie chyba przestalo sitniec :(');
            }
            return response.json();
        })
        .then(data => {
            // Lista kategorii w JSONie i ich odpowiednie identyfikatory HTML
            const kategorieUslug = {
                "Sedan": "sedan",
                "Kombi": "kombi",
                "Coupe": "coupe",
                "Cargo Van": "cargo",
                // "Van": "van",
                "Hatchback": "hathback",
                "SUV": "suv",
                "Wszystkie typy nadwozia": "wszystkie-typy-nadwozia"
            };

            // Iterujemy przez kategorie
            Object.keys(kategorieUslug).forEach(kategoria => {
                const categoryData = data[kategoria];
                const elementID = kategorieUslug[kategoria];
                const zawartoscUslugi = document.getElementById(elementID);

                if (zawartoscUslugi) {
                    const contentContainer = zawartoscUslugi.querySelector('.cennik--oferty-zawartosc');
                    if (contentContainer) {
                        contentContainer.innerHTML = ''; // Wyczyść istniejącą zawartość

                        // Sprawdź, czy dane dla danej kategorii są dostępne
                        if (categoryData) {
                            Object.keys(categoryData).forEach(uslugi => {
                                const { cena, opis } = categoryData[uslugi];
                                const serviceElement = document.createElement('div');
                                serviceElement.classList.add('nazwa_cena--oferty');

                                serviceElement.innerHTML = `
                                    <span class="nazwa--oferty">${uslugi}</span>
                                    <span class="cena--oferty">${cena}</span>
                                    <span class="opis--oferty">${opis}</span>
                                `;

                                contentContainer.appendChild(serviceElement);
                            });
                        } else {
                            console.warn(`Brak danych dla kategorii: ${kategoria}`);
                        }
                    } else {
                        console.warn(`Nie znaleziono kontenera '.cennik--oferty-zawartosc' w elemencie o ID: ${elementID}`);
                    }
                } else {
                    console.warn(`Nie znaleziono elementu o ID: ${elementID}`);
                }
            });
        })
        .catch(error => console.error('Błąd wczytywania pliku JSON:', error));
});