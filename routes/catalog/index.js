const products = require('./products')
const prods = new products()
const express = require('express');
const router = express.Router();

prods.initClass()

/* GET VIEWS */
router.get('/', function(req, res, next) {
    res.render('catalog/index', { 
      title: 'Catalog', 
      items: prods.items
    })
  });

  router.get('/products/:id', function(req, res) {
    class item {
      constructor(){
        this.id = JSON.parse(req.params.id)
        this.prod = {};
      }
      async init(){
       await prods.items.map(x => {
          if(this.id === x.id){
            this.prod = x
            console.log(this.prod)
            return x
          }
        })
      }
    }
    const i = new item()
    i.init()
    res.render('catalog/products/view',{
      id: i.prod.id, 
      name: i.prod.name,
       sku: i.prod.sku, 
       price: i.prod.price, 
       inventory: i.prod.inventory
    })
  });

/* GET API */

  router.get('/api/products', function(req, res, next) {
    res.json(prods.items)
  });


  router.get('/api/products/:id', function(req, res) {
    class item {
      constructor(){
        this.id = JSON.parse(req.params.id)
        this.prod = {};
      }
      async init(){
       await prods.items.map(x => {
          if(this.id === x.id){
            this.prod = x
            console.log(this.prod)
            return x
          }
        })
      }
    }
    const i = new item()
    i.init()
    res.json(i.prod)
  });


module.exports = router;
