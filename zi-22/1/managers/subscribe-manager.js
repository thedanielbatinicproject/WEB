let categories = {
  outdoors: [],
  sports: [],
  pizzas: [],
  works: [],
  politics: [],
  technology: [],
  pets: [],
  bbq: [],
};

/**
 *
 * @param {string} category - Naziv kategorije (npr. 'outdoors', 'works').
 * @param {string} nick - Ime korisnika.
 * @param {string} email - Email korisnika.
 */
function addUser(category, nick, email) {
  const key = category.toLowerCase();
  if (!categories[key]) {
    console.error(`Kategorija '${category}' ne postoji.`);
    return;
  }

  categories[key].push({ nick, email });

  console.log(categories);
}

function getSubscribers() {
  return categories;
}

function isSubscribed(category, nick, email) {
  const key = category.toLowerCase();
  if (!categories[key]) return false;

  return categories[key].some(
    (user) => user.nick === nick && user.email === email
  );
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = { addUser, getSubscribers, isSubscribed, isValidEmail };
