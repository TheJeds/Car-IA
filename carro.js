class Carro{
    constructor(x,y,ancho,alto){
        this.x=x;
        this.y=y;
        this.ancho=ancho;
        this.alto=alto;

        this.velocidad=0;
        this.aceleracion=0.2;
        this.maxVelocidad=3;
        this.friccion=0.05;
        this.angulo=0;

        this.controles=new Controles();
    }

    actualizar(){
        this.#move();
    }

    #move(){
        if(this.controles.acelerar){
            this.velocidad+=this.aceleracion;
        }
        if(this.controles.reversa){
            this.velocidad-=this.aceleracion;
        }

        if(this.velocidad>this.maxVelocidad){
            this.velocidad=this.maxVelocidad;
        }
        if(this.velocidad<-this.maxVelocidad/2){
            this.velocidad=-this.maxVelocidad/2;
        }

        if(this.velocidad>0){
            this.velocidad-=this.friccion;
        }
        if(this.velocidad<0){
            this.velocidad+=this.friccion;
        }
        if(Math.abs(this.velocidad)<this.friccion){
            this.velocidad=0;
        }

        if(this.velocidad!=0){
            const flip=this.velocidad>0?1:-1;
            if(this.controles.izquierda){
                this.angulo+=0.03*flip;
            }
            if(this.controles.derecha){
                this.angulo-=0.03*flip;
            }
        }

        this.x-=Math.sin(this.angulo)*this.velocidad;
        this.y-=Math.cos(this.angulo)*this.velocidad;
    }

    dibujar(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angulo);

        ctx.beginPath();
        ctx.rect(
            -this.ancho/2,
            -this.alto/2,
            this.ancho,
            this.alto
        );
        ctx.fill();

        ctx.restore();
    }
}