const row = document.querySelector(".row");

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWVlMTRjNTllYzAwMTk5MGQ3MDIiLCJpYXQiOjE3MDkzMTM3MzksImV4cCI6MTcxMDUyMzMzOX0.h7NJTgo6t6oP4mR1U38EJS-UVWziQlzQReNthmJLvOM";

const url = "https://striveschool-api.herokuapp.com/api/product/";

function createCard(image, title, description, id) {
  const col = document.createElement("div");
  col.className = "col-6 col-md-3";

  const card = document.createElement("div");
  card.className = "card";
  card.style.height = "26rem";

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

  const btnDettaglio = document.createElement("a");
  btnDettaglio.href = `./dettagli.html?idProdotto=${id}`;
  btnDettaglio.className = "btn btn-primary me-1";
  btnDettaglio.innerText = "Info";

  const btnModifica = document.createElement("a");
  btnModifica.href = "./backoffice.html";
  btnModifica.className = "btn btn-success me-1";
  btnModifica.innerText = "Modifica";

  row.appendChild(col);
  col.appendChild(card);
  card.appendChild(img);
  card.appendChild(body);
  body.appendChild(h5);
  body.appendChild(p);
  body.appendChild(btnDettaglio);
  body.appendChild(btnModifica);
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
  .then((data) => {
    data.forEach((item) => {
      createCard(item.imageUrl, item.name, item.description, item._id);
    });
  })
  .catch((error) => {
    console.error("Errore:", error);
  });
