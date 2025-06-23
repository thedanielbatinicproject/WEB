const KOSARICA_KEY = 'kosarica3sigme';

// Funkcija za dohvaćanje kategorije proizvoda na temelju imena proizvoda
function getCategoryForProduct(productName) {
   const automobili = JSON.parse(localStorage.getItem('automobili')); // Pretpostavljamo da su podaci spremljeni u localStorage
   for(const [category, products] of Object.entries(automobili)) {
      if(products.some(product => product.name === productName)) {
         return category;
      }
   }
   return 'Nepoznata kategorija'; // Ako kategorija nije pronađena
}

// Funkcija za dohvaćanje košarice iz localStorage
function getKosarica() {
   const saved = localStorage.getItem(KOSARICA_KEY);
   return saved ? JSON.parse(saved) : [];
}

// Funkcija za spremanje košarice u localStorage
function saveKosarica(kosarica) {
   localStorage.setItem(KOSARICA_KEY, JSON.stringify(kosarica));
}

// Funkcija za pražnjenje košarice
function isprazniKosaricu() {
   localStorage.setItem(KOSARICA_KEY, JSON.stringify([]));
   renderKosarica();
}

// Funkcija za prikaz proizvoda u košarici
function renderKosarica() {
   const kosarica = getKosarica();
   const wrapper = document.getElementById('kosarica-proizvodi');
   const ukupnaCijenaElement = document.getElementById('ukupna-cijena');
   wrapper.innerHTML = '';

   if(kosarica.length === 0) {
      wrapper.innerHTML = '<p class="prazna">Vaša košarica je prazna.</p>';
      ukupnaCijenaElement.textContent = '0 €';
      updateKosaricaCounter(); // Ažuriraj ukupnu količinu
      return;
   }

   let ukupnaCijena = 0;

   kosarica.forEach((p, index) => {
      ukupnaCijena += p.kolicina * (p.price || 0);

      const row = document.createElement('div');
      row.classList.add('product-row');
      row.innerHTML = `
      <span class="product-name">${getCategoryForProduct(p.name)} - ${p.name}</span>
      <div class="product-actions">
        <button onclick="smanjiKolicinu(${index})">-</button>
        <span>${p.kolicina}</span>
        <button onclick="povecajKolicinu(${index})">+</button>
      </div>
      <span class="product-price">${(p.kolicina * (p.price || 0)).toFixed(2)} €</span>
      <button class="delete-btn" onclick="obrisiProizvod(${index})">🗑️</button>
    `;
      wrapper.appendChild(row);
   });

   ukupnaCijenaElement.textContent = `${ukupnaCijena.toFixed(2)} €`;
   updateKosaricaCounter(); // Ažuriraj ukupnu količinu
}

// Funkcija za prikaz popup obavijesti
function prikaziPopupPoruku(poruka) {
   const overlay = document.createElement('div');
   overlay.classList.add('popup-overlay');

   const popup = document.createElement('div');
   popup.classList.add('popup');

   popup.innerHTML = `
    <p>${poruka}</p>
    <button class="popup-btn">U redu</button>
  `;

   overlay.appendChild(popup);
   document.body.appendChild(overlay);

   // Dodavanje funkcionalnosti za zatvaranje popup-a
   const btn = popup.querySelector('.popup-btn');
   btn.addEventListener('click', () => {
      overlay.classList.add('fade-out'); // Dodaj klasu za animaciju
      setTimeout(() => overlay.remove(), 300); // Ukloni element nakon animacije
   });
}

function povecajKolicinu(index) {
   const kosarica = getKosarica();
   const kategorija = getCategoryForProduct(kosarica[index].name);

   // Provjera ograničenja količine za sve kategorije osim "MerceBen"
   if(kategorija !== 'MerceBen' && kosarica[index].kolicina >= 4) {
      prikaziPopupPoruku("Maksimalna količina je 4 za ovaj proizvod.");
      return;
   }

   // Povećanje količine
   kosarica[index].kolicina += 1;
   saveKosarica(kosarica);
   renderKosarica();
}

// Funkcija za smanjenje količine proizvoda
function smanjiKolicinu(index) {
   const kosarica = getKosarica();
   if(kosarica[index].kolicina > 1) {
      kosarica[index].kolicina -= 1;
   } else {
      kosarica.splice(index, 1);
   }
   saveKosarica(kosarica);
   renderKosarica();
}

// Funkcija za brisanje proizvoda iz košarice
function obrisiProizvod(index) {
   const kosarica = getKosarica();
   kosarica.splice(index, 1);
   saveKosarica(kosarica);
   renderKosarica();
}

