const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//usign CORS
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
 });


 //read pizzas
 app.get('/api/pizzas', function (req, res) {
  console.log("Read pizzas")
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.pizzas;

  res.status(200).json(resp);
})

 //read sides
 app.get('/api/sides', function (req, res) {
  console.log("Read sides")
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.sides;

  res.status(200).json(resp);
})

 //read drinks
 app.get('/api/drinks', function (req, res) {
  console.log("Read drinks")
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.drinks;

  res.status(200).json(resp);
})

app.get('/api/stores', function (req, res) {
  console.log("Read store")
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.stores;
  //console.log(resp);
  var id = req.headers.id;
  var token = req.headers.token;
  //console.log(token);
  var arrayRes =  resp.filter((p) => p.id== id && p.token==token);
  
  resp = arrayRes[0];
  console.log(arrayRes);
  res.status(200).json(resp);
})




