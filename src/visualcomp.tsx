import React from 'react';

function visuals() {
    return(
        <div>
            <img src="../public/chartimage.jpg" style={{float:'left', width:'100px', height: '100px'}} alt="Velocity v. Time Graph"/>
            <img src="../public/chartimage2.jpeg" style={{float:'left', width:'100px', height: '100px'}} alt="Power v. Time Graph"/>
            <h2>run1.mcap</h2>
            <h6>
                <b>Date:</b>__________<br/>
                <b>Time:</b>__________<br/>
                <b>Location:</b>__________<br/>
                <b>Sensors:</b>__________<br/>
            </h6>
        </div>
    );
}

export default visuals;