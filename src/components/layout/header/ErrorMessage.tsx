"use client"

import React, { FC } from 'react';


const ErrorMessage: FC = ({ error }) => {
    let packet = {
        packetMessage: "Something went wrong"
    }

    if (typeof error === "string") {
        return { ...packet, packetMessage: error }
    }

    return (
        <div>
            <h3>Error:</h3>
            <p>{packet.packetMessage}</p>
        </div>
    );
};

export default ErrorMessage;