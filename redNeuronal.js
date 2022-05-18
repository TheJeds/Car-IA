class RedNeuronal{
    constructor(contNeurona){
        this.niveles=[];
        for(let i=0;i<contNeurona.length-1;i++){
            this.niveles.push(new Nivel(
                contNeurona[i],contNeurona[i+1]
            ));
        }
    }

    static feedForward(entradasDadas,red){
        let salidas=Nivel.feedForward(
            entradasDadas,red.niveles[0]);
        for(let i=1;i<red.niveles.length;i++){
            salidas=Nivel.feedForward(
                salidas,red.niveles[i]);
        }
        return salidas;
    }

    static mutar(red,cantidad=1){
        red.niveles.forEach(nivel => {
            for(let i=0;i<nivel.biases.length;i++){
                nivel.biases[i]=interLin(
                    nivel.biases[i],
                    Math.random()*2-1,
                    cantidad
                )
            }
            for(let i=0;i<nivel.weights.length;i++){
                for(let j=0;j<nivel.weights[i].length;j++){
                    nivel.weights[i][j]=interLin(
                        nivel.weights[i][j],
                        Math.random()*2-1,
                        cantidad
                    )
                }
            }
        });
    }
}

class Nivel{
    constructor(contEntrada,contSalida){
        this.entradas=new Array(contEntrada);
        this.salidas=new Array(contSalida);
        this.biases=new Array(contSalida);

        this.weights=[];
        for(let i=0;i<contEntrada;i++){
            this.weights[i]=new Array(contSalida);
        }

        Nivel.#randomize(this);
    }

    static #randomize(nivel){
        for(let i=0;i<nivel.entradas.length;i++){
            for(let j=0;j<nivel.salidas.length;j++){
                nivel.weights[i][j]=Math.random()*2-1;
            }
        }

        for(let i=0;i<nivel.biases.length;i++){
            nivel.biases[i]=Math.random()*2-1;
        }
    }

    static feedForward(entradasDadas,nivel){
        for(let i=0;i<nivel.entradas.length;i++){
            nivel.entradas[i]=entradasDadas[i];
        }

        for(let i=0;i<nivel.salidas.length;i++){
            let sum=0
            for(let j=0;j<nivel.entradas.length;j++){
                sum+=nivel.entradas[j]*nivel.weights[j][i];
            }

            if(sum>nivel.biases[i]){
                nivel.salidas[i]=1;
            }else{
                nivel.salidas[i]=0;
            } 
        }

        return nivel.salidas;
    }
}