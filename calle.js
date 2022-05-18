class Calle{

    constructor(x,ancho,contCarriles=3){
        this.x = x;
        this.ancho = ancho;
        this.contCarriles = contCarriles;

        this.izquierda = x-ancho/2;
        this.derecha = x+ancho/2;

        const infinito = 1000000;
        this.superior =-infinito;
        this.inferior = infinito;

        const supIzquierda = {x:this.izquierda, y:this.superior};
        const supDerecha = {x:this.derecha, y:this.superior};
        const infIzquierda = {x:this.izquierda, y:this.inferior};
        const infDerecha = {x:this.derecha, y:this.inferior};
        this.bordes = [
            [supIzquierda, infIzquierda],
            [supDerecha, infDerecha]
        ];
    }

    getCarrilCentro(carrilIndex){
        const anchoCarril = this.ancho/this.contCarriles;
        return this.izquierda+anchoCarril/2+
            Math.min(carrilIndex, this.contCarriles-1)*anchoCarril;
    }

    dibujar(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i = 1; i <= this.contCarriles-1; i++){
            const x = interLin(
                this.izquierda,
                this.derecha,
                i/this.contCarriles
            );
            
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.superior);
            ctx.lineTo(x,this.inferior);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.bordes.forEach(borde=>{
            ctx.beginPath();
            ctx.moveTo(borde[0].x,borde[0].y);
            ctx.lineTo(borde[1].x,borde[1].y);
            ctx.stroke();
        });
    }
}