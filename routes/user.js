const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router(); //nos ayuda a segmentar nuestro codigo y que por default sea esa la ruta sin necesidad de especificar
const db = require('../config/database.js'); //importamos nuestra base de datos .. salir carpeta


user.post('/signin', async (req,res,next)=>{
    const { user_name, user_mail, user_password } = req.body;

   if(user_name && user_mail && user_password){

    let query = "INSERT INTO user (user_name,user_mail, user_password)";
    query +=  `vALUES('${user_name}', '${user_mail}', '${user_password}')`;



    const rows = await db.query(query);
    if(rows.affectedRows == 1){
        return res.status(201).json({code: 201, message: "usuario insertado"});
    }
    return res.status(500).json({code: 500, message: "hubo un error"});
   }
   return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.post("/login", async(req,res,next) =>{
    const {user_mail, user_password} = req.body;

    let query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'`;

    const rows = await db.query(query);
    console.log(rows);

   if(user_mail && user_password){
    if(rows.length == 1){
        //Gnererar un token
        //jwt: recobe un json  
        const token = jwt.sign({
            user_id: rows[0].user_id,
            user_mail: rows[0].user_mail

        },"debugkey");
        //DEbugkey es una llave secreta y debe ser almacenada en una variable de entorno 
        return res.status(200).json({code: 200, message: token});
    }else{
        res.status(200).json({code: 200, message: "Usuario y/o contraseña incorrecta"});
    }
   }
   return res.status(500).json({code: 500, message: "campos incompletos"});

   


   
});

user.get("/", async(req,res,next) => {
    const query = "SELECT * FROM `user`";    
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows});
});

module.exports = user; //añade al arbol de dependencias y lo añade como una libreria para usarlo como una desde cualquier lugar del codigo
