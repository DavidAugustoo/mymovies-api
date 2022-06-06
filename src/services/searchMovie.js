const axios = require("axios");
const { request } = require("express");

exports.findMovie = function (req, res, next) {
    const { name, rating } = req.body;

    let nameMovie = name.replace(' ', '%20');

    const options = {
        method: 'GET',
        url: `https://imdb-api.com/pt-BR/API/SearchMovie/k_8eskr8s4/${nameMovie}`,
        headers: {
        }
      };
      
      axios.request(options).then(function (response) {
        if(response.data.results[0] != null || response.data.results[0] != undefined) {
            request.data = {
                name: response.data.results[0].title,
                thumb: response.data.results[0].image,
                rating
            }
            next();
        } else {
            res.status(404).json({
                message: 'Filme não encontrado'
            });
        }
      }).catch(function (error) {
          console.error(error);
      });
};



