import {useSubmissions} from "../data/useSubmissions";
import {useEffect, useState} from "react";

const SubmissionHome = () => {
    
    const [selectedProject, setSelectedProject] = useState<string|null>("790f2aa8-21e0-11ee-b6b3-408d5c53bdf2");
    const {getSubmissionsByProject, setCurrentProjectId} = useSubmissions(selectedProject);
    
    
    useEffect(() => {
        setCurrentProjectId(selectedProject);
    },[selectedProject])
    const Submissions = () => {
        return(
            <div>
                {
                    getSubmissionsByProject.data
                        ? getSubmissionsByProject.data.map((submission:any) => <div key={submission.id}>{submission.description}</div>)
                        : <div>{getSubmissionsByProject.error?.message}</div>
                }
            </div>
        )
    }

    return (<div>
        <button onClick={()=> setSelectedProject("2b500025-a452-4f0b-9a52-81838e3281a0")}>click</button>
        {
            getSubmissionsByProject.isLoading ?
                <div>...Loading</div>
                : <Submissions/>
        }
    </div>)
}

export default SubmissionHome;
