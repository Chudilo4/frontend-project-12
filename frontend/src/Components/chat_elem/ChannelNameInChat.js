import React from "react";


export const ChannelName = (props) => {
    return (
        <div className={'bg-light mb-4 p-3 shadow-sm small'}>
            <p className="m-0">
                <b># {props.currentNameChannel}</b>
            </p>
        </div>
    )
}