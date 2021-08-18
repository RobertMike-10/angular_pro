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


app.get('/cart', function (req, res) {
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.cart; 
  console.log(resp);
  res.status(200).json(resp);
});

app.get('/products', function (req, res) {
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.products; 
  console.log(resp);
  res.status(200).json(resp);
});

app.get('/branches/:id', function (req, res) {
  console.log("Find Branch")
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.branches;
  console.log(resp);
  const passId = req.params.id;
  console.log(passId);
  var exists = resp.some((p) => p.id== passId);
  
  resp =exists; 
  console.log(resp);
  res.status(200).json(resp);
});

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
 });

/*app.post('/', function (req, res) {
    res.send('[POST]Saludos desde express');
  });
app.get('/', function (req, res) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
    var resp =obj.passengers; 
    console.log(resp);
    res.status(200).json(resp);
  });

app.get('/:id', function (req, res) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
    var resp =obj.passengers;

    const passId = req.params.id;
    console.log(passId);
    var newArray = resp.filter((p) => p.id== passId);
    obj.passengers = newArray; 
    resp =obj.passengers[0];  
    console.log(resp);
    res.status(200).json(resp);
  });

app.delete('/:id', function (req, res) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
    var resp =obj.passengers;
    const passId = req.params.id;
    var newArray = resp.filter((p) => p.id!= passId);
    obj.passengers = newArray;
    let data = JSON.stringify(obj);    
    fs.writeFileSync('db.json', data);
    res.status(200).json(req.body);
    res.status(200).json(resp);
  });

app.put('/*', function (req, res) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));  
    var passengers =obj.passengers;    
    var passenger = req.body; //obtengo pasajero enviado
    
    var newArray = passengers.map((p) => {
       if(p.id === passenger.id){
         p = Object.assign({},p,passenger);
       }
       return p;
     });    
    obj.passengers = newArray;    //copio el array actualizado
    let data = JSON.stringify(obj);
    
    fs.writeFileSync('db.json', data);
    res.status(200).json(req.body);
  });

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});*/