data = {
  "Toyoda": [
    { "name": "Corollo", "image": "img/corollo.png", "color": "White", "power": "170 HP", "price": "8990" },
    { "name": "Cemry", "image": "img/cemry.png", "color": "Black", "power": "230 HP", "price": "27999" },
    { "name": "REV4", "image": "img/rev4.png", "color": "Green", "power": "330 HP", "price": "39999" },
    { "name": "Highlandor", "image": "img/highlandor.png", "color": "Blue", "power": "295 HP", "price": "49999" },
    { "name": "Aura", "image": "img/aura.png", "color": "Black", "power": "90 HP", "price": "6999" }
  ],
  "Wolksvagen": [
    { "name": "Galf", "image": "img/galf.png", "color": "White", "power": "300 HP", "price": "19999" },
    { "name": "Passot", "image": "img/passot.png", "color": "Silver", "power": "150 HP", "price": "24999" },
    { "name": "Poolo", "image": "img/poolo.png", "color": "Black", "power": "95 HP", "price": "14999" },
    { "name": "Tiugan", "image": "img/tiugan.png", "color": "Silver", "power": "150 HP", "price": "34999" },
    { "name": "Tuaraeg", "image": "img/tuaraeg.png", "color": "Red", "power": "335 HP", "price": "59999" }
  ],
  "MerceBen": [
    { "name": "C-Class", "image": "img/c-class.png", "color": "White", "power": "255 HP", "price": "39999" },
    { "name": "E-Class", "image": "img/e-class.png", "color": "Black", "power": "362 HP", "price": "49999" },
    { "name": "S-Class", "image": "img/s-class.png", "color": "Black", "power": "429 HP", "price": "59999" },
    { "name": "GLC", "image": "img/glc.png", "color": "Blue", "power": "255 HP", "price": "39999" },
    { "name": "GLE", "image": "img/gle.png", "color": "Black", "power": "255 HP", "price": "58999" }
  ],
  "BNW": [
    { "name": "3Series", "image": "img/3series.png", "color": "Black", "power": "255 HP", "price": "34999" },
    { "name": "5Series", "image": "img/5series.png", "color": "Blue", "power": "248 HP", "price": "44699" },
    { "name": "X 3", "image": "img/x3.png", "color": "Dark Blue", "power": "248 HP", "price": "29999" },
    { "name": "X 5", "image": "img/x5.png", "color": "Gray", "power": "335 HP", "price": "59999" },
    { "name": "M 4", "image": "img/m4.png", "color": "Yellow", "power": "520 HP" }
  ],
  "Auda": [
    { "name": "A3", "image": "img/a3.png", "color": "Black", "power": "110 HP" },
    { "name": "A4", "image": "img/a4.png", "color": "Black", "power": "201 HP", "price": "29999" },
    { "name": "A6", "image": "img/a6.png", "color": "Blue", "power": "261 HP", "price": "39999" },
    { "name": "Q5", "image": "img/q5.png", "color": "Black", "power": "261 HP", "price": "49999" },
    { "name": "Q7", "image": "img/q7.png", "color": "Black", "power": "335 HP", "price": "69999" }
  ],
  "Fort": [
    { "name": "Facus", "image": "img/facus.png", "color": "White", "power": "120 HP", "price": "19999" },
    { "name": "Musteng", "image": "img/musteng.png", "color": "Gray", "power": "650 HP", "price": "59999" },
    { "name": "Fieste", "image": "img/fieste.png", "color": "White", "power": "75 HP", "price": "9999" },
    { "name": "Exploror", "image": "img/exploror.png", "color": "Blue", "power": "300 HP", "price": "37999" },
    { "name": "F150", "image": "img/f150.png", "color": "Gray", "power": "400 HP", "price": "69999" }
  ],
  "Hondu": [
    { "name": "Civit", "image": "img/civit.png", "color": "Red", "power": "158 HP", "price": "14999" },
    { "name": "Acord", "image": "img/acord.png", "color": "Gray", "power": "192 HP", "price": "24999" },
    { "name": "CR V", "image": "img/crv.png", "color": "Black", "power": "190 HP", "price": "29999" },
    { "name": "Pilat", "image": "img/pilat.png", "color": "Black", "power": "280 HP", "price": "39999" },
    { "name": "Fil", "image": "img/fil.png", "color": "Silver", "power": "141 HP", "price": "7999" }
  ],
  "Hyundei": [
    { "name": "k30", "image": "img/k30.png", "color": "Gray", "power": "147 HP", "price": "19999" },
    { "name": "Tcuson", "image": "img/tcuson.png", "color": "White", "power": "187 HP", "price": "29999" },
    { "name": "Santa Fer", "image": "img/santafer.png", "color": "Blue", "power": "277 HP", "price": "39999" },
    { "name": "Alantra", "image": "img/alantra.png", "color": "Red", "power": "147 HP", "price": "19999" },
    { "name": "Koma", "image": "img/koma.png", "color": "Green", "power": "147 HP", "price": "19999" }
  ],
  "Nissam": [
    { "name": "Micro", "image": "img/micro.png", "color": "Yellow", "power": "109 HP", "price": "8999" },
    { "name": "Juku", "image": "img/juku.png", "color": "Red", "power": "188 HP", "price": "24999" },
    { "name": "Qashqoi", "image": "img/qashqoi.png", "color": "Silver", "power": "141 HP", "price": "19999" },
    { "name": "X-Tral", "image": "img/xtral.png", "color": "Gray", "power": "170 HP", "price": "29999" },
    { "name": "GTR", "image": "img/gtr.png", "color": "Green", "power": "565 HP", "price": "99999" }
  ],
  "Chevrolot": [
    { "name": "Malibo", "image": "img/malibo.png", "color": "Black", "power": "160 HP", "price": "19999" },
    { "name": "Camaru", "image": "img/camaru.png", "color": "Green", "power": "275 HP", "price": "39999" },
    { "name": "Silverando", "image": "img/silverando.png", "color": "Blue", "power": "285 HP", "price": "49999" },
    { "name": "Ekuinox", "image": "img/ekuinox.png", "color": "Black", "power": "170 HP", "price": "29999" },
    { "name": "Tahoa", "image": "img/tahoa.png", "color": "Green", "power": "355 HP", "price": "59999" }
  ]
};
localStorage.setItem('automobili', JSON.stringify(data));
/*
// Učitavanje podataka iz automobili.json u localStorage
fetch('scripts/automobili.json')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('automobili', JSON.stringify(data));
  });
*/


// Prikaz košarice prilikom učitavanja stranice
document.addEventListener('DOMContentLoaded', () => {
   renderKosarica();
});