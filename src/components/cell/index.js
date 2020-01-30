import React from 'react'
import Piece from '../piece'
import './styles.css'

function Cell(props) {
    return (
        <div onClick={props.selectCell} className={`cell ${props.color} ${props.isHighlight? 'hightlight': ''}`}>
            <Piece piece={props.piece}></Piece>
        </div>
    );
}

export default Cell