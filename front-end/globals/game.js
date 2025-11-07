export class Game {

    constructor(props){
        this.username = props.username;
        this.name = props.name
        this.password = props.password;
        this.elapsedTime = null;
        this.beginTime = null;
        this.moves = 0;
        this.tableSize = props.tableSize;
        this.modality = "classica";
        this.phoneNumber = props.phoneNumber;
        this.email = props.email;
        this.suggestedTime = "2-3 minutos";
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