let allProducts = [];
let filteredProducts = [];
let currentlyShown = 0;
const PRODUCTS_PER_LOAD = 5;

document.addEventListener('DOMContentLoaded', () => {
  const categoriesPopup = document.getElementById('categoriesPopup');
  const closeBtn = document.getElementById('closeCategories');
  const dropdownBtn = document.querySelector('.dropdown-btn');
  const body = document.body;

  // Otvori popup SAMO na mobilnim uređajima
  dropdownBtn.onclick = () => {
    if (window.innerWidth <= 769) {
      categoriesPopup.style.visibility = 'visible';
      setTimeout(() => categoriesPopup.classList.add('active'), 10);
      body.classList.add('no-scroll');
    }
  };

  // Zatvori popup na X
  closeBtn.onclick = () => {
    if (window.innerWidth <= 769) closeCategoriesPopup();
  };

  // Zatvori popup na klik kategorije
  categoriesPopup.addEventListener('click', e => {
    if (e.target.classList.contains('kategorije') && window.innerWidth <= 769) {
      closeCategoriesPopup();
    }
  });

  function closeCategoriesPopup() {
    categoriesPopup.classList.remove('active');
    categoriesPopup.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'transform' && !categoriesPopup.classList.contains('active')) {
        categoriesPopup.style.visibility = 'hidden';
        body.classList.remove('no-scroll');
        categoriesPopup.removeEventListener('transitionend', handler);
      }
    });
  }

  // Učitaj kategorije i napuni popup
  fetch('/home/getCategories')
    .then(res => res.json())
    .then(categories => {
      // Očisti popup osim X gumba
      [...categoriesPopup.querySelectorAll('.kategorije')].forEach(el => el.remove());
      categories.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'kategorije';
        div.dataset.brand = cat.name;
        div.textContent = cat.name;
        categoriesPopup.insertBefore(div, closeBtn);
      });
    });

  // Učitaj sve proizvode
  fetch('/home/getCategories')
    .then(res => res.json())
    .then(categories => {
      allProducts = categories.flatMap(cat => cat.products);
      prikaziNasumicneProizvode();
    });

  // Klik na kategoriju (radi i za desktop i za mobilni popup)
  categoriesPopup.addEventListener('click', e => {
    const katDiv = e.target.closest('.kategorije');
    if (katDiv) {
      const categoryName = katDiv.dataset.brand;
      fetch('/home/getCategories')
        .then(res => res.json())
        .then(categories => {
          const category = categories.find(cat => cat.name === categoryName);
          if (category) {
            filteredProducts = [...category.products];
            currentlyShown = 0;
            prikaziProizvodeSaLoadMore(filteredProducts, true);
          }
        });
      const header = document.querySelector('.trenutna-kategorija');
      if (header) header.textContent = categoryName;
      document.querySelectorAll('.kategorije').forEach(k => k.classList.remove('active'));
      katDiv.classList.add('active');
    }
  });

  //Popup nije još implementirano
  document.querySelector(".search-ikona").addEventListener("click", () => {
    prikaziPopupPoruku("Pretraga proizvoda nije implementirana.");
  });

  // Dugme "Učitaj još"
  document.getElementById('loadMoreBtn').addEventListener('click', () => {
    if (filteredProducts.length > 0) {
      prikaziProizvodeSaLoadMore(filteredProducts, false);
    } else {
      prikaziProizvodeSaLoadMore(allProducts, false);
    }
  });
});

function prikaziNasumicneProizvode() {
  filteredProducts = [];
  currentlyShown = 0;
  const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
  allProducts = shuffled;
  prikaziProizvodeSaLoadMore(allProducts, true);
  const header = document.querySelector('.trenutna-kategorija');
  if (header) header.textContent = "Sve kategorije";
  document.querySelectorAll('.kategorije').forEach(k => k.classList.remove('active'));
}

function prikaziProizvodeSaLoadMore(products, reset) {
  const productsDiv = document.getElementById('products');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (reset) {
    productsDiv.innerHTML = '';
    currentlyShown = 0;
  }
  const toShow = products.slice(currentlyShown, currentlyShown + PRODUCTS_PER_LOAD);
  toShow.forEach(p => {
    productsDiv.innerHTML += `
      <div class="product">
        <img src="/images/${p.image.replace('img/', '')}" alt="Slika prikazuje automobil ${p.name}">
        <h3>${p.name}</h3>
        <p>Boja: ${p.color}</p>
        <p>Snaga: ${p.power}</p>
        ${p.price ? `<p><b>${p.price} €</b></p>` : `<p><i>Cijena nije dostupna</i></p>`}
        <button onclick="dodajUKosaricu('${p.id}')">Dodaj u košaricu</button>
      </div>
    `;
  });
  currentlyShown += toShow.length;
  loadMoreBtn.style.display = currentlyShown < products.length ? 'block' : 'none';
  if (products.length === 0) {
    productsDiv.innerHTML = '<p>Nema proizvoda u ovoj kategoriji.</p>';
    loadMoreBtn.style.display = 'none';
  }
}

function dodajUKosaricu(productId) {
  fetch(`/cart/add/${productId}`, { method: 'POST' })
    .then(res => res.json())
    .then(() => updateKosaricaCounter());
}

function updateKosaricaCounter() {
  fetch('/cart/getAll')
    .then(res => res.json())
    .then(items => {
      const total = items.reduce((sum, p) => sum + p.quantity, 0);
      const el = document.getElementById('cartQuantity');
      if (el) {
        el.textContent = total > 0 ? total : '';
        el.style.display = total > 0 ? 'flex' : 'none';
      }
    });
}

function prikaziPopupPoruku(msg) {
  const overlay = document.createElement('div');
  overlay.classList.add('popup-overlay');
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `<p>${msg}</p><button class="popup-btn">U redu</button>`;
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  popup.querySelector('.popup-btn').addEventListener('click', () => {
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.remove(), 300);
  });
}

document.addEventListener('DOMContentLoaded', updateKosaricaCounter);