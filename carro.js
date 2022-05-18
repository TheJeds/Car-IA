class Carro{
    constructor(x,y,ancho,alto,tipoControl,maxVelocidad=5){
        this.x=x;
        this.y=y;
        this.ancho=ancho;
        this.alto=alto;

        this.velocidad=0;
        this.aceleracion=0.2;
        this.maxVelocidad=maxVelocidad;
        this.friccion=0.05;
        this.angulo=0;
        this.choque=false;

        this.useCerebro=tipoControl=="IA";

        if(tipoControl!="DUMMY"){
            this.sensor=new Sensor(this);
            this.cerebro=new RedNeuronal(
                [this.sensor.contRayo,6,4]
            );
        }
        this.controles=new Controles(tipoControl);
    }

    actualizar(calleBordes, trafico){
        if(!this.choque){
            this.#move();
            this.polygono = this.#crearPolygono();
            this.choque = this.#detectarChoque(calleBordes,trafico);
        }
        if(this.sensor){
            this.sensor.actualizar(calleBordes,trafico);
            const offsets=this.sensor.lecturas.map(
                s=>s==null?0:1-s.offset
            );
            const salidas=RedNeuronal.feedForward(offsets,this.cerebro);

            if(this.useCerebro){
                this.controles.acelerar=salidas[0];
                this.controles.izquierda=salidas[1];
                this.controles.derecha=salidas[2];
                this.controles.reversa=salidas[3];
            }
        }
    }

    #detectarChoque(calleBordes,trafico){
        for(let i = 0; i < calleBordes.length; i++){
            if(polysIntersec(this.polygono,calleBordes[i])){
                return true;
            }
        }

        for(let i = 0; i < trafico.length; i++){
            if(polysIntersec(this.polygono,trafico[i].polygono)){
                return true;
            }
        }
        return false;
    }

    #crearPolygono(){
        const puntos = [];
        const rad = Math.hypot(this.ancho, this.alto)/2;
        const alpha = Math.atan2(this.ancho, this.alto);
        puntos.push({
            x:this.x-Math.sin(this.angulo-alpha)*rad,
            y:this.y-Math.cos(this.angulo-alpha)*rad
        });
        puntos.push({
            x:this.x-Math.sin(this.angulo+alpha)*rad,
            y:this.y-Math.cos(this.angulo+alpha)*rad
        });
        puntos.push({
            x:this.x-Math.sin(Math.PI+this.angulo-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angulo-alpha)*rad
        });
        puntos.push({
            x:this.x-Math.sin(Math.PI+this.angulo+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angulo+alpha)*rad
        });

        return puntos;
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

    dibujar(ctx, color, dibujarSensor=false){

        if(this.choque){
            ctx.fillStyle="gray";
        }else{
            ctx.fillStyle=color;
        }

        ctx.beginPath();
        ctx.moveTo(this.polygono[0].x, this.polygono[0].y);
        for(let i = 1; i < this.polygono.length; i++){
            ctx.lineTo(this.polygono[i].x, this.polygono[i].y)
        }
        ctx.fill();

        if(this.sensor && dibujarSensor){
            this.sensor.dibujar(ctx);
        }
    }
}