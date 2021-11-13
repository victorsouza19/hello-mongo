const express = require('express'),
app = express(),
flash = require('express-flash'),
session = require('express-session'),
cookieParser = require('cookie-parser');

// class import to CRUD methods
const Customer = require('./database/CustomerController');
let customer = new Customer();

// view engine config
app.set('view engine', 'ejs');

// parse config
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// setting public directory
app.use(express.static("./public"));

// cookie parser config
app.use(cookieParser("b7bc6b6322a6f"));

// use express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// use express-flash
app.use(flash());


app.get("/", (req, res) => {
  let msg = req.flash("msg");
  msg = (msg == undefined || msg.length == 0) ? undefined : msg;

  customer.list().then(customers => {
    res.render("index", {customers, msg});

  }).catch(err => {
    console.log(err);
  })
  
});

app.get("/customers/new", (req, res) => {
  res.render("new"); 
});

app.post("/customers/new", (req, res) => {
  const { document, name, telephone } = req.body;

  customer.insert(document, name, telephone).then(customer => {
    req.flash("msg", "Usuário cadastrado com sucesso!");
    res.redirect("/");
  });
});

app.get("/customers/edit/:id", (req, res) => {
  const { id } = req.params.id;

  customer.listOne(id).then(customer => {
    res.render("edit", {customer});
    
  }).catch(err => {
    console.log(err);
  })
});

app.post("/customers/delete", (req, res) => {
  const { cpf } = req.body;
  let data = { cpf };

  customer.delete(data).then(result => {
    req.flash("msg", "Usuário apagado com sucesso!");
    res.redirect("/");
  })
})

// server config
app.listen(5002, (req, res) => {
  console.log('Server Running');
})