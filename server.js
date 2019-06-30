var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const testRouter = require('./routers/userRouter');
const gameRouter = require('./routers/gameRouter');


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(testRouter);
app.use(gameRouter);

app.use(function(req, res, next){
    res.status(404);
  
    if (req.accepts('html')) {
      res.render('404');
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    } 
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

app.listen(3000, (err, next) => {
    if(err){
        console.log(err);
    } else {
        console.log("Port 3000");
    }
})