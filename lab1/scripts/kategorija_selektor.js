let podaci = {};
let sviProizvodi = []; // Svi proizvodi (trenutna lista)
let trenutnoPrikazano = 0; // Broj trenutno prikazanih proizvoda
const brojPoUcitavanju = 10;

const productsDiv = document.getElementById('products');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const headerDiv = document.querySelector('.header');

// Inicijalizacija podataka (prethodno sadržaj automobili.json)
podaci = {
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
// Početni prikaz proizvoda
prikaziSveProizvode();
setupCategoryClicks();

/*
 * U slučaju da treba dohvatiti podatke iz JSON dokumenta, što ne radi za lokalnu stranicu
bez servera

// Učitavanje podataka iz automobili.json
fetch('scripts/automobili.json')
  .then(res => res.json())
  .then(data => {
    podaci = data;
    prikaziSveProizvode();  // Početni prikaz
    setupCategoryClicks();
  });


 */

// Funkcija za prikaz proizvoda
function prikaziProizvode(partial = false) {
   const kosarica = getKosarica(); // Dohvati trenutnu košaricu
   const proizvodiZaPrikaz = partial ?
      sviProizvodi.slice(trenutnoPrikazano, trenutnoPrikazano + brojPoUcitavanju) :
      sviProizvodi;

   proizvodiZaPrikaz.forEach(p => {
      const product = document.createElement('div');
      product.classList.add('product');
      product.innerHTML = `
      <img src="${p.image}" alt="Slika prikazuje ${p.name}" style="width:100%; max-width:300px;">
      <h3>${p.name}</h3>
      <p>Boja: ${p.color}</p>
      <p>Snaga: ${p.power}</p>
      ${p.price ? `<p><b>${p.price} €</b></p>` : `<p><i>Cijena nije dostupna</i></p>`}
      <p><button class="dodaj-u-kosaricu">Dodaj u košaricu</button></p>
    `;
      productsDiv.appendChild(product);

      // Dodaj kružić ako je proizvod već u košarici
      const proizvodUKosarici = kosarica.find(k => k.name === p.name);
      const quantityCircle = document.createElement('div');
      quantityCircle.classList.add('product-quantity-circle');
      quantityCircle.textContent = proizvodUKosarici ? proizvodUKosarici.kolicina : '';
      quantityCircle.style.display = proizvodUKosarici ? 'flex' : 'none';
      product.appendChild(quantityCircle);

      const btn = product.querySelector('.dodaj-u-kosaricu');
      btn.addEventListener('click', () => {
         dodajUKosaricu(p); // Dodavanje proizvoda u košaricu
         updateKosaricaCounter(); // Ažuriraj ukupnu količinu
         updateProductQuantityCircles(); // Ažuriraj kružiće na proizvodima
      });
   });

   trenutnoPrikazano += proizvodiZaPrikaz.length;

   // Prikaži ili sakrij dugme
   if(trenutnoPrikazano < sviProizvodi.length) {
      loadMoreBtn.style.display = 'block';
   } else {
      loadMoreBtn.style.display = 'none';
   }
}

// Funkcija za prikaz svih proizvoda
function prikaziSveProizvode() {
   sviProizvodi = [];
   trenutnoPrikazano = 0;
   productsDiv.innerHTML = '';
   document.querySelectorAll('.kategorije').forEach(k => k.classList.remove('active'));

   // Kombinuj sve proizvode
   Object.values(podaci).forEach(lista => sviProizvodi.push(...lista));

   // Nasumično promiješaj
   sviProizvodi = sviProizvodi.sort(() => Math.random() - 0.5);

   headerDiv.querySelector('.trenutna-kategorija').textContent = "Sve kategorije";
   prikaziProizvode(true);
}

// Funkcija za postavljanje klikova na kategorije
function setupCategoryClicks() {
   const kategorije = document.querySelectorAll('.kategorije');

   kategorije.forEach(kat => {
      kat.addEventListener('click', () => {
         const nazivKategorije = kat.textContent.trim();

         // Aktivna klasa
         kategorije.forEach(k => k.classList.remove('active'));
         kat.classList.add('active');

         headerDiv.querySelector('.trenutna-kategorija').textContent = nazivKategorije;

         // Postavi proizvode
         sviProizvodi = podaci[nazivKategorije] || [];
         trenutnoPrikazano = 0;
         productsDiv.innerHTML = '';
         prikaziProizvode(true);
      });
   });
}

// Dugme za učitavanje više proizvoda
loadMoreBtn.addEventListener('click', () => {
   prikaziProizvode(true);
});

// Funkcija za dohvaćanje kategorije proizvoda na temelju imena
function getParentCategory(productName, data) {
   for(const [category, products] of Object.entries(data)) {
      if(products.some(p => p.name === productName)) {
         return category;
      }
   }
   return null; // Ako kategorija nije pronađena
}


// Funkcija za otvaranje/skrivanje dropdown menija
document.querySelector('.dropdown-btn').addEventListener('click', () => {
   const dropdown = document.querySelector('.categories-dropdown');
   dropdown.classList.toggle('active'); // Dodaje ili uklanja klasu "active"
});

// Dodavanje funkcionalnosti za zatvaranje dropdown-a nakon odabira kategorije
document.querySelectorAll('.kategorije').forEach(kategorija => {
   kategorija.addEventListener('click', () => {
      const dropdown = document.querySelector('.categories-dropdown');
      dropdown.classList.remove('active'); // Zatvori dropdown
   });
});


document.addEventListener("DOMContentLoaded", () => {
   const dropdownBtn = document.querySelector(".dropdown-btn");
   const categoriesPopup = document.getElementById("categoriesPopup");
   const closeBtn = document.querySelector(".close-btn");
   const body = document.body; // Dohvati body element

   // Otvaranje popup-a
   dropdownBtn.addEventListener("click", () => {
      if(!categoriesPopup.classList.contains("active")) {
         categoriesPopup.style.visibility = "visible"; // Postavi odmah na vidljivo
         categoriesPopup.classList.add("active");
         body.classList.add("no-scroll"); // Onemogući scrollanje
      }
   });

   // Zatvaranje popup-a
   closeBtn.addEventListener("click", () => {
      if(categoriesPopup.classList.contains("active")) {
         categoriesPopup.classList.remove("active");

         // Pričekaj da se animacija zatvaranja završi prije nego što sakriješ popup
         const handleTransitionEnd = (event) => {
            if(event.propertyName === "transform" && !categoriesPopup.classList.contains("active")) {
               categoriesPopup.style.visibility = "hidden";
               body.classList.remove("no-scroll"); // Omogući scrollanje
               categoriesPopup.removeEventListener("transitionend", handleTransitionEnd); // Ukloni listener
            }
         };

         categoriesPopup.addEventListener("transitionend", handleTransitionEnd);
      }
   });
});