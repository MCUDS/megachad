document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('autoForm');
    const elements = document.querySelectorAll('.form-group input, .form-group select');

    function updatePlaceholder(element) {
        const placeholder = element.nextElementSibling;

        if (!placeholder) return; // Sprawdzenie, czy placeholder nie jest null

        if (element.tagName === 'SELECT') {
            if (element.value === '' || element.value === null) {
                placeholder.style.transform = 'translateY(0%)';
                placeholder.style.left = '10px';
                placeholder.style.color = '#888';
            } else {
                placeholder.style.top = '0';
                placeholder.style.left = '10px';
                placeholder.style.transform = 'translateY(-100%)';
                placeholder.style.color = '#007BFF';
            }
        } else if (element.tagName === 'INPUT') {
            if (element.value.trim() === '') {
                placeholder.style.transform = 'translateY(0)';
                placeholder.style.left = '10px';
                placeholder.style.color = '#888';
            } else {
                placeholder.style.top = '0';
                placeholder.style.left = '10px';
                placeholder.style.transform = 'translateY(-100%)';
                placeholder.style.color = '#007BFF';
            }
        }
    }

    elements.forEach(element => {
        element.addEventListener('input', () => updatePlaceholder(element));
        element.addEventListener('change', () => updatePlaceholder(element));
        element.addEventListener('blur', () => updatePlaceholder(element));
    });

    elements.forEach(element => updatePlaceholder(element));

    // Autouzupełnianie dla miejscowości
    const miejscowoscInput = document.getElementById('miejscowosc');
    const adresInput = document.getElementById('adres');

    let adresy = {};

    // Ładowanie danych z pliku JSON
    fetch('../skrypt/adresy.json')
        .then(response => response.json())
        .then(data => {
            adresy = data;
        })
        .catch(error => console.error('Błąd wczytywania pliku JSON:', error));

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

    miejscowoscInput.addEventListener('input', function() {
        const wybranaMiejscowosc = this.value;
        if (adresy[wybranaMiejscowosc]) {
            autocomplete(adresInput, adresy[wybranaMiejscowosc]);
        } else {
            autocomplete(adresInput, []);
        }
    });

    const wybierzNadwozie = document.getElementById('wybierz-nadwozie');
    const wybierzPoziom = document.getElementById('wybierz-poziom');

    async function fetchUslugi() {
        try {
            const response = await fetch('../skrypt/autoDetail.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
    }

    wybierzNadwozie.addEventListener('change', async function() {
        const selectedCategory = this.value;
        const uslugi = await fetchUslugi();

        wybierzPoziom.innerHTML = '';

        if (uslugi && uslugi[selectedCategory]) {
            wybierzPoziom.innerHTML = '<option value=""></option>';
            for (let title in uslugi[selectedCategory]) {
                let option = document.createElement('option');

                option.value = title;
                option.textContent = `${title} (${uslugi[selectedCategory][title].cena})`;
                wybierzPoziom.appendChild(option);
            }
        }
    });

});
