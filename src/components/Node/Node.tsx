import React from "react";

import './Node.scss';

interface NodeData {
    id: string;
    x: number;
    y: number;
    value: number;
}
interface NodeProps {
    data: NodeData;
}

function Node({ data }: NodeProps) {
    console.log(data)
    const styleOBject = {
        div: {
            left: data.x,
            top: data.y
        }
    }


    return (
        <div className="node" style={styleOBject.div}>
            {data.id}
        </div>
    )
}

export default Node;