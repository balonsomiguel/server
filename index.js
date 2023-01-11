require('./config/connMysql');

const cors = require('cors');
const express = require('express');
const port = (process.env.port || 3000);

// express
const app = express();

// config
app.set('port',port);

app.use(express.json());

// Cors
app.use(cors());

// rutas
app.use('/api',require('./routes'));


// iniciar express
app.listen(app.get('port'),(err)=>{
    if(err){
        console.log('Se ha generado un error iniciando el servidor: '+err);
    }
    else{
        console.log('Servidor iniciado en el puerto: '+port);
    }
});