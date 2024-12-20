import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteServices from "../appwrite/config";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);

  if (user) {
    if (posts.length > 0) {
      return (
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap gap-5">
              {posts.documents.map((post) => (
                <div key={post.$id} className="py-4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  No posts yet!
                </h1>
              </div>
            </div>
          </Container>
        </div>
      );
    }
  } else {
    return <div>Please register or login to read posts</div>;
  }
};

export default Home;
