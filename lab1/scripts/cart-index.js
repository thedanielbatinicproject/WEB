const KOSARICA_KEY = 'kosarica3sigme';

function getKosarica() {
   const saved = localStorage.getItem(KOSARICA_KEY);
   return saved ? JSON.parse(saved) : [];
}

function saveKosarica(kosarica) {
   localStorage.setItem(KOSARICA_KEY, JSON.stringify(kosarica));
   updateKosaricaCounter();
}

function dodajUKosaricu(proizvod) {
   const kosarica = getKosarica();
   const postoji = kosarica.find(p => p.name === proizvod.name);

   // Dohvati kategoriju proizvoda
   const kategorija = getParentCategory(proizvod.name, podaci);

   if(postoji) {
      // Ako je kategorija različita od "MerceBen" i količina je već 4, spriječi dodavanje
      if(kategorija !== "MerceBen" && postoji.kolicina >= 4) {
         prikaziPopupPoruku("Maksimalna količina za ovaj proizvod je 4.");
         return;
      }
      postoji.kolicina += 1;
   } else {
      proizvod.kolicina = 1;
      kosarica.push(proizvod);
   }

   saveKosarica(kosarica);

   // Kako bi se ažurirali kružići nakon dodavanja proizvoda
   updateProductQuantityCircles();
}

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

function updateProductQuantityCircles() {
   const kosarica = getKosarica(); // Dohvati trenutnu košaricu
   const products = document.querySelectorAll('.product'); // Dohvati sve proizvode iz DOM-a

   products.forEach(product => {
      const productName = product.querySelector('h3').textContent.trim(); // Dohvati naziv proizvoda iz DOM-a
      const proizvodUKosarici = kosarica.find(p => p.name.trim() === productName); // Pronađi proizvod u košarici

      let quantityCircle = product.querySelector('.product-quantity-circle');
      if(!quantityCircle) {
         // Ako kružić ne postoji, kreiraj ga
         quantityCircle = document.createElement('div');
         quantityCircle.classList.add('product-quantity-circle');
         product.appendChild(quantityCircle);
      }

      if(proizvodUKosarici) {
         // Ako je proizvod u košarici, prikaži kružić s količinom
         quantityCircle.textContent = proizvodUKosarici.kolicina;
         quantityCircle.style.display = 'flex';
      } else {
         // Ako proizvod nije u košarici, sakrij kružić
         quantityCircle.style.display = 'none';
      }
   });
}

function updateKosaricaCounter() {
   const kosarica = getKosarica();
   const brojProizvoda = kosarica.reduce((total, p) => total + p.kolicina, 0);
   const kosaricaBroj = document.querySelector('.cart-quantity-circle'); // Promjena selektora
   if(kosaricaBroj) {
      kosaricaBroj.textContent = brojProizvoda > 0 ? brojProizvoda : '';
      kosaricaBroj.style.display = brojProizvoda > 0 ? 'flex' : 'none'; // Prikaz/sakrivanje kružića
   }
}

document.addEventListener('DOMContentLoaded', () => {
   updateKosaricaCounter();
   updateProductQuantityCircles();
});