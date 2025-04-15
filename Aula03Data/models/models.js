const bcrypt = require('bcrypt');
const conexao = require('../config/db');

const Produto = {
    async criarProduto(produto){
        try{
            const {nome,categoria,descricao,preco,marca,data_lancamento} = produto

            const [result] = await conexao.query(
                "INSERT INTO produtos_beleza (nome, categoria,descricao,preco,marca,data_lancamento) VALUES(?,?,?,?,?,?)",
                [nome,categoria,descricao,preco,marca,data_lancamento]
            );
            return result
        }
        catch(error){
            throw new Error(`Erro ao criar o produto ${error.message}`)//throw new Error,forma para realizar o lançamento de um novo erro e ser tratado pela controller
    
        }

    },
    async listarProdutos() {
        try {
            const [produtos] = await conexao.query(
                "SELECT * FROM produtos_beleza"
            );
            return produtos;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Erro ao listar produtos: ${error.message}`);
        }
    },
    async listaId(id){
        try{
            const[produto] = await conexao.query(
                "SELECT * FROM produtos_beleza WHERE id=?", [id]
            );
            return produto
        }
        catch(error){
            console.log(error);
            throw new Error(`Erro ao encontrar o id desse produto: ${error.message}`);
        }
    },
    async atualizar(nome, categoria, descricao, preco, marca, data_lancamento,id){
        try{
            const[result] = await conexao.query(
                "UPDATE produtos_beleza SET nome=?, categoria=?, descricao=?, preco=?, marca=?, data_lancamento=?  WHERE id=?",
                [nome, categoria, descricao, preco, marca, data_lancamento,id]
            );
            return result

        }
        catch(error){
            console.log(error);
            throw new Error(`Erro ao atualizar o produto: ${error.message}`);
        }
    },
    async deletar (id) {
        try{
            const [result] = await conexao.query(
                "DELETE FROM produtos_beleza WHERE id = ?", [id])
                return result;
        }
        catch(error){
            console.log(error);
            throw new Error(`Erro ao deletar produto: ${error.message}`);
        }
    }
};

//Model para as regras de negócio do usuário
const User = {
    async cadastrarUser(user) {
        try {
            const { nome, sobrenome, email, status, senha, data_criacao } = user;
            const password = await bcrypt.hash(senha,10);
    
            const [result] = await conexao.query(
                "INSERT INTO cadastroUsuarios (nome, sobrenome, email, status, senha, data_criacao) VALUES (?, ?, ?, ?, ?, ?)",
                [nome, sobrenome, email, status, password, data_criacao]
            );

        } catch (error) {
            throw new Error(`Erro ao cadastrar o usuário: ${error.message}`);
        }
    },
    async deletar (id) {
        try{
            const [result] = await conexao.query(
                "DELETE FROM cadastroUsuarios WHERE id = ?", [id])
                return result;
        }
        catch(error){
            console.log(error);
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    },
    async listaId(id){
        try{
            const[user] = await conexao.query(
                "SELECT * FROM cadastroUsuarios WHERE id=?", [id]
            );
            return user
        }
        catch(error){
            console.log(error);
            throw new Error(`Erro ao encontrar o id desse usuarios: ${error.message}`);
        }
    },

}
module.exports ={
    Produto,
    User
}
   