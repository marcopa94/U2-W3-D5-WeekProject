const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWVlMTRjNTllYzAwMTk5MGQ3MDIiLCJpYXQiOjE3MDkzMTM3MzksImV4cCI6MTcxMDUyMzMzOX0.h7NJTgo6t6oP4mR1U38EJS-UVWziQlzQReNthmJLvOM";
const url = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await postData();
    form.reset();
    alert("Il prodotto è stato inserito con successo");
  } catch (error) {
    console.error(error);
    alert("Si è verificato un errore durante l'inserimento del prodotto");
  }
});

async function postData() {
  const titolo = document.getElementById("Titolo").value;
  const descrizione = document.getElementById("Descrizione").value;
  const brand = document.getElementById("brand").value;
  const imgUrl = document.getElementById("img").value;
  const prezzo = document.getElementById("prezzo").value;

  const data = {
    name: titolo,
    description: descrizione,
    brand: brand,
    imageUrl: imgUrl,
    price: prezzo,
  };

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("400 - Errore lato client");
    } else if (response.status === 404) {
      throw new Error("404 - Dato non trovato");
    } else if (response.status === 500) {
      throw new Error("500 - Errore lato server");
    } else {
      throw new Error("Errore nel reperimento dati");
    }
  }

  const newAppointment = await response.json();
  return newAppointment;
}
