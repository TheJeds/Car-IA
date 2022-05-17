class Controles{
    constructor(){
        this.acelerar=false;
        this.izquierda=false;
        this.derecha=false;
        this.reversa=false;

        this.#addKeyboardListeners();
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
        }
    }
}