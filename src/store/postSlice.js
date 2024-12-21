import { createSlice } from "@reduxjs/toolkit";
const initialState={
   posts:[],
   loading: false
}

 const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        setPosts: (state, action)=>{
           state.posts = action.payload
        },
        unsetPosts:(state)=>{
            state.posts=[]
        },
        addPost: (state,action)=>{
            state.posts.push(action.payload.post)
        },
        deletePost: (state, action)=>{
           state.posts = state.posts.filter((post)=>post.featuredImage !== action.payload.post.featuredImage)
        },
        setPostLoading: (state, action)=>{
            state.loading = action.payload
         }
    }
 })

 export const {addPost, deletePost, setPosts,unsetPosts,setPostLoading} = postSlice.actions
 export default postSlice.reducer