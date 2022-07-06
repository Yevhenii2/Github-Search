import { Stack } from "@mui/material";

import UserListItem from "../UserListItem/UserListItem";

import { User } from "../../types/User";

function UserList({ users } : { users: User[] }){
    return <Stack spacing={1}>
        {
            users.map((user: User) => <UserListItem user={user} key={user.id}></UserListItem>)
        }
        </Stack>
}

export default UserList;