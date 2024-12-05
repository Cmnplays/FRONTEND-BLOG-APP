import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteServices from "../appwrite/config";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteServices.getAllPosts("active").then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, []);
  if (posts.length === 0) {
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
};

export default Home;
