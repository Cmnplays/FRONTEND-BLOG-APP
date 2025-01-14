import React, { useEffect, useState } from "react";
import { PostCard, Container } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    appwriteService.getAllPosts("", userData.$id).then((res) => {
      if (res && res.documents) {
        setPosts(res.documents);
      }
    });
  }, [userData]);
  if (posts.length > 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts?.map((post) => (
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
                No posts created yet!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
};

export default AllPosts;
