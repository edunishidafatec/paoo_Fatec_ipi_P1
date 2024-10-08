//PROVA PAOO ( PROFESSOR BOSSINI)
require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getCoordenadas = (city) => {
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

const getTempoAtual = async (lat, lon) => {
    const apiKey = process.env.APPID; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`; 

    try {
        const response = await axios.get(url);
        const feels_like = response.data.main.feels_like; 
        const description = response.data.weather[0].description; 
        return { feels_like, description };
    } catch (error) {
        console.error('Erro, não foi possivel obter condições atuais:', error.message);
        throw error; 
    }
};


const getClimaCidade = async (city) => {
    try {
        await getCoordenadas(city)
            .then(async ({ lat, lon }) => {
                const { feels_like, description } = await getTempoAtual(lat, lon);
                console.log(`Sensação térmica: ${feels_like}°C`);
                console.log(`Descrição: ${description}`);
            });
    } catch (error) {
        console.error('Erro:', error.message);
    }
};


rl.question('Digite o nome da cidade: ', (city) => {
    getClimaCidade(city)
        .then(() => rl.close()) 
        .catch(() => rl.close()); 
});