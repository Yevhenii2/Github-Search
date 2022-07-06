import React, { useState, useEffect } from "react";

import { Card } from "@mui/material";

import SearchBar from "../components/SearchBar/SearchBar";
import UserList from "../components/UserList/UserList";

import GithubService from "../services/GithubService";

import { User } from "../types/User";

function HomePage(){
    const [ users, setUsers ] = useState<User[]>([]);
    const [ isError, setIsError ] = useState<boolean>(false);
    // I barely understand what is going on on the line below...
    const [ delayedSearch, setDelayedSearch ] = useState<ReturnType <typeof setTimeout> | null>(null);

    const githubService = new GithubService();
 
    useEffect(() => { getAllUsers() }, []);

    async function getAllUsers(): Promise<void>{
        const usersResult : User[] | null = await githubService.getAllUsers();
        if(usersResult){
            setUsers(usersResult);
        } else {
            setIsError(true);
        }
    }

    function onSearch(searchQuery: string){
        if(!searchQuery) return false;
        // Prevents requests on every symbol typed.
        delayedSearch && clearTimeout(delayedSearch);

        setDelayedSearch(setTimeout(async () => { 
            const seachResult : User[] | null  = await githubService.searchUsers(searchQuery);
            if(seachResult){
                setUsers(seachResult);
            } else {
                setIsError(true);
            }
        }, 500));
    }
    return <React.Fragment>
                <SearchBar onChange={onSearch} />
                {
                    !isError ? <UserList users={users}></UserList> : <Card> No users found! </Card>
                }
            </React.Fragment>;
      
        
}

export default HomePage;