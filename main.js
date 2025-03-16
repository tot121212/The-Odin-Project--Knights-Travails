import {KnightsTravails} from "./kt.js";

const Game = new KnightsTravails(8);

const printInput = (inp)=>{
    console.log(`\nIdeal Path to ${inp[1]} from ${inp[0]}:`,Game.knightMoves(inp[0], inp[1]));
}

let inp = [[0,0],[3,3]];
printInput(inp);
inp = [[3,3],[0,0]];
printInput(inp);
inp = [[0,0],[7,7]];
printInput(inp);