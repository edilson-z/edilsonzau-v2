import React, { useState } from 'react'

export default function Experience() {

    const [expState, setExpState] = useState("Work");

    return (
        <div>
            <button onClick={() => setExpState("Work")}>Work</button>
            <button onClick={() => setExpState("Edu")}>Education</button>


            {expState == "Work" ?
                <div>Work</div> :
                <div>Education</div>
            }
        </div>
    )
}
