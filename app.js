const canvas=document.getElementById("miCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const calle = new Calle(canvas.width/2,canvas.width*0.9);
const carro=new Carro(calle.getCarrilCentro(1),100,30,50);

animacion();

function animacion(){
    carro.actualizar();
    
    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0,-carro.y+canvas.height*0.7);

    calle.dibujar(ctx);
    carro.dibujar(ctx);
    
    ctx.restore();
    requestAnimationFrame(animacion);
}