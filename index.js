const row = document.querySelector(".row");

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWVlMTRjNTllYzAwMTk5MGQ3MDIiLCJpYXQiOjE3MDkzMTM3MzksImV4cCI6MTcxMDUyMzMzOX0.h7NJTgo6t6oP4mR1U38EJS-UVWziQlzQReNthmJLvOM";

const url = "https://striveschool-api.herokuapp.com/api/product/";

function createCard(image, title, description, id) {
  const col = document.createElement("div");
  col.className = "col-6 col-md-3";

  const card = document.createElement("div");
  card.className = "card";
  card.style.height = "22rem";

  const img = document.createElement("img");
  img.className = "card-img-top object-fit-cover";
  img.src = image;
  img.style.height = "60%";

  const body = document.createElement("div");
  body.className = "card-body";

  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.textContent = title;

  const p = document.createElement("p");
  p.className = "card-text";
  p.textContent = description;

  const btnDettaglio = createButton(`./dettagli.html?idProdotto=${id}`, "Info", "btn-primary");
  const btnModifica = createButton(`./backoffice.html?idProdotto=${id}`, "Modifica", "btn-success");

  appendElements(body, [h5, p, btnDettaglio, btnModifica]);
  appendElements(card, [img, body]);
  appendElements(col, [card]);
  appendElements(row, [col]);
}

function createButton(link, text, className) {
  const btn = document.createElement("a");
  btn.href = link;
  btn.className = `btn ${className} me-1`;
  btn.innerText = text;
  return btn;
}

function appendElements(parent, children) {
  children.forEach((child) => {
    parent.appendChild(child);
  });
}

fetch(url, {
  method: "GET",
  headers: {
    Authorization: apiKey,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Errore durante il recupero dei dati");
    }
    return response.json();
  })
  .then((newAppointment) => {
    newAppointment.forEach((oggetto) => {
      createCard(oggetto.imageUrl, oggetto.name, oggetto.description, oggetto._id);
    });
  })
  .catch((error) => {
    console.error("Errore:", error);
  });
