import React from 'react';

function search() {

return(
    <div>
        <h2>Search Filters</h2>
        <form>
            <label htmlFor="name">Name</label><br/>
            <input type="text" id="name" name="Name"></input><br/>

            <label htmlFor="sDate">Start Date</label><br/>
            <input type="text" id="sDate" name="StartDate"></input><br/>

            <label htmlFor="eDate">End Date</label><br/>
            <input type="text" id="eDate" name="EndDate"></input><br/>

            <label htmlFor="loc">Location</label><br/>
            <input type="text" id="loc" name="Location"></input><br/>

            <label htmlFor="conf">Config</label><br/>
            <input type="text" id="conf" name="Config"></input><br/>

            <label htmlFor="ttarget">Test Target</label><br/>
            <input type="text" id="ttarget" name="TestTarget"></input><br/>

            <label htmlFor="sensors">Sensors</label><br/>
            <input type="text" id="sensors" name="Sensors"></input><br/>

            <button type="submit" name="Search">Search</button>
        </form>
    </div>
);

}

export default search;