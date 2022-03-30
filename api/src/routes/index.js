const { Router } = require('express');

const axios = require('axios');
const Country = require('../models/Country');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Me traigo toda la info que voy a necesitar desde la api
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            flag: el.flag,
            continent: el.continent,
            capital: el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population
        }
    });
    return apiInfo;
};

// Ahora desde la base de datos...
const getDbInfo = async () => {
    return await Country.findAll({
        include:{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through:{
                attributes:[]
            },
        }
    });
};


// Me traigo todo
const getAllCountries = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/countries', async(req, res) => {

})


module.exports = router;
