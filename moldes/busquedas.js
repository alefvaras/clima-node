const fs = require('fs');
const axios = require('axios')
class Busquedas {

    historial = [];

    dbPath = './db/historial.json'

    constructor() {

   this.leerDb(this.dbPath)
    }
    leerDb(dbPath){
        if (!fs.existsSync(dbPath)) {
            return null;
        }

        const info=fs.readFileSync(this.dbPath,{encoding:'utf-8'});

        const data = JSON.parse( info );

        
        this.historial=data.historial;
    }



    get params() {
        return {
            'access_token': process.env.mapbox_key,
            limit: 5
        }
    }

    async ciudad(lugar = '') {

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.params

            })
            const resp = await instance.get();


            return resp.data.features.map(lugar => ({


                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]


            }));


        } catch (error) {
            return [];
        }

    }

    async climaLugar(lat = '', lon = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat: lat,
                    lon: lon,
                    appid: process.env.openweathermap,
                    units: 'metric',
                    lang: 'es'
                }

            })

            const resp1 = await instance.get();

            const { weather, main } = resp1.data;



            return ({

                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp

            })




        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar = '') {

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDb()

    }
    guardarDb() {

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
}

module.exports = Busquedas;