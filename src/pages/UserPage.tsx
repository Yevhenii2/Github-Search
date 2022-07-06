import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import GithubService from "../services/GithubService";

import { Box, Card } from "@mui/material";

import ReposList from "../components/ReposList/ReposList";
import UserInformation from "../components/UserInformation/UserInformation";
import SearchBar from "../components/SearchBar/SearchBar";

import { ReposState } from "../reducers/reposReducer";
import { addUserRepos } from "../reducers/reposReducer";
import { useAppDispatch, useAppSelector } from "../hooks";

import { Repo } from "../types/Repo";
import { User } from "../types/User";


function UserPage(){
    const dispatch = useAppDispatch();

    const [ user, setUser ] = useState<User | null>(null);
    const { login } = useParams();
    const repos = useAppSelector((state:ReposState) => {
        return login && state.repos.repos[login];
    });
    const [ visibleRepos, setVisibleRepos ] = useState<Repo[]>([])
    
    const githubService = new GithubService();

    useEffect(() => {
        getUserInfo();
        if(!repos){
            getUserRepos();
        } else {
            setVisibleRepos(repos);
        }
    }, [login]);

    async function getUserInfo(){
        if(!login) return false;

        const newUser = await githubService.getUserInfoByLogin(login);
        setUser(newUser);
    }

    async function getUserRepos(){
        if(!login) return false;

        const repos = await githubService.getUserRepos(login);
        if(repos){
            dispatch(addUserRepos({ userLogin: login, repos: repos }));
            setVisibleRepos(repos);
        }
    }
    function onSearch(searchQuery : string){
        setVisibleRepos(repos.filter((repo : Repo) => repo.name.includes(searchQuery)))
    }
    return  <React.Fragment>
                <Card>
                    <Box p={3}>
                        {
                            user ? 
                            <UserInformation user={user} />
                            : 
                            <Box>User not found!</Box>
                        }
                    </Box>
                </Card>
                <SearchBar onChange={onSearch}></SearchBar>
                { visibleRepos && <ReposList repos={visibleRepos}></ReposList>}
            </React.Fragment>;
}

export default UserPage;