const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'seguros'
});


connection.connect((err)=>{
    if(err){
        console.log('Fallo al conectar BD de seguros:' + err);
    }
    else{
        console.log('Conexion establecida con BD de seguros');
    }
});

module.exports = connection;