import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Repo } from '../types/Repo'

export interface ReposState {
    repos: any
}

const initialState: ReposState = {
    repos: {},
}

type AddReposPayload = {
    userLogin: string,
    repos: Array<Repo>
}

export const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        addUserRepos: (state, action: PayloadAction<AddReposPayload>) => {
            state.repos[action.payload.userLogin] = action.payload.repos;
            localStorage.setItem("usersRepos", state.repos)
        },
    },
});

export const { addUserRepos } = reposSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectRepos = (state: RootState) => state.repos

export default reposSlice.reducer