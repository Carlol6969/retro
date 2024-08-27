const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
         produto (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            descricao TEXT, 
            estoqmin integer, 
            estoqmax integer,
            )
            `, (createTableError) => {
    if (createTableError) {
        return res.status(500).send({
            error: createTableError.message
        });
    }
});


//consultar todos os dados
router.get("/",(req,res,next)=>{
    db.all('SELECT * FROM produto', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista de todos os Produtos",
            produtos: rows
        });
    });
})

//consultar apenas produt pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM produto', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro do Produto",
            produto: rows
        });
    });
})

// aqui salvamos dados do produto
router.post("/",(req,res,next)=>{
const {descricao, estoqmax, estoqmin} = req.body;
db.serialize(()=>{ 
    const insertProduto = db.prepare(`
    INSERT INTO produto(descricao,estoqmax,estoqmin)VALUES(?,?,?)`);
    insertProduto.run(descricao,estoqmax,estoqmin)
    insertProduto.finalize()

});
process.on("SIGINT", ()=>{
    db.close((err)=>{
        if (err){
            return res.status(304).send(err.message);
        }
    });
});
  res.status(200)
  .send({mensagem:"Produto salvo com sucesso"
});
});

// aqui podemos alterar dados do produto
router.put("/",(req,res,next)=>{
    const {id,descricao,estoqmax,estoqmin} = req.body;
    db.run('UPDATE produto SET descricao=?,estoqmax=?,estoqmin=? where id=?',[descricao,estoqmax,estoqmin,id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
           
        }
        res.status(200).send({
            mensagem: `Produto de id:${id} foi alterado com sucesso`,
        });
    });
        

});
 // Aqui podemos deletar o cadastro de um usuário por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM produto where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
           
        }
        res.status(200).send({
            mensagem: `Produto de id:${id} deletado com sucesso`,
        });
    });
        
    

   
});
module.exports = router;