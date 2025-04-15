const express = require('express');
const controller = require('../controller/controller');
const routers = express.Router();

routers.post('/cadastro',controller.clienteController.criarNewProdutos)
routers.put('/atualizar/:id',controller.clienteController.atualizar)
routers.get('/ListaProdutos',controller.clienteController.listarProduto)
routers.get('/Lista/:id',controller.clienteController.listaProdutoId)
routers.delete('/Delete/:id',controller.clienteController.deletar)
routers.post('/cadastroUsuario',controller.User.criarNewUser)
routers.delete('/DeleteUsuario/:id',controller.User.deletarUser)
routers.get('/ListaUsuario/:id',controller.User.listaUserId)

module.exports = routers;