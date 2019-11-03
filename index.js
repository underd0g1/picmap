//require modules
const express = require('express');
const datastore = require('nedb');
const app = express();

//database init
const database = new datastore('database.db');
database.loadDatabase();


//right now this will serve webpages (index.html) , set up of the static html page
app.listen(3000, ()=> console.log('listening on port 3000'));
app.use(express.static ('public'));
app.use(express.static('public/picmap.html'));
app.use(express.json({limit:'5000mb'}));

//the post to the page and also the database
app.post('/api',(request,response)=>{
  console.log('i got a request!');
  console.log(request.body);
  const timestamp = Date.now();
  request.body.timestamp = timestamp;
  database.insert(request.body);
  response.json({
    status: 'sucess',
    latitude: request.body.lat,
    longitude: request.body.long,
    timestamp: timestamp
  });

});

app.get('/api',(request,response)=>{
  database.find({},(err, data)=>{
  if(err){
    response.end();
    return;
  }
    response.json(data);
  });
});
