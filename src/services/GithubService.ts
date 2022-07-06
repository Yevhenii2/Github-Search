import axiosInstance from "../axios";

import { Repo } from "../types/Repo";
import { User } from "../types/User";

class GithubService{
    async getAllUsers(): Promise<User[] | null>{
        const res = await axiosInstance.get("/users");
        if(res.status === 200){
            return res.data;
        }
        return null;
    }

    async searchUsers(searchQuery: string): Promise<User[] | null>{
        const res = await axiosInstance.get("/search/users", { params: { q: searchQuery } });
        if(res.status === 200){
            return res.data.items;
        }
        return null;
    }

    async getUserInfoByLogin(userLogin: string): Promise<User | null>{
        const res = await axiosInstance.get(`/users/${userLogin}`);
        
        if(res.status === 200){
            return res.data;
        }
        return null;
    }

    async getUserRepos(userLogin: string): Promise<Repo[] | null>{
        const res = await axiosInstance.get(`/users/${userLogin}/repos`, { params: {per_page: 100 } });
        
        if(res.status === 200){
            return res.data;
        }
        return null;
    }
}

export default GithubService;