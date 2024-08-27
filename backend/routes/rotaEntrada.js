const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
         entrada (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            idproduto int, 
            qntde Real, 
            valorunit Real,
            dataentrada Date
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
db.all('SELECT * FROM entrada', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista de todass as Entradas",
            entradas: rows
        });
    });
})

//consultar apenas uma entrada pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM entrada where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro da Entrada",
            entrada: rows
        });
    });
})




// aqui salvamos dados da entrada
router.post("/",(req,res,next)=>{
    const { idproduto, qntde, valorunit, dataentrada }
     = req.body;
   db.serialize(() => {
        const insertEntrada = db.prepare(`
        INSERT INTO entrada(idproduto, qntde, valorunit, dataentrada) 
        VALUES(?,?,?,?)`);
        insertEntrada.run(idproduto, qntde, valorunit, dataentrada);
        insertEntrada.finalize();
});

            atualizarestoque(idproduto, qntde, valorunit);

    process.on("SIGINT", () => {
        db.close((err) => {
            if (err) {
                return res.status(304).send(err.message);
            }
        });
    });

        
    res.status(200)
    .send({ mensagem: "Entrada salvo com sucesso!" });
});




function atualizarestoque(idproduto,qntde,valorunit){
   
    db.get('SELECT * FROM estoque where idproduto=?',
    [idproduto], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }
      
      if(rows){
        
        // atualizar a quantidade no estoque 1
        // acrescentando a quantidade inserida em entrada 1
        const quantidadeestoque=rows.qntde;

        const quantidadeatualizada=parseFloat(qntde+quantidadeestoque);
        db.serialize(() => {
            //const total = quantidade*valor_unitario
            const updateEstoque = db.prepare(`
            UPDATE estoque SET  qntde=?, valorunit=? Where idproduto=?`);
            updateEstoque.run(quantidadeatualizada, valorunit, idproduto);
            updateEstoque.finalize();
            
            
        });
        
      }else{
        //insira a mesma quantidade inserida em entrada
        db.serialize(() => {
            //const total = quantidade*valor_unitario
            const insertEstoque = db.prepare(`
            INSERT INTO estoque(idproduto, qntde, valorunit) 
            VALUES(?,?,?)`);
            insertEstoque.run(idproduto, qntde, valorunit);
            insertEstoque.finalize();
            
            
        });
      }

    });
}
// aqui podemos alterar dados da entrada
router.put("/",(req,res,next)=>{
    const {id,idproduto, qntde, valorunit, dataentrada} = req.body;
                db.run(`UPDATE entrada SET 
                idproduto=?, qntde=?, valorunit=?, dataentrada=?  
            where id=?`,[idproduto, qntde, valorunit, dataentrada,id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }
        res.status(200).send(
            { mensagem: "Dados da Entrada salvos com sucesso!" 
            });
    });
});
 // Aqui podemos deletar o cadastro de um usuário por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM entrada where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }
        res.status(200).send(
            { mensagem: "Entrada deletada com sucesso!" 
            });
    });


});
module.exports = router;