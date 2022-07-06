import { Card, Grid, Stack, Box } from "@mui/material";

import { Repo } from "../../types/Repo";

function RepoListItem({ repo } : { repo: Repo }){
    return <Card>
        <Box p={3}><a href={repo.html_url} target="_BLANK">{
            <Grid container spacing={1}>
                <Grid item sm={9}>{repo.name}</Grid>
                <Grid item sm={3}>
                    <Stack textAlign="end">
                        <Box>Forks: {repo.forks_count}</Box>
                        <Box>Stars: {repo.stargazers_count}</Box>
                    </Stack>
                </Grid>
            </Grid>
        }</a></Box>
    </Card>;
}

export default RepoListItem;