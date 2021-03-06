const mysql = require('mysql');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({

    host: process.env.DATABASE_HOST,
 
    user: process.env.DATABASE_USER,
 
    password: process.env.DATABASE_PASSWORD,
     database: process.env.DATABASE
 
  });
  exports.login = async (req , res) => {
    try{
        const {email, password} = req.body;

        if( !email || !password ) {
            return res.status(400).render('login',{
                message:'Please provide an email and password '
            })
        } 
       

    }
    catch (error) {
        console.log(error);

    }

}

exports.register =  (req, res)=>{
    console.log(req.body);
    
    const {nom , email, password , passwordConfirm} = req.body;

    db.query('SELECT email From users WHERE email = ?' , [email], async (error, results)=>{
        if(error) {
            console.log(error);
        }
        if(results.length > 0) {
           return res.render('register' , {
                message:'That email is already in use'
            })
        }else  if( password !== passwordConfirm){

                    return res.render('register' , {
                    message:'Passwords do not match  '
            });
              
        }
           
              
           let hashedPassword = await bcrypt.hash(password, 8);
           console.log(hashedPassword);

    });
   
}
