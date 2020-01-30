import React from 'react'
import './styles.css'

export default function Piece(props) {
    return (
        <div className={`piece ${props.piece}`}></div>
    );
}