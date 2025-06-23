const wrapper = document.getElementById('kosarica-proizvodi');
const kosarica = getKosarica();

if(kosarica.length === 0) {
   wrapper.innerHTML = '<p class="prazna">Vaša košarica je prazna.</p>';
} else {
   kosarica.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `
      <img src="${p.image}" alt="Slika prikazuje automobil ${p.name}">
      <h3>${p.name}</h3>
      <p>Boja: ${p.color}</p>
      <p>Snaga: ${p.power}</p>
      <p>Količina: <b>${p.kolicina}</b></p>
      ${p.price ? `<p><b>${p.price} €</b></p>` : `<p><i>Cijena nije dostupna</i></p>`}
    `;
      wrapper.appendChild(div);

      // Dodaj kružić za količinu
      const quantityCircle = document.createElement('div');
      quantityCircle.classList.add('product-quantity-circle');
      quantityCircle.textContent = p.kolicina;
      div.appendChild(quantityCircle);
   });
}