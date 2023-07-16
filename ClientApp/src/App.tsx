import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [submissionDescription, setSubmissionDescription] = useState<string>("");
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const response = await fetch(`BugSubmission`, {
            method: "POST",
            body: JSON.stringify({
                projectId:"fc9c4247-21de-11ee-b6b3-408d5c53bdf2",
                description: submissionDescription
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response);
    }
    
    useEffect(() => {
        const populateSubmissionData  = async ()=> {
            const response = await fetch('BugSubmission/project/fc9c4247-21de-11ee-b6b3-408d5c53bdf2');
            console.log(response);
            if (response.ok){
                const data = await response.json();
                console.log(data);
            } else console.log(response.statusText);
        }
        populateSubmissionData();
    },[]);
    
  return (
    <div className="App">
        <form onSubmit={(e)=>handleSubmit}>
            <label>
                What happened and what were you doing? Please be as specific as possible.
                <textarea
                    value={submissionDescription}
                    onChange={(e)=>setSubmissionDescription(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit}>
                Submit
            </button>
        </form>
    </div>
  );
}

export default App;
