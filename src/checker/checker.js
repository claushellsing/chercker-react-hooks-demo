class Checkers {
    constructor() {
        this.board = [];

        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = " ";
            }
        }
    }
    
    printBoard()
    {
        const {board} = this;
        let logResult = "";
        for (let i=1 ; i<9 ; ++i)
        {
            logResult = logResult + "   " + i;
        }
        logResult = logResult + "\n  ";
        for (let i=0 ; i<8 ; ++i) 
            logResult = logResult + "+---" ;
        logResult = logResult + "+\n";
        for (let i=0 ; i<8 ; ++i) {
            logResult = logResult + (i+1) + " " ;
            for (let j=0 ; j<8 ; ++j){
                logResult = logResult + "| " + board[i][j] + " " ;
            }
            logResult = logResult + "|\n  " ;
            for (let i2=0 ; i2<8 ; ++i2) 
                logResult = logResult + "+---";
            logResult = logResult + "+\n";
        }

        return board;
    }
    
    
    * game()
    {
        const { board } = this; 
        for (let i=0 ; i<8 ; ++i) 
            for (let j=0 ; j<8 ; ++j) 
                board[i][j] = ' ' ;

        for (let i=0 ; i<3 ; ++i) {
            if (i%2===0) {
                for (let j=1 ; j<8 ; j+=2) 
                    board[i][j] = 'a' ;
            }
            else {
                for (let j=0 ; j<8 ; j+=2) 
                    board[i][j] = 'a' ;
            }
        }

        for (let i=7 ; i>4 ; --i) {
            if (i%2===0)
            {
                for (let j=1 ; j<8 ; j+=2) 
                    board[i][j] = 'b' ;
            }
            else
            {
                for (let j=0 ; j<8 ; j+=2) 
                    board[i][j] = 'b' ;
            }
        }


        let game = { 
            board: this.printBoard(),
            msg: "",
        };

        let user = 0 ;

        while (true)
        { // This loop ends when the game has been finished
            if (user===0) user=1 ; // Chages the player
            else user=0 ; 
            let sw=0, once=1 , row1=0 , col1=0 ;  // ONCE=0 -> User should move on force | ONCE=1 -> user should insert columns
            while (sw===0) // This loop ends when the player entered valid numbers
            {
                let cellsMustGo = []; 
                let sw=1 ;  
                for (let i=0 ; i<8 ; ++i)
                {
                    for (let j=0 ; j<8 ; ++j)
                    {
                        if (once===0)
                        {
                            i = row1 ; 
                            j = col1 ; 
                        }
                        
                        let now = new Cell(i, j);

                        if (user===0 && board[i][j] === 'a')
                        {
                            if (i<6 && j>1 && (board[i+1][j-1]==='b' || board[i+1][j-1]==='B') && board[i+2][j-2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i+2 , j-2)) ) ;
                                sw=0 ; 
                            }
                            if (i<6 && j<6 && (board[i+1][j+1]==='b' || board[i+1][j+1]==='B') && board[i+2][j+2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i+2 , j+2))) ;
                                sw=0 ; 
                            }
                        }
                        else if (user===1 && board[i][j] === 'b')
                        {
                            if (i>1 && j>1 && (board[i-1][j-1]==='a' || board[i-1][j-1]==='A') && board[i-2][j-2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i-2 , j-2))) ;
                                sw=0 ; 
                            }
                            if (i>1 && j<6 && (board[i-1][j+1]==='a' || board[i-1][j+1]==='A') && board[i-2][j+2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i-2 , j+2))) ;
                                sw=0 ; 
                            }
                        }
                        else if (user===0 && board[i][j] === 'A') // when user 1 wants to move its king
                        {
                            if (i>1 && j>1 && (board[i-1][j-1]==='b' || board[i-1][j-1]==='B') && board[i-2][j-2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i-2 , j-2))) ;
                                sw=0 ; 
                            }
                            if (i>1 && j<6 && (board[i-1][j+1]==='b' || board[i-1][j+1]==='B') && board[i-2][j+2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i-2 , j+2))) ;
                                sw=0 ; 
                            }
                            if (i<6 && j>1 && (board[i+1][j-1]==='b' || board[i+1][j-1]==='B') && board[i+2][j-2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i+2 , j-2))) ;
                                sw=0 ; 
                            }
                            if (i<6 && j<6 && (board[i+1][j+1]==='b' || board[i+1][j+1]==='B') && board[i+2][j+2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i+2 , j+2))) ;
                                sw=0 ; 
                            }
                        }
                        else if (user===1 && board[i][j] === 'B') // when user B wants to move its king
                        {
                            if (i>1 && j>1 && (board[i-1][j-1]==='a' || board[i-1][j-1]==='A') && board[i-2][j-2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i-2 , j-2))) ;
                                sw=0 ; 
                            }
                            if (i>1 && j<6 && (board[i-1][j+1]==='a' || board[i-1][j+1]==='A') && board[i-2][j+2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i-2 , j+2))) ;
                                sw=0 ; 
                            }
                            if (i<6 && j>1 && (board[i+1][j-1]==='a' || board[i+1][j-1]==='A') && board[i+2][j-2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i+2 , j-2))) ;
                                sw=0 ; 
                            }
                            if (i<6 && j<6 && (board[i+1][j+1]==='a' || board[i+1][j+1]==='A') && board[i+2][j+2]===' ')
                            {
                                cellsMustGo.push(new Path(now, new Cell(i+2 , j+2))) ;
                                sw=0 ; 
                            }
                        }
                        if (once===0) break ; 
                    } // end j loop
                    if (once===0) break ;
                } // end i loop 
                
                
                if (sw===1) 
                {
                	break ; 
                }
                else
                {
                    let msg = "user " + (user+1) + " please choose one of the cell(s) that show below for next move : \n";
                    let it=1 ;
                    let allowed = [];
                    cellsMustGo.forEach((p) => {
                        msg = msg  + it + ". " + (p.getStart().getRow()+1) + "|" + (p.getStart().getCol()+1) + " to " + (p.getEnd().getRow()+1) + "|" + (p.getEnd().getCol()+1);
                        allowed.push([
                            [p.getStart().getRow(),p.getStart().getCol()],
                            [p.getEnd().getRow(),p.getEnd().getCol()]
                        ]);
                        it++ ; 
                    });

                    let game = { 
                        board: this.printBoard(),
                        phase: 'force',
                        player: user+1,
                        allowed: allowed,
                        msg: msg,
                    };

                    let tmp = parseInt(yield game); 
                    row1 = cellsMustGo[tmp].getEnd().getRow() ; 
                    col1 = cellsMustGo[tmp].getEnd().getCol() ; 
                    board[row1][col1] = board[cellsMustGo[tmp].getStart().getRow()][cellsMustGo[tmp].getStart().getCol()];  
                    board[cellsMustGo[tmp].getStart().getRow()][cellsMustGo[tmp].getStart().getCol()] = ' ' ;
                    let newRow = (cellsMustGo[tmp].getStart().getRow() + row1) / 2; 
                    let newCol = (cellsMustGo[tmp].getStart().getCol() + col1) / 2;
                    if (user===0 && row1===7 && board[row1][col1]==='a') board[row1][col1] = 'A' ; // user 1 became king
                    if (user===1 && row1===0 && board[row1][col1]==='b') board[row1][col1] = 'B' ; // user 2 became king
                    board[newRow][newCol] = ' ' ;
                    once=0 ;
                }
            } // end while1 loop

            
            if (once===1)
            {
                game = { 
                    board: this.printBoard(),
                    phase: 'move',
                    player: user+1,
                    allowed: [],
                    msg: "",
                };
        
                do
                {
                    game.msg = game.msg + "user " + (user+1) + " please enter row,column of start cell: \n" ;       // read numbers from input
                    let [startRow, startCol] = yield game;

                    game.msg = game.msg + "user " + (user+1) + " please enter row,column of end cell: \n";      //
                    let [endRow, endCol] = yield game;
                    
                    if (startRow>-1 && startRow<8 && startCol>-1 && startCol<8 && endRow>-1 && endRow<8 && endCol>-1 && endCol<8 && board[endRow][endCol]===' ' ) {
                        if (user===0 && board[startRow][startCol] === 'a') // User 1 moves its bead
                        {
                            if ( endRow===startRow+1 && (endCol===startCol-1 || endCol===startCol+1) )
                            {
                                board[endRow][endCol] = 'a' ; 
                                board[startRow][startCol] = ' ' ;
                                if (user===0 && endRow===7 && board[endRow][endCol]==='a') board[endRow][endCol] = 'A' ; // the bead changes into king
                                break ; 
                            }
                        }
                        else if (user===1 && board[startRow][startCol] === 'b') // User 2 moves its bead
                        {
                            if ( endRow===startRow-1 && (endCol===startCol-1 || endCol===startCol+1) )
                            {
                                board[endRow][endCol] = 'b' ; 
                                board[startRow][startCol] = ' ' ;
                                if (user===1 && endRow===0 && board[endRow][endCol]==='b') board[endRow][endCol] = 'B' ; // the bead changes into king
                                break ; 
                            }
                        }
                        else if (user===0 && board[startRow][startCol] === 'A') // user 1 moves its King
                        {
                            if ( (endRow===startRow-1 || endRow===startRow+1) && (endCol===startCol-1 || endCol===startCol+1) )
                            {
                                board[endRow][endCol] = 'A' ; 
                                board[startRow][startCol] = ' ' ;
                                break ; 
                            }
                        }
                        else if (user===1 && board[startRow][startCol] === 'B') // user 2 moves its King
                        {
                            if ( (endRow===startRow-1 || endRow===startRow+1) && (endCol===startCol-1 || endCol===startCol+1) )
                            {
                                board[endRow][endCol] = 'B' ; 
                                board[startRow][startCol] = ' ' ;
                                break ; 
                            }
                        }
                    }
                     game = { 
                        board: this.printBoard(),
                        phase: 'move',
                        player: user+1,
                        allowed: [],
                        msg: "Please enter a valid path !\n",
                    };

                   //parseInt(yield game);  
                } while(true) ; 
            }
            
            let cntA=0, cntB=0 ; 
            for (let i=0 ; i<8 ; ++i) { // counts number of beads (A for user1 B for User B)
                for (let j=0 ; j<8 ; ++j) {
                    if (board[i][j] === 'a' || board[i][j] === 'A') cntA++ ; 
                    if (board[i][j] === 'b' || board[i][j] === 'B') cntB++ ; 
                }
            }
            if (cntA===0) {
                game = { 
                    board: this.printBoard(),
                    msg: "user 2 win!",
                };
        
                yield game;
                break ; 
            }
            if (cntB===0) {
                game = { 
                    board: this.printBoard(),
                    msg: "user 1 win!",
                };
        
                yield game;
                break ; 
            }
            
        } // end of the game!
    }
    
}


class Cell {
    constructor(r, c) {
        this.row = r;
        this.col = c;
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    setRow(row) {
        this.row = row;
    }

    setCol(col) {
        this.col = col;
    }
    
}


class Path {    
    constructor (s,e) {
        this.start = s ;
        this.end = e ; 
    }

    getStart(){
        return this.start;
    }

    getEnd(){
        return this.end;
    }

    setStart(start) {
        this.start = start;
    }

    setEnd(end) {
        this.end = end;
    }
}


export default Checkers;