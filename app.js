const express = require('express');
 const mysql = require('mysql');
 const path = require('path');
 const dotenv = require('dotenv');
 
   dotenv.config({ path:'./.env'});
 

   const app = express();


  const db = mysql.createConnection({

    host: process.env.DATABASE_HOST,
 
    user: process.env.DATABASE_USER,
 
    password: process.env.DATABASE_PASSWORD,
     database: process.env.DATABASE
 
  });
  /*db.connect((error)=>{
    if(error) {
      console.log(error)
    }else{
      console.log("MYSQL Connected")
    }
  });*/
 
  const publicDirectory = path.join(__dirname,'./public');
 app.use(express.static(publicDirectory));
 app.use(express.json());
  app.set('view engine', 'hbs');
  //app.use(express.urlencoded({extende: false }));

  

app.get('/', (req, res)=>{
 //res.send('Bonjour !')
 res.render('index')
});
app.get('/register', (req, res)=>{
  //res.send('Bonjour !')
  res.render('register')
 })

//define router

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen('3000', () => {
    console.log('Server started on port 3000');
})