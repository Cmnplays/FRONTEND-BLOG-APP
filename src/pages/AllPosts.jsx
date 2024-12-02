import React, { useEffect, useState } from "react";
import { PostCard, Container } from "../components";
import appwriteService from "../appwrite/config";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getAllActivePosts().then((res) => {
      if (res && res.documents) {
        setPosts(res.documents);
      }
    });
  }, []);
  console.log(posts);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="py-4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
