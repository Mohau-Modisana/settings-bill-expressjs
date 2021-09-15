const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(){
    res.render('index');
});

app.post('/settings ', function(req, res){

});

app.post('/action ', function(req, res){

});

app.get('/actions ', function(req, res){

});

app.post('/actions/:type ', function(req, res){

});

const PORT = process.env.PORT || 3011;

app.listen(3011, function(){
    console.log('App started at Port: ', PORT)
});