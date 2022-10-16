import React from "react";
import './Board.scss'
import Node from '../Node/Node'

interface BoardProps {
    graph: any;
}

function Board({ graph }: BoardProps) {
    console.log(graph)

    const displayNodes = () => {
        const width = 500;
        const height = 500;
        const nodesEl = Object.keys(graph).map((node: any) => {
            const nodeData = {
                id: node,
                x: Math.floor(Math.random() * 1000) % (width * 0.9),
                y: Math.floor(Math.random() * 1000) % (height * 0.9),
                value: 1

            }
            console.log(nodeData)
            return <Node data={nodeData}></Node>

        })
        return nodesEl;
    }

    return (
        <div id='board'>
            board
            {displayNodes()}
        </div>
    )
}

export default Board;