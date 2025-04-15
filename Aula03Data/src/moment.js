const moment = require('moment');

function verificarData(dataEntrada){
    //verificar o tipo de dado da data
    if(typeof dataEntrada !=='string') return null;

    //validar a data no formato brasileiro
    const dataBR = moment(dataEntrada, 'DD/MM/YYYY',true);
    if(dataBR.isValid()){
        return dataBR.format('YYYY-MM-DD');
    }

    //validar se a data ja se encontra no formato americano correto
    const dataUSA = moment(dataEntrada, 'DD/MM/YYYY',true);
    if(dataUSA.isValid()){
        return dataEntrada;
    }
    return null;
}
module.exports = verificarData;