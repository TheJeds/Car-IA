const carroCanvas=document.getElementById("carroCanvas");
carroCanvas.width=200;

const carroCtx = carroCanvas.getContext("2d");
const calle = new Calle(carroCanvas.width/2,carroCanvas.width*0.9);
const carro=new Carro(calle.getCarrilCentro(1),100,30,50,"IA");
const trafico = [
    new Carro(calle.getCarrilCentro(1),-100,30,50,"DUMMY",2)
];

animacion();

function animacion(){

    for(let i = 0; i < trafico.length; i++){
        trafico[i].actualizar(calle.bordes,[]);
    }

    carro.actualizar(calle.bordes,trafico);
    
    carroCanvas.height=window.innerHeight;

    carroCtx.save();
    carroCtx.translate(0,-carro.y+carroCanvas.height*0.7);

    calle.dibujar(carroCtx);
    for(let i=0; i<trafico.length;i++){
        trafico[i].dibujar(carroCtx, "red");
    }
    carro.dibujar(carroCtx, "black");
    
    carroCtx.restore();
    requestAnimationFrame(animacion);
}