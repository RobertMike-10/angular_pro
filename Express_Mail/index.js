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


 //read folder
 app.get('/', function (req, res) {
  console.log("Read mail")
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.messages;

  const folder = req.query.folder;
  console.log(resp); 
  console.log(folder);
  var emails = resp.filter((p) => p.folder== folder);  
  resp =emails; 
  console.log(resp);
  res.status(200).json(resp);
})

app.get('/:id', function (req, res) {
  console.log("Read mail item")
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.messages;

  const passId = req.params.id;  
  var emails = resp.filter((p) => p.id== passId);  
  resp =emails[0]; 
  console.log(resp);
  res.status(200).json(resp);
})


/*app.get('/cart', function (req, res) {
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
});*/


