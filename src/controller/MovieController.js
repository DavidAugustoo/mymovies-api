const ValidationContract = require('../validator/validator');
const repository = require('../repositories/MovieRepository');
const authService = require('../services/authService');

exports.all = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        var response = await repository.get(data.id);

        res.status(200).send(response[0].movies);
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}; 

exports.add = async (req, res) => {

        let contract = new ValidationContract();
        contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
        contract.isRequired(req.body.rating, 'Digite uma nota para o filme');
        contract.ratingValid(req.body.rating, 'Digite uma nota entre 0 e 5');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }


    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.create(data.id, {
            name: req.data.name,
            thumb: req.data.thumb,
            rating: req.data.rating
        });
        res.status(201).send({
            message: 'Filme cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}; 

exports.edit = async (req, res) => {
    
    let contract = new ValidationContract();
    contract.isRequired(req.body.rating, 'Digite uma nota para o filme');
    contract.ratingValid(req.body.rating, 'Digite uma nota entre 0 e 5');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        let response = await repository.update(data.id, {
            id: req.params.id,
            name: req.data.name,
            thumb: req.data.thumb,
            rating: req.data.rating
        });

        if(response == true) {
            res.status(200).send({
                message: 'Filme atualizado com sucesso!'
            })
        } else {
            res.status(401).send({
                message: 'Filme não encontrado como favorito'
            })
        };
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}; 

exports.delete = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.delete(data.id, {
            id: req.params.id
        });

        res.status(200).send({
            message: 'Filme deletado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}; 