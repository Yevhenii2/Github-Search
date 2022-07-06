import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './reducers/reposReducer';
/*
 * IMPORTANT NOTICE!!! Redux hates me :) I use it for the first time
 */
export const store = configureStore({
  reducer: {
    repos: reposReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;