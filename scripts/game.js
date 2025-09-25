export class Game {

    constructor(props){
        this.elapsedTime = null;
        this.beginTime = null;
        this.moves = 0;
        this.tableSize = props.tableSize;
    }

    start(){    
        this.beginTime = Date.now();
    }

    finish(){
        let endTime = Date.now();
        this.elapsedTime = endTime - this.beginTime;
    }

    addMove(){
        this.moves += 1;
    }
}