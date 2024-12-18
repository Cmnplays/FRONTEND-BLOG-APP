import { createSlice } from "@reduxjs/toolkit";

const initialState={
   posts:[]
}

 const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        setPosts: (state, action)=>{
           state.posts = action.payload
        },
        getAllPosts:(state)=>{
            return state.posts
        },
        getPostWithId:(state, action)=>{
            return state.posts.filter((post)=>post.featuredImage === action.payload.featuredImage )
        },
      unsetPosts:(state)=>{
            state.posts=undefined
        },
        addPost: (state,action)=>{
            state.posts.push(action.payload.post)
        },
        deletePost: (state, action)=>{
           state.posts = state.posts.filter((post)=>post.featuredImage !== action.payload.post.featuredImage)
        }
    }
 })

 export const {addPost, deletePost, setPosts,unsetPosts} = postSlice.actions
 export default postSlice.reducer