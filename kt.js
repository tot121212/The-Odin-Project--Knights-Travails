class Square{
    constructor(){
        this.adjacencies = new Map();
    }
}

export class KnightsTravails{
    constructor(size){
        this.boardSize = size;
        this.board = [];
        this.newBoard(this.boardSize);
    }
    newBoard(size){
        
        for (let i = 0; i < this.boardSize; i++){
            let row = [];
            for (let j = 0; j < this.boardSize; j++){
                row.push(new Square());
            }
            this.board.push(row);
        }
        this.initAdjacencies();
        console.log("New Board:", this.board);
    }

    
    initAdjacencies(){
        let minIdx = 0;
        let maxIdx = this.boardSize-1;

        // knight can move 2 in one dir and 1 in another
        const possibleMoves = [
            [-2, -1],
            [-2, 1],
            [2, -1],
            [2, 1],
            [-1, -2],
            [-1, 2],
            [1, -2],
            [1, 2],
        ];

        // for each board location, find the possible knight moves, store it in the board[x][y].adjacencies;
        for (let i = minIdx; i < maxIdx; i++){
            for (let j = minIdx; j < maxIdx; j++){
                const square = this.board[i][j];
                if (!(square instanceof Square)) {
                    console.log(square, "is not instanceof Square");
                    continue;
                };
                for (let [dx, dy] of possibleMoves){
                    const pSx = i+dx;
                    const pSy = j+dy;
                    if (!(pSx >= 0 && pSx <= this.board.length-1 && pSy >= 0 && pSx <= this.board[pSx].length-1)) continue;
                    const possibleSquare = this.board[pSx][pSy];
                    if (!(possibleSquare instanceof Square)) continue;
                    if (possibleSquare.adjacencies.square instanceof Array) continue; // if possibleSquare adjacencies already contains the square, it will already be in square as well
                    square.adjacencies.possibleSquare = [pSx][pSy];
                    possibleSquare.adjacencies.square = [i][j];
                    console.log("Square ", i, j, "is adjacent to Square ", pSx, pSy);
                    // AWESOMEEEE
                }
            }
        }
    }

    knightMoves(startPos,endPos){
        if (!Array.isArray(startPos) || !Array.isArray(startPos)) return null; // verify type is array
        if (startPos.length !== 2 || endPos.length !== 2) return null; // verify length is two
        if (startPos.some(num => typeof num !== "number") || endPos.some(num => typeof num !== "number")) return null; // verify each element is a number
        // search from startPos node inside adjacencies, adding to queue until we find the node we want to be at
        const [sPx, sPy] = startPos;
        const [ePx, ePy] = startPos;
        const startSquare = this.board[sPx][sPy];
        const endSquare = this.board[ePx][ePy];

        // queue for storing the current paths
        const paths = [[startSquare]]; // no delimiter needed
        while (paths.length < 100) { // iterate while there are less than 100 paths in queue
            const curPath = paths.shift(); // get a path from queue
            console.log(curPath);
            if (!curPath.length) return new Error("curPath was empty");
            for (const square of Object.keys(curPath[curPath.length-1].adjacencies)){
                const path = curPath.slice(); // make new path with slice of cur path and then push the square to it
                path.push(square);
                if (square === endSquare) return path; // if the square is the square we are looking for, return the new path we just made
                paths.push(path); // else we add to the end of the queue and start the next iteration
            }
            console.log("Paths:",paths);
        }
    }
}