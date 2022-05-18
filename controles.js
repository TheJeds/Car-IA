class Controles{
    constructor(tipo){
        this.acelerar=false;
        this.izquierda=false;
        this.derecha=false;
        this.reversa=false;

        switch(tipo){
            case "KEYS":
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.acelerar=true;
                break;
        }
    }

    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.izquierda=true;
                    break;
                case "ArrowRight":
                    this.derecha=true;
                    break;
                case "ArrowUp":
                    this.acelerar=true;
                    break;
                case "ArrowDown":
                    this.reversa=true;
                    break;
            }
            console.table(this);
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.izquierda=false;
                    break;
                case "ArrowRight":
                    this.derecha=false;
                    break;
                case "ArrowUp":
                    this.acelerar=false;
                    break;
                case "ArrowDown":
                    this.reversa=false;
                    break;
            }
            console.table(this);
        }
    }
}