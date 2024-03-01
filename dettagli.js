const id = new URLSearchParams(window.location.search).get("idProdotto");
const container = document.querySelector(".container");

function crea(src, title, descrizione, prezzo) {
  const html = `
    <img src="${src}" alt="">
    <h1>${title}</h1>
    <p>${descrizione}</p>
    <p>${prezzo}</p>
  `;
  container.innerHTML = html;
}

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxZDNhZDRjNTllYzAwMTk5MGQ4ZGYiLCJpYXQiOjE3MDkyOTg2MDUsImV4cCI6MTcxMDUwODIwNX0.mb1tywt7mUK6KjJ7LSC14VY6TgMaADn0jFNfPfzBsKI";
const url = "https://striveschool-api.herokuapp.com/api/product/" + id;

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
  .then((product) => {
    crea(product.imageUrl, product.name, product.description, product.price + " €");
  })
  .catch((err) => {
    console.error("Errore:", err);
  });
