import React, { useState } from 'react'
import Cell from '../cell'
import './styles.css'

function boardSquares() {
    const board = [];

    for (let i= 0; i < 8; i++) {
        const row = [];
        for (let j = 0; j < 8; j++) {
            row.push((j+i)%2);
        }
        board.push(row);
    }

    return board;
}

const squares = boardSquares();

function isSameCoord([rowA,colA], [rowB, colB]) {
    return rowA === rowB && colA === colB;
}

function Board(props) {
    const [origin, setOrigin] = useState([]);
    const [phase , setPhase] = useState('selectPiece')

    const selectCell = (row,column) => {
        let playerPiece;

        if ((['b','B']).includes(props.board[row][column])) {
            playerPiece = 2;
        } else if ((['a','A']).includes(props.board[row][column])) {
            playerPiece = 1;
        } else {
            playerPiece = 0;
        }

        if (props.playerTurn === playerPiece) {
            if (props.allowed.length > 0) {
                const filter = props.allowed.filter((coord) => {
                    return isSameCoord(coord,[row,column]);
                });

                if (filter.length === 0) return;
            }

            if (phase === 'selectPiece') {
                setOrigin([row,column]);
                setPhase('pieceSelected');
            } else if (phase === 'pieceSelected') {
                setOrigin([row,column]);
                setPhase('pieceSelected');
            } 
        } else if ((props.playerTurn !== playerPiece) && (phase === 'pieceSelected')) {
            props.doMove(origin,[row,column]);
            setPhase('selectPiece');
            setOrigin([]);
        }
    };

    return (
        <div>
            {
                props.board.map((row,r) => {
                    return (
                        <div className="row" key={`row-${r}`}>
                            {
                                row.map((column, c) => {
                                    return <Cell 
                                        key={`col-${c}`}
                                        isHighlight={(r === origin[0] && c === origin[1] && phase === 'pieceSelected')}
                                        color={squares[r][c] === 0? 'r': 'w'} 
                                        piece={props.board[r][c]}
                                        selectCell={() => selectCell(r,c)}
                                        />
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Board