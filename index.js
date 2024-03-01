const row = document.getElementsByClassName("row")[0];

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWVlMTRjNTllYzAwMTk5MGQ3MDIiLCJpYXQiOjE3MDkzMTM3MzksImV4cCI6MTcxMDUyMzMzOX0.h7NJTgo6t6oP4mR1U38EJS-UVWziQlzQReNthmJLvOM";

const params = new URLSearchParams(window.location.search);
const appointmentId = params.get("agendaId");
console.log("RESOURCE ID:", appointmentId);

const url = "https://striveschool-api.herokuapp.com/api/product/";

function creaCard(immagine, title, descrizione, id) {
  const col = document.createElement("div");
  row.appendChild(col);
  col.className = "col-6 col-md-3";

  const card = document.createElement("div");
  col.appendChild(card);
  card.className = "card";
  card.style.height = "22rem";

  const img = document.createElement("img");
  card.appendChild(img);
  img.className = "card-img-top object-fit-cover";
  img.src = immagine;
  img.style.height = "60%";

  const body = document.createElement("div");
  card.appendChild(body);
  body.className = "card-body";

  const h5 = document.createElement("h5");
  body.appendChild(h5);
  h5.className = "card-title";
  h5.textContent = title;

  const p = document.createElement("p");
  body.appendChild(p);
  p.className = "card-text";
  p.textContent = descrizione;

  const btnDettaglio = document.createElement("a");
  body.appendChild(btnDettaglio);
  btnDettaglio.href = `./dettagli.html?idProdotto=${id}`;
  btnDettaglio.className = "btn btn-primary me-1";
  btnDettaglio.innerText = "Info";

  const btnModifica = document.createElement("a");
  body.appendChild(btnModifica);
  btnModifica.href = "./backoffice.html";
  btnModifica.className = "btn btn-success me-1";
  btnModifica.innerText = "Modifica";
}

fetch(url, {
  method: "GET", // è come scrivere method: method,
  headers: {
    Authorization: apiKey,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 400) {
        throw new Error("400 - Errore lato client");
      }
      if (response.status === 404) {
        throw new Error("404 - Dato non trovato");
      }
      if (response.status === 500) {
        throw new Error("500 - Errore lato server");
      }
      throw new Error("Errore nel reperimento dati");
    }
  })
  .then((newAppointment) => {
    console.log(newAppointment);

    newAppointment.forEach((oggetto) => {
      creaCard(oggetto.imageUrl, oggetto.name, oggetto.description, oggetto._id);
    });
  })
  .catch((err) => console.log(err));
