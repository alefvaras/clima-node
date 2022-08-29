require('dotenv').config()

const { leerInput, inquirerMenu, inquirerPausa, listLugares } = require("./helpers/inquirer");
const Busquedas = require("./moldes/busquedas");



const main = async () => {

    let opt;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:

                const lugar = await leerInput('ciudad: ')

                const lugares = await busquedas.ciudad(lugar);

                const id = await listLugares(lugares);


                if (id === '0') continue;


                const lug = lugares.find(l => {
                    return l.id === id
                });
                busquedas.agregarHistorial(lug.nombre)
                const clima = await busquedas.climaLugar(lug.lat, lug.lng)

                console.clear()
                console.log()
                console.log('informacion de la ciudad')
                console.log()
                console.log('ciudad: ', lug.nombre)
                console.log('lat:', lug.lat)
                console.log('lng: ', lug.lng)
                console.log('temperatura: ', clima.temp)
                console.log('minima: ', clima.min)
                console.log('maxima: ', clima.max)


                break;


            case 2:


                busquedas.historial.forEach(lugar => {
                    console.log(JSON.stringify(lugar))
                })
                    

               

                break;


        }

        if (opt !== 0) await inquirerPausa();

    } while (opt !== 0)
}

main();
