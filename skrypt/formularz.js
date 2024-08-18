document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (isFormValid()) {
            showModal();
        } else {
            alert('Proszę wypełnić wszystkie wymagane pola poprawnie.');
        }
    });

    function isFormValid() {
        const form = document.getElementById('myForm');
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
            <p class="text">Spróbuj wypełnić formularz na stronie<a href="https://docs.google.com/forms/d/e/1FAIpQLSehFawrrHVWuEIli4J9clLHCJQCwCyYvOVRhToem3_jZGlhdA/viewform?fbzx=-550920692573144909" target="_blank"> Google Forms</a></p>
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