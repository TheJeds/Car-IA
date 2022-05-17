const canvas=document.getElementById("miCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const carro=new Carro(100,100,30,50);

animacion();

function animacion(){
    carro.actualizar();
    
    canvas.height=window.innerHeight;
    carro.dibujar(ctx);
    requestAnimationFrame(animacion);
}