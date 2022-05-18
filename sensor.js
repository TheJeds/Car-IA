class Sensor{

    constructor(carro){
        this.carro = carro;
        this.contRayo = 5;
        this.largoRayo = 150;
        this.propagacionRayo = Math.PI/2;

        this.rayos = [];
        this.lecturas = [];
    }

    actualizar(calleBordes,trafico){
        this.#castRayos();
        this.lecturas = [];
        for (let i = 0; i < this.rayos.length; i++) {
            this.lecturas.push(
                this.#getLecturas(
                    this.rayos[i],
                    calleBordes,
                    trafico
                )
            );
        }
    }

    #getLecturas(rayo,calleBordes,trafico){
        let toques=[];

        for(let i = 0; i < calleBordes.length; i++){
            const toque = getInterseccion(
                rayo[0],
                rayo[1],
                calleBordes[i][0],
                calleBordes[i][1]
            );
            if(toque){
                toques.push(toque);
            }
        }

        for(let i=0; i < trafico.length; i++){
            const poly = trafico[i].polygono;
            for(let j=0; j<poly.length; j++){
                const valor = getInterseccion(
                    rayo[0],
                    rayo[1],
                    poly[j],
                    poly[(j+1)%poly.length]
                );
                if(valor){
                    toques.push(valor);
                }
            }
        }
        
        if(toques.length==0){
            return null;
        }else{
            const offsets = toques.map(e=>e.offset);
            const minOffset = Math.min(...offsets);
            return toques.find(e=>e.offset==minOffset);
        }
    }

    #castRayos(){
        this.rayos=[];

        for(let i = 0; i < this.contRayo; i++){
            const anguloRayo = interLin(
                this.propagacionRayo/2,
                -this.propagacionRayo/2,
                this.contRayo==1?0.5:i/(this.contRayo-1)
            )+this.carro.angulo;

            const inicio = {x:this.carro.x, y:this.carro.y};
            const final = {
                x:this.carro.x-
                    Math.sin(anguloRayo)*this.largoRayo,
                y:this.carro.y-
                    Math.cos(anguloRayo)*this.largoRayo
            };
            this.rayos.push([inicio,final]);
        }
    }

    dibujar(ctx){
        for(let i=0; i<this.contRayo; i++){
            let final = this.rayos[i][1];
            if(this.lecturas[i]){
                final = this.lecturas[i];
            }

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(
                this.rayos[i][0].x,
                this.rayos[i][0].y
            );
            ctx.lineTo(
                final.x,
                final.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rayos[i][1].x,
                this.rayos[i][1].y
            );
            ctx.lineTo(
                final.x,
                final.y
            );
            ctx.stroke();
        }
    }
}