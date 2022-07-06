import { Box, Grid, Stack } from "@mui/material";
import moment from "moment";

import { User } from "../../types/User";

function UserInformation({user}: {user: User}){
    return <Grid container spacing={1} className="user-information">
                <Grid item xs={6}>
                    <Box my="auto">
                        <img src={user.avatar_url} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <Stack>
                            <Box>{ user.name }</Box>
                            <Box>{ user.email }</Box>
                            <Box>{ user.location }</Box>
                            <Box>{ moment(user.created_at).format("DD.MM.YYYY") }</Box>
                            <Box>{ user.followers } followers</Box>
                            <Box>Following { user.following }</Box>
                        </Stack>
                    </Box>
                </Grid>
                {
                    user.bio ? 
                    <Grid item xs={12}>
                        <Box p={2}>
                            { user.bio }
                        </Box>
                    </Grid>
                    : ""
                }
               
            </Grid>;
}

export default UserInformation;