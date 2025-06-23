function renderKosarica() {
  fetch("/cart/getAll")
    .then((res) => res.json())
    .then((items) => {
      const kosProizvodi = document.getElementById("kosarica-proizvodi");
      const ukupnaCijenaElement = document.getElementById("ukupna-cijena");
      if (items.length == 0) {
        kosProizvodi.innerHTML =
          '<p class="prazna">Vaša košarica je prazna.</p>';
        ukupnaCijenaElement.textContent = "0 €";
        updateKosaricaCounter();
        return;
      }
      let total = 0;
      kosProizvodi.innerHTML = "";
      items.forEach((p) => {
        const unitPrice = parseFloat(p.price) || 0;
        const subtotal = unitPrice * p.quantity;
        total += subtotal;
        kosProizvodi.innerHTML += `
          <div class="product-row">
            <img src="/images/${p.image.replace(
              "img/",
              ""
            )}" alt="Slika prikazuje automobil ${p.name}">
            <h3>${p.name}</h3>
            <p>Boja: ${p.color}</p>
            <p>Snaga: ${p.power}</p>
            <div class="product-actions">
              <button onclick="smanjiKolicinu('${p.id}')">-</button>
              <span>${p.quantity}</span>
              <button onclick="povecajKolicinu('${p.id}')">+</button>
            </div>
            ${
              p.price
                ? `<p>
                    <b>${formatEuro(unitPrice)} €</b>
                    <span style="color:#888;font-size:0.95em;font-style:italic;margin:0 4px;">x ${
                      p.quantity
                    }</span>
                    <br>
                    = <b>${formatEuro(subtotal)} €</b>
                  </p>`
                : `<p><i>Cijena nije dostupna</i></p>`
            }
          </div>
        `;
      });
      ukupnaCijenaElement.textContent = formatEuro(total) + " €";
      updateKosaricaCounter();
    });
}

document.querySelector(".search-ikona").addEventListener("click", () => {
  prikaziPopupPoruku("Pretraga proizvoda nije implementirana.");
});

function formatEuro(value) {
  return value
    .toFixed(2)                             // 2 decimale
    .replace(".", ",")                      // decimalni zarez
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // tisućice
}

function povecajKolicinu(id) {
  fetch(`/cart/add/${id}`, { method: "POST" }).then(renderKosarica);
}
function smanjiKolicinu(id) {
  fetch(`/cart/remove/${id}`, { method: "POST" }).then(renderKosarica);
}

// Prikaz broja proizvoda u košarici (isti kao na home)
function updateKosaricaCounter() {
  fetch("/cart/getAll")
    .then((res) => res.json())
    .then((items) => {
      const total = items.reduce((sum, p) => sum + p.quantity, 0);
      const el = document.getElementById("cartQuantity");
      if (el) {
        el.textContent = total > 0 ? total : "";
        el.style.display = total > 0 ? "flex" : "none";
      }
    });
}

function prikaziPopupPoruku(msg) {
  const overlay = document.createElement("div");
  overlay.classList.add("popup-overlay");
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `<p>${msg}</p><button class="popup-btn">U redu</button>`;
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  popup.querySelector(".popup-btn").addEventListener("click", () => {
    overlay.classList.add("fade-out");
    setTimeout(() => overlay.remove(), 300);
  });
}

document.addEventListener("DOMContentLoaded", renderKosarica());

document.getElementById("kosaricaDel").addEventListener("click", () => {
  fetch("/cart/clear", { method: "DELETE" });
  fetch("/cart/getAll")
    .then((res) => res.json())
    .then(() => renderKosarica())
    .then((items) => {
      if (items.length == 0) prikaziPopupPoruku("Košarica je već prazna!");
    });
});
