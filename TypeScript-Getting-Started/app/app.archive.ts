//https://github.com/bricewilson/TypeScript-Getting-Started
/// <reference path="player.ts" />
function startGame(){
    
    let playerName : string | undefined = getInputValue('playername');
    logPlayer(playerName);
    postScore(100, playerName);
    postScore(-5, playerName);
    //let messageElement = document.getElementById('messages');
    //messageElement!.innerText = 'Welcome to MultiMath! Starting new game...';
}

//Default Parameter ensures undefined can be passed
function logPlayer(name : string = 'MultiMath Player') : void {
    console.log(`New game starting for player ${name}`);
}


//Optional Parameter ensures undefined can be passed
function postScore(score: number, playerName?: string) : void {
    
    let logger : (value: string) => void; //logger has a type annotation that represents a method that takes a input string param and returns void

    if(score < 0){
        logger = logError;
    }
    else{
        logger = logMessage;
    }
    

    const scoreElement: HTMLElement | null = document.getElementById('postedScores');
    scoreElement!.innerText = `${score} - ${playerName}`;

    logger(`${score}`);
}

document.getElementById('startGame')!.addEventListener('click', startGame);

const logMessage = (message: string) => console.log(message);

function logError(err: string) : void {
    console.error(err);
}

// let myResult : Result = {
//     playerName: 'Marie',
//     score: 5,
//     problemCount: 5,
//     factor: 7
// };

// let player: Person = {
//     name: 'Daniel',
//     formatName: () => 'Dan' 
// };

const firstPlayer: Player = new Player();
firstPlayer.name = 'Lanier';
console.log(firstPlayer.formatName());