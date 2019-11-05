const url = 'https://randomuser.me/api/?results=12';
const container = document.getElementById('container');;
const card = document.getElementsByClassName('card');
const modalDiv = document.getElementById('modal');
const closeModel = document.getElementById('close');
let users;



fetch(url)
    .then(response => response.json())
    .then(results => users = results.results)
    .then(users => users.map(user => createCard(user)))
    .catch(error => console.log(error.message));



function createCard(object) {
    let cardDiv = document.createElement('div');
    let card = `
    <a href = # class = "card-link">
        <div class="img-box">
            <img class='employee-photo' src=${object.picture.large}>
        </div>
        <div class="employee-info">
            <h2 class="nome">${object.name.first} ${object.name.last}</h2>
            <p class="email">${object.email}</p>
            <p class="city">${object.location.city}</p>
        </div>
    </a>
    `;
    cardDiv.addEventListener('click', () => createModal(object));
    cardDiv.classList.add('card');
    cardDiv.classList.add(`${object.email}`);
    cardDiv.innerHTML = card;
    container.appendChild(cardDiv);

    return object;

}

function birthday(object) {
    const dob = object.dob.date;
    const mo = dob.substring(5,7);
    const day = dob.substring(8,10);
    const year = dob.substring(2,4);
    return mo + "/" + day + "/" + year;
}

function createModal(object) {
    let modalContentDiv = document.createElement('div');
    let modalHTML = `
        <div class="btn-close">
            <a href="#" id="close">X</a>
        </div>
        <div id="modal-img">
            <img src=${object.picture.large}>
        </div>
        <div class="modal-content-1">
            <h2 class="nome">${object.name.last} ${object.name.first}</h1>
            <p>${object.email}</p>
            <p>${object.location.city}</p>
        </div>
        <hr>
        <div class="modal-content-2">
            <p>${object.phone}</p>
            <p>${object.location.street.number} ${object.location.street.name} ${object.location.postcode} ${object.location.city}</p>
            <p>Birthday: ${birthday(object)}</p>
        </div>
    `;

    modalContentDiv.innerHTML = modalHTML;
    modalContentDiv.classList.add('modal-content');
    modalDiv.appendChild(modalContentDiv);
    modalDiv.style.display = "block";
    modalDiv.style.backgroundColor = 'rgba(126, 122, 121, 0.6)';
}

modalDiv.addEventListener('click', () => modalDiv.style.display = 'none');