const express = require("express");
const router = express.Router();
const subManager = require("../managers/subscribe-manager");


router.get("/:category", (req, res) => {
  let category = req.params.category;
  res.render("subscribe", { category });
});


router.post("/:category", (req, res) => {
  const category = req.params.category;
  const { nick, email } = req.body;

  // Validacija da su nick i email postavljeni
  if (!nick || !email) {
    return res.render("subscribe", {
      category,
      error: "Please enter both nick and email.",
      nick,
      email
    });
  }

  // Simple validacija emaila (regex ili funkcija)
  if (!subManager.isValidEmail(email)) {
    return res.render("subscribe", {
      category,
      error: "Invalid email format.",
      nick,
      email
    });
  }

  // Provjeri da li je korisnik već pretplaćen
  if (subManager.isSubscribed(category, nick, email)) {
    return res.render("subscribe", {
      category,
      error: "Already subscribed with this nick and email.",
      nick,
      email
    });
  }

  // Dodaj korisnika u listu
  subManager.addUser(category, nick, email);

  // Nakon uspješnog dodavanja, preusmjeri na naslovnicu
  res.redirect("/");
});



module.exports = router;
