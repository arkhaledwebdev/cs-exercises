/* eslint-disable no-restricted-syntax */

const ChessNode = require("./chess-node");

class ChessBoard {
  constructor(size = 8) {
    this.size = size;
    this.board = [];
    this.loadMoves();
  }

  isValidPosition(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  loadMoves() {
    // all possible knight moves
    const knightMoves = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        // create new chess node to store position
        const newChessNode = new ChessNode([i, j]);
        // get all possible knight moves for the chess node position
        for (let index = 0; index < knightMoves.length; index++) {
          const knightMoveX = i + knightMoves[index][0];
          const knightMoveY = j + knightMoves[index][1];
          // if the new knight move is valid add to the moves array of the chess node
          if (this.isValidPosition(knightMoveX, knightMoveY)) {
            newChessNode.moves.push([knightMoveX, knightMoveY]);
          }
        }
        // add the chess node to the board
        this.board.push(newChessNode);
      }
    }
  }

  knightMoves(start, end) {
    // initialize the queue array and visited set
    const queue = [[start]];
    const visited = new Set();
    // as long queue is not empty loop
    while (queue.length > 0) {
      // get the path from queue
      const path = queue.shift();
      // get the current end from path
      const current = path[path.length - 1];
      // check if the current end is the same as end to search
      if (current[0] === end[0] && current[1] === end[1]) {
        return path;
      }
      // loop every possible move in the current end
      for (const move of this.board[current[0] * this.size + current[1]]
        .moves) {
        const next = [move[0], move[1]];

        if (!visited.has(next.toString())) {
          visited.add(next.toString());
          queue.push([...path, next]);
        }
      }
    }
    return null;
  }
}

const chessBoard = new ChessBoard();
console.log(chessBoard.board[63]);
console.log(chessBoard.knightMoves([0, 0], [2, 2]));
