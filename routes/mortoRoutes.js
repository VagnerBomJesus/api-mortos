// importing the express library but destructuring just the Router logic
const { Router } = require("express");

// create a new router
const router = new Router();
const Morto = require("../models/mortoModels");


// morto/create
  router.post("/create", async  (req, res) => {

    try {

      var morto = new Morto(req.body);
      if (!morto) return res.status(409).send('Os dados já existem.');
      morto.save();
      return res.status(200).send(morto);

    } catch (err) {
      res.status(500).send('Internal Server Error');
    }

  });

// morto/list
  router.get("/list", async (req, res) => {
      try {
        // check if any morto exists 
        const morto = await Morto.find();
        //console.log(morto);
        if (!morto) return res.status(409).send('No morto exists.');
        return res.status(200).send(morto);
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
  });
 

  router.get("/media",  (req, res) => {
    Morto.aggregate([
      {$group: {"_id":"", media: {$avg: '$obitos'}}}
    ], function (err, result) {
      if (err) { throw  err; }

      //console.log('Media: ' + result[0].media);
      res.send(result[0].media.toFixed(0));
    })	
  });

  router.get("/soma",  function (req, res) {
    
    Morto.get(function(err, result) {
      if(err){ throw err; }
      var calcSomaN = result.reduce((sum, cn) => {
        return sum + cn.obitos;
      }, 0);
      //console.log('CalcSomaN: ' + calcSomaN);
      res.json(calcSomaN);
    });
  });

  router.get("/list_obitos", function(req, res) {

    Morto.get(function(err, result) {
      if(err){ throw err; }
      var casosLista = [];

      for(var i = 0; i< result.length; i++){
         casosLista.push(result[i].obitos);
      }
      res.send(casosLista);
    })
  })

  router.get("/max",  (req, res) =>{
    Morto.get(function(err, result){
      //if(err){ return res.send(err)}
      var max = Number.NEGATIVE_INFINITY;
      var data;
      for(var i = 0; i < result.length; i++){
        if(max < result[i].obitos){
          max = result[i].obitos;
          data = result[i].data;
        }
      }
      res.json(max);
    })
  });

  router.get("/min",  (req, res) => {
    Morto.get(function(err, result){
      //if(err){ return res.send(err)}
      var min = Infinity;
      var data;

      for(var i = 0; i < result.length; i++){
        if(min > result[i].obitos){
          min = result[i].obitos;
          data = result[i].data; 
        }
      }
      res.json(min);
    })
  });

  router.get("/search/data",async (req, res) => {
    try {
      const query = req.query;
      // check if any total exists 
      const morto = await Morto.find(query);
      if (!morto) return res.status(409).send('No Mortos exists.');
      return res.status(200).send(morto);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

  router.get("/search/distrito",async (req, res) => {
    try {
      const query = req.query;
      // check if any total exists 
      const morto = await Morto.find(query);
      if (!morto) return res.status(409).send('No Mortos exists.');
      return res.status(200).send(morto);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

  router.get("/search/obitos",async (req, res) => {
    try {
      const query = req.query;
      // check if any total exists 
      const morto = await Morto.find(query);
      if (!morto) return res.status(409).send('No Mortos exists.');
      return res.status(200).send(morto);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

/*
router.get("/med",  (req, res) => {
  Morto.get(function(err, result){
    if(err){ return res.send(err)}
    var media = 0;

    for(var i = 0; i < result.length; i++){
     media += result[i].obitos;
    }
    media = media / result.length;

      
    console.log(media);
    
    res.json(media.toFixed(0));
    
    
  })
});*/







module.exports = router;