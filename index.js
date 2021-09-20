const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');

let app = express();

const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
    // res.render('index');
    res.render('index', {
        //  settings: settingsBill.getSettings(),
         totals: settingsBill.totals()
    });
});

app.post('/settings', function(req, res){

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });
    console.log(settingsBill.getSettings());
   res.redirect('/');
});

app.post('/action', function(req, res){

    console.log(req.body.billItemTypeWithSettings);
    settingsBill.recordAction(req.body.actionType)
    res.redirect('/');
});

app.get('/actions', function(req, res){

});

app.post('/actions/:type', function(req, res){

});

const PORT = process.env.PORT || 3011;

app.listen(3011, function(){
    console.log('App started at Port: ', PORT)
});