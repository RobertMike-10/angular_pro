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


 //read playlist
 app.get('/api/playlist', function (req, res) {
  console.log("Read playlist");
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var resp =obj.playlist;

  res.status(200).json(resp);
})

app.put('/api/playlist/:id', function (req, res) {
  console.log("Write song");
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));    
  var playlist =obj.playlist;
  const passId = req.params.id; 
  var song = req.body;  
  var newArray = playlist.map((p) => {
    if(p.id === song.id){
      p = Object.assign({},p,song);
    }
    return p;
  }); 

  obj.playlist = newArray;    //copio el array actualizado
  console.log(newArray);
  let data = JSON.stringify(obj);
  //escribo a disco  
  fs.writeFileSync('db.json', data);
  res.status(200).json(req.body); 
})

 


