const carroCanvas=document.getElementById("carroCanvas");
carroCanvas.width=200;

const carroCtx = carroCanvas.getContext("2d");
const calle = new Calle(carroCanvas.width/2,carroCanvas.width*0.9);

const N=100;
const carros = generarCarros(N)
let mejorCarro = carros[0];
if(localStorage.getItem("mejorCerebro")){
    for(let i=0;i<carros.length;i++){
        carros[i].cerebro=JSON.parse(
            localStorage.getItem("mejorCerebro"));
        if(i!=0){
            RedNeuronal.mutar(carros[i].cerebro,0.1);
        }
    }
}

const trafico = [
    new Carro(calle.getCarrilCentro(1),-100,30,50,"DUMMY",2)
];

animacion();

function guardar(){
    localStorage.setItem("mejorCerebro",
        JSON.stringify(mejorCarro.cerebro));
}

function descartar(){
    localStorage.removeItem("mejorCerebro");
}

function generarCarros(N){
    const carros=[];
    for(let i=1;i<=N;i++){
        carros.push(new Carro(calle.getCarrilCentro(1),100,30,50,"IA"));
    }
    return carros;
}

function animacion(){

    for(let i = 0; i < trafico.length; i++){
        trafico[i].actualizar(calle.bordes,[]);
    }
    for(let i=0;i<carros.length;i++){
        carros[i].actualizar(calle.bordes,trafico);
    }

    mejorCarro=carros.find(
        c=>c.y==Math.min(
            ...carros.map(c=>c.y)
        ));
    
    carroCanvas.height=window.innerHeight;

    carroCtx.save();
    carroCtx.translate(0,-mejorCarro.y+carroCanvas.height*0.7);

    calle.dibujar(carroCtx);
    for(let i=0; i<trafico.length;i++){
        trafico[i].dibujar(carroCtx, "red");
    }
    carroCtx.globalAlpha=0.2;
    for(let i=0;i<carros.length;i++){
        carros[i].dibujar(carroCtx, "black");
    }
    carroCtx.globalAlpha=1;
    mejorCarro.dibujar(carroCtx,"blue",true);
    
    carroCtx.restore();
    requestAnimationFrame(animacion);
}