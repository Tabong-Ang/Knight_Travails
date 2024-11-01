class Knight {
    constructor() {
        // Define all possible moves for a knight
        this.moves = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
    }

    isWithinBoard(x, y) {
        // Check if the position is within an 8x8 chessboard
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }

    possibleMoves(position) {
        // Generate all valid moves from a given position
        const [x, y] = position;
        return this.moves
            .map(([dx, dy]) => [x + dx, y + dy])
            .filter(([nx, ny]) => this.isWithinBoard(nx, ny));
    }
}

class ChessBoard {
    constructor() {
        this.knight = new Knight();
    }

    findShortestPath(start, end) {
        // If start and end are the same, return start position only
        if (start[0] === end[0] && start[1] === end[1]) return [start];

        // Use a queue to perform BFS; each item in the queue is [current position, path to reach it]
        const queue = [[start, [start]]];
        const visited = new Set();
        visited.add(start.toString());

        while (queue.length > 0) {
            const [currentPos, path] = queue.shift();

            // Generate all possible moves from current position
            for (const nextPos of this.knight.possibleMoves(currentPos)) {
                const [nx, ny] = nextPos;

                // If the destination is reached, return the path including the destination
                if (nx === end[0] && ny === end[1]) {
                    return [...path, nextPos];
                }

                // If the position hasn't been visited, add it to the queue
                if (!visited.has(nextPos.toString())) {
                    visited.add(nextPos.toString());
                    queue.push([nextPos, [...path, nextPos]]);
                }
            }
        }

        // If no path found, return an empty array
        return [];
    }
}


const board = new ChessBoard();
console.log(board.findShortestPath([0, 0], [1, 2])); 
console.log(board.findShortestPath([0, 0], [3, 3])); 
console.log(board.findShortestPath([3, 3], [0, 0])); 
