let prodotti = [];
const titolo = document.createElement("p");
const lista = document.createElement("li");
const carrello = document.getElementById("carrello");
const btn5 = document.getElementById("btn5");

const row = document.querySelector(".row");

const bearerToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWVlMTRjNTllYzAwMTk5MGQ3MDIiLCJpYXQiOjE3MDkzMTM3MzksImV4cCI6MTcxMDUyMzMzOX0.h7NJTgo6t6oP4mR1U38EJS-UVWziQlzQReNthmJLvOM";

const url = "https://striveschool-api.herokuapp.com/api/product/";

fetchProducts(url, bearerToken);

function fetchProducts(url, token) {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta API");
      }
      return response.json();
    })
    .then((products) => {
      products.forEach((product) => {
        createCard(product.imageUrl, product.name, product.price + " " + "€", product._id);
      });
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
}

function createCard(image, title, description, id) {
  const cont = document.createElement("div");
  const col = document.createElement("div");
  col.className = "col-12 col-xs-12 col-md-6 col-xl-3";

  const card = document.createElement("div");
  card.className = "card";
  card.style.height = "30";

  const img = document.createElement("img");
  img.className = "card-img-top object-fit-cover";
  img.src = image;
  /*   img.style.height = "60%"; */

  const body = document.createElement("div");
  body.className = "card-body";

  const h5 = document.createElement("h4");
  h5.className = "card-title";
  h5.textContent = title;

  const p = document.createElement("p");
  p.className = "card-text";
  p.textContent = description;

  const btnDettaglio = createButton(`./dettagli.html?idProdotto=${id}`, "INFO", "btn-outline-secondary", "btn-shadow");
  const btnModifica = createButton(`./backoffice.html?idProdotto=${id}`, "EDIT", "btn-outline-secondary", "btn-shadow");
  const buy = createButton(`./backoffice.html?idProdotto=${id}`, "ADD TO CART", "btn-outline-secondary", "btn-shadow");
  buy.classList.add("btnbuy");

  buy.addEventListener("click", (event) => {
    event.preventDefault();
    addToCart(title);
  });
  buy.addEventListener("click", () => {
    prodotti.push(`${title}`);
    console.log(prodotti);
    const btnDel = document.createElement("button");
    btnDel.innerText = "remove";
    btnDel.classList.add("btn", "btn-danger");
    const lista = document.createElement("li");
    /*  const lista2 = document.createElement("li"); */
    prodotti.forEach((elemento) => {
      carrello.appendChild(lista);

      lista.innerText = `${title}   ${description}`;
    });
    /*  btnDel.addEventListener("click", () => {
      btnDel.;
    }); */
    carrello.appendChild(lista);
    carrello.appendChild(btnDel);

    localStorage.setItem(`${title}`, JSON.stringify(`${description}`));
  });

  function addToCart(title) {
    alert(`Prodotto  ${title} aggiunto al carrello!`);
  }
  appendElements(body, [h5, p, btnDettaglio, btnModifica, buy]);
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
/* var myCarousel = document.querySelector("#carouselExampleIndicators");
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: true,
});
 */
