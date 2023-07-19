import React, {useEffect, useState} from 'react';
import './App.css';
import {Project} from "./models/Project";

function App() {
    const [projects, setProjects] = useState<null | Project[]>(null);
    const [selectedProject, setSelectedProject] = useState<null | string>(null);
    const [submissionDescription, setSubmissionDescription] = useState<string>("");
    
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const populateProjects = async () => {
        const response = await fetch('Projects');
        if (response.ok) {
            const data = await response.json();
            setProjects(data.value);
        }
    }
    const populateSubmissionData = async () => {
        const response = await fetch('BugSubmissions');
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else console.log(response.statusText);
    }
    const refreshData = async () => {
        await Promise.all([
            populateProjects(),
            populateSubmissionData()
        ]);
        
        setProjectDescription("");
        setProjectTitle("");
        setSubmissionDescription("");
    }
    
    useEffect(() => {
        populateProjects();
        populateSubmissionData();
    }, []);

    useEffect(() => {
        if (!projects || !projects[0]) {
            setSelectedProject(null);
            return;
        }
        setSelectedProject(projects[0].id);
    }, [projects]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`BugSubmissions`, {
            method: "POST",
            body: JSON.stringify({
                projectId: selectedProject,
                description: submissionDescription
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
        await refreshData();
    }

    const handleProjectSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`Projects`, {
            method: "POST",
            body: JSON.stringify({
                id: selectedProject,
                title: projectTitle,
                description: projectDescription
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
        await refreshData();
    }

    const projectOptions = projects
        ? projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)
        : null;

    return (
        <div className="App">
            <form onSubmit={(e) => handleSubmit}>
                {
                    projectOptions
                        ? <select>
                            {projectOptions}
                        </select>
                        : <></>
                }
                <label>
                    What happened and what were you doing? Please be as specific as possible.
                    <textarea
                        value={submissionDescription}
                        onChange={(e) => setSubmissionDescription(e.target.value)}
                    />
                </label>
                <button onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            <form onSubmit={e => handleProjectSubmit}>
                <label>
                    Project Title
                    <input type="text" value={projectTitle} onChange={e => setProjectTitle(e.target.value)}/>
                </label>
                <label>
                    Project Description
                    <textarea value={projectDescription} onChange={e => setProjectDescription(e.target.value)}/>
                </label>
                <button onClick={handleProjectSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default App;
