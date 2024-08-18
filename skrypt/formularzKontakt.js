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

    const domForm = document.getElementById('domForm');
    const submitButton = domForm.querySelector('.przycisk-forma-wyslij');
    const pomieszczenieSelect = document.getElementById('wybierz-pomieszczenie');
    const uslugaSelect = document.getElementById('wybierz-usluga');
    const miejscowoscInput = document.getElementById('miejscowosc');
    const adresInput = document.getElementById('adres');

    function checkFormValidity(form) {
        const submitButton = form.querySelector('.przycisk-forma-wyslij');
        const allFilled = [...form.querySelectorAll('input, select')].every(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                return input.checked;
            } else {
                return input.value.trim() !== '';
            }
        });
        submitButton.disabled = !allFilled;
    }

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

    let adresy = {};

    // Ładowanie danych z pliku JSON
    fetch('../skrypt/adresy.json')
        .then(response => response.json())
        .then(data => {
            adresy = data;
        })
        .catch(error => console.error('Błąd wczytywania pliku JSON:', error));

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
            if (element.value === '' || element.value === null) {
                placeholder.style.top = '50%';
                placeholder.style.left = '10px';
                placeholder.style.color = '#888'; // Szary kolor
            } else {
                placeholder.style.top = '0';
                placeholder.style.left = '10px';
                placeholder.style.transform = 'translateY(-100%)';
                placeholder.style.color = '#007BFF'; // Niebieski kolor
            }
        } else if (element.tagName === 'INPUT') {
            if (element.value.trim() === '') {
                placeholder.style.left = '10px';
                placeholder.style.color = '#888'; // Szary kolor
            } else {
                placeholder.style.top = '0';
                placeholder.style.left = '10px';
                placeholder.style.transform = 'translateY(-100%)';
                placeholder.style.color = '#007BFF'; // Niebieski kolor
            }
        }
    }

    const elements = document.querySelectorAll('.form-group input, .form-group select');

    elements.forEach(element => {
        element.addEventListener('input', () => updatePlaceholder(element));
        element.addEventListener('change', () => updatePlaceholder(element));
        element.addEventListener('blur', () => updatePlaceholder(element));
    });

    elements.forEach(element => updatePlaceholder(element));

    checkFormValidity(domForm);
    
    function validateForm() {
        let valid = true;

        elements.forEach(input => {
            if (!input.value) {
                valid = false;
            }
        });

        submitButton.disabled = !valid;
        if (valid) {
            submitButton.classList.remove('nieaktywny');
            submitButton.classList.add('aktywny');
        } else {
            submitButton.classList.remove('aktywny');
            submitButton.classList.add('nieaktywny');
        }
    }

    domForm.addEventListener('input', validateForm);
    domForm.addEventListener('submit', function(event) {
        validateForm();
        if (submitButton.disabled) {
            event.preventDefault();
        }
    });

    validateForm(); // Initial validation check
    domForm.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event) {
        event.preventDefault();
        
        if (isFormValid(event.target)) {
            showModal();
        } else {
            alert('Proszę wypełnić wszystkie wymagane pola poprawnie.');
        }
    }

    function isFormValid(form) {
        return form.checkValidity();
    }

    function showModal() {
        const modal = document.createElement('div');
        modal.id = 'modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="forma-container">
                <p class="allert">Ups.. </p>
                <div class="svg-ups"><img src="../bank/svg/ups.svg" alt=""></div>
                <p class="allert">Napotkaliśmy problem przy odbieraniu Twojego formularza.</p>
                <p class="text">Spróbuj wypełnić formularz na stronie <a href="https://docs.google.com/forms/d/e/1FAIpQLSehFawrrHVWuEIli4J9clLHCJQCwCyYvOVRhToem3_jZGlhdA/viewform?fbzx=-550920692573144909" target="_blank">Google Forms</a></p>
                <p class="info">lub napisz sms pod numer który jest na dole strony.</p>
                <button id="closeModal">Zamknij</button>
            </div>
        `;

        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.className = 'overlay';

        document.body.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById('closeModal').addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.removeChild(overlay);
        });
    }
});
