const express = require('express');
const app = express();
const mysql2 = require("mysql2");
app.use(express.json());

const query = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"azozm9088",
    database:"products"
});

app.post("/add-product",(req,res)=>{
    const {name,price,description} = req.body;
    query.execute(`insert into product (name,price,description) values ('${name}',${price},'${description}')`);
    res.status(200).json({
        message:"success"
    });
});

app.get("/products",(req,res)=>{
    query.execute(`select * from product`,(err,data)=>{
        if(err){
            res.json({
                message:"error",
                err
            })
        }else{
            res.json({
                message:"success",
                data
            });
        }
    })
});
app.get("/products/:id",(req,res)=>{
    const id = req.params.id;
    query.execute(`select * from product where id = ${id}`,(err,data)=>{
        if(err){
            res.json({
                message:"fail",
                err
            })
        }else{
            res.json({
                message:"success",
                data
            })
        }
    })
});
app.put("/products/:id",(req,res)=>{
    const {id,name,price,description} = req.body;
    query.execute(`update product set name='${name}',price=${price},description='${description}' where id = ${id}`,(err,data)=>{
        if(err){
            res.json({
                message:"fail"
            })
        }else{
            res.json({
                message:"success"
            })
        }
    });

});

app.delete("/products/:id",(req,res)=>{
    const id =req.params.id;
    query.execute(`delete from product where id = ${id}`);
    res.status(200).json({
        status:"success",
        message:"success"
    })
});



const port = 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});