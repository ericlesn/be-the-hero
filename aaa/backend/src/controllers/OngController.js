const connection = require('../database/connection');
const crypto = require('crypto'); //pacote node 
module.exports ={
    async index (request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);      
},

    async create(request, response){
        const { name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');//metodo tirado de crypto para gerar a id, pegando 4 carcateres aleatorios
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id });
    }
};