import {useAsyncData} from "../../common/data/useAsyncData";
import {Submission} from "../../models/Submission";
import {useEffect, useState} from "react";

export function useSubmissions(projectId?: string|null) {
    const [currentProjectId, setCurrentProjectId] = useState(projectId);


    const getAllSubmissions =
        useAsyncData<Submission[]>(() => fetch(`BugSubmissions`));
    const getSubmissionsByProject =
        useAsyncData<Submission[]>(() => fetch(`BugSubmissions/project/${currentProjectId}`));
    
    useEffect(() => {
        getSubmissionsByProject.fetchData(() => fetch(`BugSubmissions/project/${currentProjectId}`));
    }, [currentProjectId])

    return {
        getAllSubmissions,
        getSubmissionsByProject,
        setCurrentProjectId
    }
}
