document.addEventListener('DOMContentLoaded', function() {
    const pomieszczenia = {
        wnetrze: ["kuchnia", "salon", "sypialnia", "lazienka"],
        dwor: ["kostka", "balkon", "pojazd", "garaz"]
    };

    const uslugi = {
        kuchnia: ["mycie naczyń", "sprzątanie"],
        salon: ["odkurzanie", "ścieranie kurzu"],
        sypialnia: ["zmiana pościeli", "odkurzanie"],
        lazienka: ["czyszczenie toalety", "mycie prysznica"],
        kostka: ["czyszczenie", "usuwanie chwastów"],
        balkon: ["mycie podłogi", "czyszczenie balustrady"],
        pojazd: ["mycie zewnątrz", "sprzątanie wewnątrz"],
        garaz: ["zamiatanie", "mycie podłogi"]
    };

    const pomieszczenieSelect = document.getElementById('wybierz-pomieszczenie');
    const uslugaSelect = document.getElementById('wybierz-usluga');
    const miejscowoscInput = document.getElementById('miejscowosc');
    const adresInput = document.getElementById('adres');
    
 
    // Aktualizacja pomieszczeń w oparciu o wybraną kategorię
    document.getElementsByName('dwor-nie').forEach(radio => {
        radio.addEventListener('change', function() {
            const wybranaKategoria = this.value;
            pomieszczenieSelect.innerHTML = '<option value=""></option>';
            uslugaSelect.innerHTML = '<option value=""></option>';
            uslugaSelect.disabled = true;

            if (pomieszczenia[wybranaKategoria]) {
                pomieszczenia[wybranaKategoria].forEach(pomieszczenie => {
                    const option = document.createElement('option');
                    option.value = pomieszczenie;
                    option.textContent = pomieszczenie.charAt(0).toUpperCase() + pomieszczenie.slice(1);
                    pomieszczenieSelect.appendChild(option);
                });
            }
        });
    });

    
    let adresy = {};

    // Ładowanie danych z pliku JSON
    fetch('../skrypt/adresy.json')
        .then(response => response.json())
        .then(data => {
            adresy = data;
        })
        .catch(error => console.error('Błąd wczytywania pliku JSON:', error));

    // Aktualizacja usług w oparciu o wybrane pomieszczenie
    pomieszczenieSelect.addEventListener('change', function() {
        const wybranePomieszczenie = this.value;
        uslugaSelect.innerHTML = '<option value=""></option>';
        uslugaSelect.disabled = !wybranePomieszczenie;

        if (uslugi[wybranePomieszczenie]) {
            uslugi[wybranePomieszczenie].forEach(usluga => {
                const option = document.createElement('option');
                option.value = usluga;
                option.textContent = usluga;
                uslugaSelect.appendChild(option);
            });
        }
    });

    // Autouzupełnianie dla miejscowości
    function autocomplete(inp, arr) {
        let currentFocus;
        inp.addEventListener("input", function(e) {
            let a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function(e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        inp.addEventListener("keydown", function(e) {
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            let x = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    // Włącz autouzupełnianie po wybraniu miejscowości
    miejscowoscInput.addEventListener('input', function() {
        const wybranaMiejscowosc = this.value;
        if (adresy[wybranaMiejscowosc]) {
            autocomplete(adresInput, adresy[wybranaMiejscowosc]);
        } else {
            // Wyczyść adresy, jeśli miejscowość nie jest dostępna
            autocomplete(adresInput, []);
        }
    });


    function updatePlaceholder(element) {
        const placeholder = element.nextElementSibling; // Załóżmy, że placeholder jest następnym rodzeństwem elementu

        if (element.tagName === 'SELECT') {
            // Obsługuje elementy select
            if (element.value === '' || element.value === null) {
                // Jeżeli select jest pusty, pokazujemy placeholder
                placeholder.style.top = '50%';
                placeholder.style.left = '10px';
                placeholder.style.color = '#888'; // Szary kolor
            } else {
                // Jeżeli select ma wybraną opcję, ukrywamy placeholder
                placeholder.style.top = '0';
                placeholder.style.left = '10px';
                placeholder.style.transform = 'translateY(-100%)';
                placeholder.style.color = '#007BFF'; // Niebieski kolor
            }
        } else if (element.tagName === 'INPUT') {
            // Obsługuje elementy input
            if (element.value.trim() === '') {
                // Jeżeli input jest pusty, pokazujemy placeholder
                placeholder.style.left = '10px';
                placeholder.style.color = '#888'; // Szary kolor
            } else {
                // Jeżeli input ma tekst, ukrywamy placeholder
                placeholder.style.top = '0';
                placeholder.style.left = '10px';
                placeholder.style.transform = 'translateY(-100%)';
                placeholder.style.color = '#007BFF'; // Niebieski kolor
            }
        }
    }

    // Pobieramy wszystkie elementy input i select z placeholderami
    const elements = document.querySelectorAll('.form-group input, .form-group select');

    // Dodajemy nasłuchiwanie zdarzeń do każdego elementu
    elements.forEach(element => {
        element.addEventListener('input', () => updatePlaceholder(element));
        element.addEventListener('change', () => updatePlaceholder(element)); // Obsługuje zmiany w select
        element.addEventListener('blur', () => updatePlaceholder(element)); // Sprawdzanie również po utracie fokusu
    });

    // Aktualizacja placeholderów przy ładowaniu strony
    elements.forEach(element => updatePlaceholder(element)); 
    
        const form = document.getElementById('myForm');
        const inputs = form.querySelectorAll('input, select');
        const submitButton = form.querySelector('.przycisk-forma-wyslij');
        
        function validateForm() {
            let valid = true;
            
            inputs.forEach(input => {
                if (input.type === 'radio') {
                    const name = input.name;
                    const radios = form.querySelectorAll(`input[name="${name}"]`);
                    const checked = Array.from(radios).some(radio => radio.checked);
                    
                    if (!checked) {
                        valid = false;
                    }
                } else {
                    if (!input.value) {
                        valid = false;
                    }
                }
            });
            
            submitButton.disabled = !valid;
            if (valid) {
                submitButton.classList.remove('niemoznaWyslac');
                submitButton.classList.add('moznaWyslac');
            } else {
                submitButton.classList.remove('moznaWyslac');
                submitButton.classList.add('niemoznaWyslac');
            }
        }
        
        form.addEventListener('input', validateForm);
        form.addEventListener('submit', function (event) {
            validateForm();
            if (submitButton.disabled) {
                event.preventDefault();
            }
        });
        
        validateForm(); // Initial validation check
    
});
