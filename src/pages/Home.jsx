import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteServices from "../appwrite/config";
import { useSelector } from "react-redux";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  useEffect(() => {
    appwriteServices.getAllPosts("active").then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, [user]);
  console.log({ posts });
  console.log({ user });
  if (user) {
    console.log("first condition fulfilled");
    if (posts?.documents?.length > 0) {
      return (
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap gap-5">
              {posts.documents.map((post, index) => (
                <div key={index} className="py-4">
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
