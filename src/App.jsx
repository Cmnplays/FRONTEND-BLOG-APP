import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import databaseService from "./appwrite/config.js";
import { setPosts, unsetPosts } from "./store/postSlice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function initializeApp() {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          const posts = await databaseService.getAllPosts();
          dispatch(setPosts(posts.documents));
        } else {
          dispatch(logout());
          dispatch(unsetPosts());
        }
      } catch (error) {
        console.error({
          error,
          message: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
    initializeApp(dispatch);
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen bg-black"></div>
  );
};

export default App;
