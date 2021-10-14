const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

let app = express();

const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({layoutsDir: './views/layouts'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function(req, res){

  res.render('index', {
         settings: settingsBill.getSettings(),
         totals: settingsBill.totals(),
         actions: settingsBill.hasReachedWarningLevel()
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
    settingsBill.recordAction(req.body.billItemTypeWithSettings)
    res.redirect('/');
});

app.get('/actions', function(req, res){
    res.render('actions', {
        actions: settingsBill.actions(),
    });
});

app.get('/actions/:type', function(req, res){
    const actionType = req.params.type; 
    res.render('actions', {actions: settingsBill.actionsFor(actionType)});
});

const PORT = process.env.PORT || 3011;
app.listen(PORT, function(){
    console.log('App started at Port: ', PORT)
});