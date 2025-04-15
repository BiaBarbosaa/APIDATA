const UserModel = require('../models/models');
const clienteModel = require('../models/models');

const verificarData = require('../src/moment');


const clienteController = {
    async criarNewProdutos(req,res){
        let dataFormatada = null;

        try{
            const {nome,categoria,descricao,preco,marca,data_lancamento} = req.body

            //verificar se os campos obrigatórios estão preenchidos 
            if(!nome || !categoria || !preco){
                return res.status(400).json({mensagem:"Os campos são obrigatórios"})
            }
            //verificar se a categoria esta correta
            const categoriaValida = ['maquiagem','acessorio','perfume','moda','cabelo']
            if(!categoriaValida.includes(categoria)){
                return res.status(400).json({mensagem:"Categoria inválida"})
            }

            //validação do formato da data recebida do objeto na variavel
            //data_lancamento
            //yyyy-mm-dd
            if(data_lancamento){
                dataFormatada = verificarData(data_lancamento);
                if(!dataFormatada)//se o retorno for nulo/vazio
                return res.status(400).json({
                    mensagem:"Data inválida. Use o formato DD/MM/YYYY OU YYYY-MM-DD"
                });
            }
            //fazer a chamada da model para cadastrar na tabela do banco
            const novoProduto = await clienteModel.Produto.criarProduto({
                nome,
                categoria,
                descricao,
                preco,
                marca,
                data_lancamento: dataFormatada
            });
            res.status(201).json(novoProduto);
        }
        catch(error){
            res.status(500).json({mensagem: error.message})

        }
    },
    async listarProduto(req, res) {
        try {
            const produtos = await clienteModel.Produto.listarProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error.message });
        }
    },
    async listaProdutoId(req, res) {
        try {
            const { id } = req.params;
            if (!id ) {
                return res.status(400).json({ mensagem: 'ID inválido' });
            }

            const produto = await clienteModel.Produto.listaId(id);

            if (!produto) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }

            res.status(200).json(produto);
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ mensagem: 'ID inválido' });
            }

            const product = await clienteModel.Produto.buscarPorId(id);

            if (!product) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }
            const sql = await clienteModel.Produto.atualizar(req.params.id)

            if (sql) {
                const { nome, categoria, descricao, preco, marca, data_lancamento } = req.body
                await clienteModel.Produto.atualizar(nome, categoria, descricao, preco, marca, data_lancamento, req.params.id);
                res.status(200).json( { mensagem: 'Atualizado com sucesso' });
            }
            else {
                res.status(404).json({ msg: "Erro ao atualizar" })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error.message });
        }
    },
    async deletar(req, res) {
        try {
            const id = req.params.id;
            const result = await clienteModel.Produto.deletar(id);
           
            if (result.affectedRows > 0) {
                res.status(200).json({msg: "Deletado com sucesso"});
            } else {
                res.status(404).json({msg: "ID não existe no banco de dados"});
            }
        } catch(erro) {
            console.error("Erro ao deletar:", erro);
            res.status(500).json({msg: "Erro no servidor"});
        }
    }    
    
};

// Objeto para funções do usuário
const User = {
    async criarNewUser(req, res) {
        try {
            const { nome, sobrenome, email, status, senha, data_criacao } = req.body;

            if (!nome || !sobrenome || !senha || !email) {
                return res.status(400).json({ mensagem: "Os campos são obrigatórios" });
            }
            const categoriaValida = ['ativo', 'inativo'];
            if (status && !categoriaValida.includes(status)) {
                return res.status(400).json({ mensagem: "Status inválido" });
            }
            if(data_criacao){
                dataFormatada = verificarData(data_criacao);
                if(!dataFormatada)//se o retorno for nulo/vazio
                return res.status(400).json({
                    mensagem:"Data inválida. Use o formato DD/MM/YYYY OU YYYY-MM-DD"
                });
            }
            const novoUser = await UserModel.User.cadastrarUser({
                nome,
                sobrenome,
                email,
                status,
                senha,
                data_criacao: dataFormatada
            });

            res.status(201).json(novoUser);
        } catch (error) {
            res.status(500).json({ mensagem: error.message });
        }
    },
    async deletarUser(req, res) {
        try {
            const id = req.params.id;
            const result = await UserModel.User.deletar(id);
           
            if (result.affectedRows > 0) {
                res.status(200).json({msg: "Deletado com sucesso"});
            } else {
                res.status(404).json({msg: "ID não existe no banco de dados"});
            }
        } catch(erro) {
            console.error("Erro ao deletar:", erro);
            res.status(500).json({msg: "Erro no servidor"});
        }
    },    
    async listaUserId(req, res) {
        try {
            const { id } = req.params;
            if (!id ) {
                return res.status(400).json({ mensagem: 'ID inválido' });
            }

            const user = await UserModel.User.listaId(id);

            if (!user) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error.message });
        }
    }
};

module.exports = {
    clienteController,
    User
}
   
