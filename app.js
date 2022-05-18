const canvas=document.getElementById("miCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const calle = new Calle(canvas.width/2,canvas.width*0.9);
const carro=new Carro(calle.getCarrilCentro(1),100,30,50,"KEYS");
const trafico = [
    new Carro(calle.getCarrilCentro(1),-100,30,50,"DUMMY",2)
];

animacion();

function animacion(){

    for(let i = 0; i < trafico.length; i++){
        trafico[i].actualizar(calle.bordes,[]);
    }

    carro.actualizar(calle.bordes,trafico);
    
    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0,-carro.y+canvas.height*0.7);

    calle.dibujar(ctx);
    for(let i=0; i<trafico.length;i++){
        trafico[i].dibujar(ctx, "red");
    }
    carro.dibujar(ctx, "black");
    
    ctx.restore();
    requestAnimationFrame(animacion);
}