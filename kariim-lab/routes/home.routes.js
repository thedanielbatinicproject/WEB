var express = require('express');
var data=require('../data/data');
var router = express.Router();



/* GET home page. */
router.get('/data',function(req,res,next){
  res.json(data);
})

router.get('/getCategories', function(req, res, next) {
  let categories=[];
  for(let i=0;i<data.categories.length;i++){
    categories.push(data.categories[i].name);
  }
  res.json(categories);
});


router.get('/getProducts/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const category = data.categories.find(cat => cat.id === id);
  if (category) {
    res.json(category.products);
  } else {
    res.status(404).json({ error: 'Kategorija nije pronađena' });
  }
});


router.get('/',function (req,res,next){
    res.render('home',{});
})





module.exports = router;
