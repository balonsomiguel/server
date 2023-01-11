const rutas = require('express').Router();
const conn = require('./config/connMysql');

/*rutas.get('/',function(req,res){
    res.send('realizó el enrutamiento');
});*/


// Request Productos


//Listar Productos


rutas.get('/productos',(req,res)=>{
    //let tabla = (req.baseUrl).replace('/api','');
    //let sql =`select * from ${tabla}`;
    let sql ='select * from productos';
    conn.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            //res.json(rows);
            res.status(200).json({"status":200,"productos": rows});
        }
    });
});

//Obtener un producto por id

rutas.get('/productos/:id',(req,res)=>{
    const {id} = req.params; 
    let sql ='select * from productos where id = ?';
    conn.query(sql,[id],(err,rows,fields)=>{
        if(err) throw err;
        else{
            //res.json(rows);
            res.status(200).json({"status":200,"producto": rows});
        }
    });
});

//Añadir un producto

rutas.post('/productos/add',(req,res)=>{
    const {name,value,description} = req.body;
    const date = new Date();
    let sql = `insert into productos(name,value,description,createDate) values ('${name}','${value}','${description}','${date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()}')`;
    conn.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows);
        }
    });
});

//Eliminar un producto por id

rutas.delete('/productos/delete/:id',(req,res)=>{
    const {id} = req.params; 
    let sql ='delete from productos where id = ?';
    conn.query(sql,[id],(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows);
        }
    });
});

rutas.put('/productos/update/:id',(req,res)=>{
    const {id} = req.params; 
    const {nombre,valor,descripcion} = req.body;
    const date = new Date();
    let sql =`update productos set name='${nombre}', value='${valor}', description='${descripcion}', updateDate='${date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()}' where id=${id}`;
    conn.query(sql,[id],(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows);
        }
    });
});

// Request atributos

//Listar atributos

rutas.get('/atributos',(req,res)=>{
    //let tabla = (req.baseUrl).replace('/api','');
    //let sql =`select * from ${tabla}`;
    let sql ='select * from atributos';
    conn.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            //res.json(rows);
            res.status(200).json({"status":200,"atributos": rows});
        }
    });
});

//Registrar atributo nuevo
rutas.post('/atributos/registrar',(req,res)=>{
    const {name,type} = req.body;
    let sql = `insert into atributos(name,type) values ('${name}','${type}')`;
    conn.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.status(200).json({"status":200,"msjResp": 'Atributo registrado'});
        }
    });
});


// Request clientes

//Registrar cliente nuevo
rutas.post('/clientes/registrar',(req,res)=>{
    const {email,password} = req.body;
    let sql = `insert into clientes(email,password) values ('${email}','${password}')`;
    conn.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.status(200).json({"status":200,"msjResp": 'Cliente registrado'});
        }
    });
});

//Traer cliente por email
rutas.get('/clientes/:email',(req,res)=>{
    const {email} = req.params; 
    let sql ='select * from clientes where email = ?';
    conn.query(sql,[email],(err,rows,fields)=>{
        if(err) throw err;
        else{
            console.log('pasa por aca');
            res.status(200).json({"status":200,"msjResp": 'Cliente registrado'});
        }
    });
});


// Request compras

//Registrar compra nueva

rutas.post('/compras/add',(req,res)=>{
    const {usuario,producto,atributos} = req.body;
    const date = new Date();
    let sql = `insert into compras(usuario,producto,atributos,createDate) values (${usuario},'${producto}','${atributos}','${date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()}')`;
    conn.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows);
        }
    });
});

module.exports = rutas;