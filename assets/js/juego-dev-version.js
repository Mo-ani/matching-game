
// variables
let tarjetas = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
let destapadas = 0;
let movimientos = 0;
let aciertos = 0;
let temp = 4;
let tempTiempo = 60;
let intervalTemp = null;
let intervalTiempo = null;
let click = 0;
// Referencias HTML
let tarjeta1 = null;
let tarjeta2 = null;
let tarjetaAll = document.querySelectorAll( '.carta' )
let marcador = document.querySelectorAll( 'small' );
let regresivaInicio = document.querySelector( '.cuenta-regresiva' )
let repetirSection = document.querySelector( '#end-section' )
let btnIniciar = document.querySelector( '.btn-iniciar' )
let btnRepetir = document.querySelector( '.btn-reinicio' )




const block = () => {
    for( let i = 0; i < tarjetaAll.length; i++){
        tarjetaAll[i].disabled = true;
    }
};

block();

const unblock = () => {
    for( let i = 0; i < tarjetaAll.length; i++){
        tarjetaAll[i].disabled = false;
    }
};


// contador regresivo al inicio de la partida
const regresiva = () => {
    if(temp === 1){
        regresivaInicio.innerText = '';
        clearInterval(intervalTemp);
        temp = 4;
        unblock();
        regresivaInicio.innerText = 'Elige';
    } else {
        temp--
        regresivaInicio.innerText = temp;
        block()
    }
};



// Mostrar cartas cuando inicia el programa
const mostrarTarjetas = () => {
    //Recorrer y mostrar tarjetas
    //generar numero aleatorios
    block()
    // Generar numero aleatorios.
    tarjetas = _.shuffle( tarjetas );
    aciertos = 0;
    movimientos = 0;
    tempTiempo = 60;
    marcador[0].innerText = `${tempTiempo} seg`;
    marcador[1].innerText = aciertos;
    marcador[2].innerText = movimientos;
    btnIniciar.innerText = '';
    btnIniciar.disabled = true;
    for( let i = 0; i < tarjetas.length; i++ ){
        // Mientras se muestran los numeros durante 2 segundos limpio nuevamente todas las tarjetas
        tarjetaAll[i].innerText = tarjetas[i];
        setTimeout(() => {
            tarjetaAll[i].innerText = '';
        }, 4000);
    }
    
    intervalTemp = setInterval('regresiva()',1000);
    btnRepetir.innerText = '';
    btnRepetir.disabled = true;
};

//contador del marcador
const tiempo = () => {
    if( tempTiempo === 0 || aciertos === 10){
        block();
        clearInterval( intervalTiempo );
        //crear boton repetir        
        btnRepetir.innerText = 'Repetir'
        btnRepetir.disabled = false;
    } else{
        tempTiempo--
        marcador[0].innerText = `${tempTiempo} seg`
    };
};

// Funcion principal
const destapar = ( id ) => {
    destapadas++
    //crar tarjetas
    if( destapadas === 1 ){
        //Si los movimientos son mayores a 0 se activa el tempo ,esto asegura que solo se ejecute una vez 
        if( movimientos === 0 ){
            intervalTiempo = setInterval('tiempo()',1000);
        }
        tarjeta1 = document.querySelector( `.carta${ id }` );
        tarjeta1.innerText = tarjetas[ id ];
        tarjeta1.disabled = true;
        //contador regresivo, 
        regresivaInicio.innerText = '';
    } else if( destapadas == 2){
            tarjeta2 = document.querySelector( `.carta${ id }` );
            tarjeta2.innerText = tarjetas[ id ];
            tarjeta2.disabled = true;
            movimientos++
            marcador[2].innerText = movimientos;
            //comparación
            if( tarjeta1.innerText  != tarjeta2.innerText){
                setTimeout(() => { 
                    tarjeta1.innerText = '';
                    tarjeta2.innerText = '';
                    destapadas = 0;
                    tarjeta1.disabled = false;
                    tarjeta2.disabled = false;
                }, 800);
            } else {
                console.warn( 'iguales' );
                aciertos++;
                marcador[1].innerText = aciertos;
                destapadas = 0;
            };
        
    };  
};
