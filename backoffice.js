const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWVlMTRjNTllYzAwMTk5MGQ3MDIiLCJpYXQiOjE3MDkzMTM3MzksImV4cCI6MTcxMDUyMzMzOX0.h7NJTgo6t6oP4mR1U38EJS-UVWziQlzQReNthmJLvOM";
const url = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.querySelector("form");
const btnSubmit = document.getElementsByClassName("btn-primary")[0];
const btnSubmit1 = document.getElementsByClassName("btn-danger")[0];
const titolo = document.getElementById("Titolo");
const descrizione = document.getElementById("Descrizione");
const brand = document.getElementById("brand");
const imgUrl = document.getElementById("img");
const prezzo = document.getElementById("prezzo");

const id = new URLSearchParams(window.location.search).get("idProdotto");

if (id !== null) {
  btnSubmit.className = "btn btn-success";
  btnSubmit.textContent = "Modifica";
  btnSubmit1.classList.remove("d-none");

  fetch(url + id, {
    method: "GET",
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
    .then((product) => {
      console.log(product);
      document.getElementById("Titolo").value = product.name;
      document.getElementById("Descrizione").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("img").value = product.imageUrl;
      document.getElementById("prezzo").value = product.price;
    })
    .catch((err) => console.log(err));
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    putFetch(id);
  });

  btnSubmit1.addEventListener("click", function (event) {
    event.preventDefault();
    deleteFetch(id);
  });

  btnSubmit.onclick = function () {};
} else {
  btnSubmit.className = "btn btn-primary";
  btnSubmit.textContent = "Submit";
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    postData();
  });
}

function postData() {
  const data = {
    name: titolo.value,
    description: descrizione.value,
    brand: brand.value,
    imageUrl: imgUrl.value,
    price: prezzo.value,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
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
      alert("Appuntamento con id: " + " è stato creato correttamente");
      form.reset();
    })
    .catch((err) => console.log(err));
}

function putFetch(id) {
  const data = {
    name: titolo.value,
    description: descrizione.value,
    brand: brand.value,
    imageUrl: imgUrl.value,
    price: prezzo.value,
  };

  fetch(url + id, {
    method: "PUT",
    body: JSON.stringify(data),
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
    .then((updatedProduct) => {
      console.log(updatedProduct);
      document.getElementById("Titolo").value = updatedProduct.name;
      document.getElementById("Descrizione").value = updatedProduct.description;
      document.getElementById("brand").value = updatedProduct.brand;
      document.getElementById("img").value = updatedProduct.imageUrl;
      document.getElementById("prezzo").value = updatedProduct.price;
      alert("il prodotto è stato modificato correttamente");
    })
    .catch((err) => console.log(err));
}

function deleteFetch(id) {
  fetch(url + id, {
    method: "DELETE",
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
    .then(() => {
      alert("Prodotto eliminato con successo");
      window.location.href = "./index.html"; // Reindirizza alla homepage dopo la cancellazione
    })
    .catch((err) => console.log(err));
}
