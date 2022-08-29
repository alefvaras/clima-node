const inquirer = require('inquirer');
require('colors');

const inquirerMenu=async()=>{

console.clear();
console.log('Seleccione una opcion\n'.green);


const preguntas=[{
    type:'list',
    name:'opcion',
    message:'Que desea hacer?',
    choices:[{
        value:1,
        name:`${'1'.red}. Buscar ciudad`
    },

    {
        value:2,
        name:`${'2'.red}. Hitorial`
    },
    
    {
        value:0,
        name:`${'3'.red}. Salir`
    },
    

    
]

}]
const {opcion}=await  inquirer.prompt(preguntas)
    
return opcion;

}

const inquirerPausa=async()=>{

    const question=[{
        type:'input',
        name:'enter',
        message:'Presione Enter para continua'

    }]
return await  inquirer.prompt(question)

}
const leerInput=async(message)=>{
const question=[
    {
        type:'input',
        name:'desc',
        message: message,
        validate(value){
            if(value.length===0){
                return 'Por favor ingrese un valor'
            }
            return true
        }
    }
]

const {desc}= await inquirer.prompt(question);

return desc;
}

const listLugares = async(lugares=[]) => {
const choices=lugares.map((lugar,idx)=>{

    const id= `${idx+1}`.green;
    return {
        value:lugar.id,
        name: `${id} ${lugar.nombre}`
    }
})
choices.unshift({
    value:'0',
    name:'0.'.green+'cancelar'
})
const preguntas=[
    {
        type:'list',
        name:'id',
        message:'seleccione lugar',
        choices
    }
]
const {id} = await inquirer.prompt(preguntas);

return id;

}


const mostarListadoChecklist = async(Tareas=[]) => {
    const choices=Tareas.map((tarea,idx)=>{
    
        const id= `${idx+1}`.green;
        return {
            value:tarea.id,
            name: `${id} ${tarea.desc}`,
            check: (tarea.completadoEb)?true:false
        }
    })

    const pregunta=[
        {
            type:'checkbox',
            name:'ids',
            message:'seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    
    return ids;
    
    }

const confirmar= async (message)=>{
const question=[{
    type:'confirm',
    name:'ok',
    message
}
    
];

const {ok} = await inquirer.prompt(question);

return ok;
}
module.exports={
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listLugares,
    confirmar,
    mostarListadoChecklist
}