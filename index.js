//PROVA PAOO ( PROFESSOR BOSSINI)
require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getCoordenadas = (cidade) => {
    const apiKey = process.env.APPID; 
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    return axios.get(url)
        .then(response => {
            if (response.data.length === 0) {
                throw new Error('Cidade não encontrada');
            }
            const { lat, lon } = response.data[0];
            return { lat, lon };
        })
        .catch(error => {
            console.error('Erro ao obter coordenadas:', error.message);
            throw error; 
        });
};


rl.question('Digite o nome da cidade: ', (cidade) => {
    getClimaCidade(cidade)
        .then(() => rl.close()) 
        .catch(() => rl.close()); 
});