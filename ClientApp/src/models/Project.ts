import {Submission} from "./Submission";

export type Project = {
    title: string,
    description: string,
    id: string,
    submissions: Submission[]
}
