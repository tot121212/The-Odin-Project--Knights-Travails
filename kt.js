class Square{
    constructor(coords){
        this.coords = coords;
        this.adjacencies = new Map();
    }
}

export class KnightsTravails{
    constructor(size){
        this.boardSize = size;
        this.board = [];
        this.newBoard(this.boardSize);
    }
    printBoard(){
        console.log("\nBoard:");
        console.table(this.board);
        console.log("\n");
    }

    newBoard(size){
        
        for (let i = 0; i < this.boardSize; i++){
            let row = [];
            for (let j = 0; j < this.boardSize; j++){
                row.push(new Square([i, j]));
            }
            this.board.push(row);
        }
        this.initAdjacencies();
        this.printBoard();
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
                if (!(square instanceof Square)) { // first check if square is Square object
                    console.log(square, "is not instanceof Square");
                    continue;
                };
                for (let [dx, dy] of possibleMoves){
                    const pSx = i+dx; // get possible x pos
                    const pSy = j+dy; // get possible y pos
                    if (!(pSx >= 0 && pSx <= this.board.length-1 && pSy >= 0 && pSx <= this.board[pSx].length-1)) continue; // if possible position is not within bounds, continue
                    const possibleSquare = this.board[pSx][pSy]; // get possible pos
                    if (!(possibleSquare instanceof Square)) continue; // if possible pos value isnt a square, continue;
                    if (possibleSquare.adjacencies.get(square)) continue; // if possibleSquare already adjacent to the square, it will already be in square as well, so just continue
                    square.adjacencies.set(possibleSquare, [pSx, pSy]); // set possibleSquare key to possibleSquare coords
                    possibleSquare.adjacencies.set(square, [i, j]); // set square key to square coords
                    console.log("Square", square.adjacencies.get(possibleSquare), "is adjacent to Square", possibleSquare.adjacencies.get(square), "for Knight");
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
        const [ePx, ePy] = endPos;
        const startSquare = this.board[sPx][sPy];
        console.log("startSquare:",startSquare);
        const endSquare = this.board[ePx][ePy];
        console.log("endSquare:",endSquare);

        // queue for storing the current paths
        const paths = [[startSquare]]; // no delimiter needed
        const visitedSquares = new Set();
        while (paths) { // iterate while there are less than 100 paths in queue
            const curPath = paths.shift(); // get a path from queue
            if (!curPath) break; // if path doesnt exists, we are at end of queue, break
            if (!curPath.length) return new Error("curPath was empty");
            const filteredForRepeatAdjacencies = curPath[curPath.length-1].adjacencies.keys().filter( // get last element of path, get its adjacencies as keys, filter out any repeat squares
                (ele, idx)=>{
                    return !visitedSquares.has(ele) ? true : false;
                }
            );
            for (const square of filteredForRepeatAdjacencies){ // iterate filtered squares and add new paths for each
                const newPath = curPath.slice(); // make new path with slice of cur path
                newPath.push(square); // then push the square to it
                if (square === endSquare) {
                    console.log("Amt of paths it took to find newPath:", paths.length);
                    return newPath.map((square)=>{return square.coords});
                } // if the square is the square we are looking for, return the new path we just made
                paths.push(newPath); // else we add to the end of the queue and start the next iteration
            }
        }
    }
}