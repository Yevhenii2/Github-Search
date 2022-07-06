import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Box, Card } from "@mui/material";

import Loader from "../Loader/Loader";

import { addUserRepos, ReposState } from "../../reducers/reposReducer";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { User } from "../../types/User";

function UserListItem({ user } : {user : User}){
    const dispatch = useAppDispatch();

    const [reposAmount, setReposAmount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const repos = useAppSelector((state:ReposState) =>  user && state.repos.repos[user.login]);
   
    useEffect(()=>{
        if(!repos){
            // Small example of fetch API usage
            // PS. I really do not know anowther way to get public repos amount. Anyway I should make another one request...
            fetch(user.repos_url + "?per_page=100")
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Something went wrong');
            }).then(data=> {            
                dispatch(addUserRepos({userLogin: user.login, repos: data}))
                setReposAmount(data.length)
            }).catch(e => {
                setError("Error!")
            }); 
        } else {
            setReposAmount(repos.length)
        }
    }, []);

    return <Card className="user-list-item">
                <Link to={`user/${user.login}`}>
                    <Box p={3}>
                        <div className="user-list-item-container">
                            <img src={user.avatar_url}></img>
                            {
                                user.login
                            }
                            <div>
                            {
                                !error ? 
                                    reposAmount ? 
                                    <span>Repos: {reposAmount}</span> :
                                    <Loader/>
                                : 
                                <span className="error" title="Limit error">{error}</span>
                            }
                            </div>
                        </div>
                    </Box>
                </Link>
            </Card>;
}

export default UserListItem;