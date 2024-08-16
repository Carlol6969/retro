const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
        estoque (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            idproduto integer, 
            qntde integer, 
            valorunit real,
            total integer
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
    db.all('SELECT * FROM estoque', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista de todo o estoque",
            produtos: rows
        });
    });
})

//consultar apenas produt pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM estoque', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro de estoque",
            produto: rows
        });
    });
})

// aqui salvamos dados do produto
router.post("/",(req,res,next)=>{
const {idproduto,qntde,valorunit,total} = req.body;
db.serialize(()=>{ 
    const insertEstoque = db.prepare(`
    INSERT INTO estoque(idproduto,qntde,valorunit,total)VALUES(?,?,?,?)`);
    insertEstoque.run(idproduto,qntde,valorunit,total)
    insertEstoque.finalize()

});
process.on("SIGINT", ()=>{
    db.close((err)=>{
        if (err){
            return res.status(304).send(err.message);
        }
    });
});
  res.status(200)
  .send({mensagem:"estoque salva com sucesso"
});
});

// aqui podemos alterar dados do produto
router.put("/",(req,res,next)=>{
    const {id,idproduto,qntde,valorunit,total} = req.body;
    db.run('UPDATE estoque SET idproduto=?,qntde=?,valorunit=?,total=? where id=?',[idproduto,qntde,valorunit,total,id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
           
        }
        res.status(200).send({
            mensagem: `estoque de id:${id} foi alterado com sucesso`,
        });
    });
        

});
 // Aqui podemos deletar o cadastro de um usuário por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM estoque where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
           
        }
        res.status(200).send({
            mensagem: `estoque de id:${id} deletado com sucesso`,
        });
    });
        
    

   
});
module.exports = router;