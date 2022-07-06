import { Stack } from "@mui/material";

import RepoListItem from "../RepoListItem/RepoListItem";

import { Repo } from "../../types/Repo";


function ReposList({ repos } : { repos: Repo[] }){
    return <Stack spacing={1}>
            {repos.map(repo => <RepoListItem key={repo.id} repo={repo} />)}
        </Stack>;
        
}

export default ReposList;