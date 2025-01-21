import { useEffect, useState } from "react";
import { PostCard, Container } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    setLoading(true);
    if (userData && userData.$id) {
      appwriteService
        .getAllPosts("", userData.$id)
        .then((res) => {
          if (res && res.documents) {
            setPosts(res.documents);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userData]);
  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold">Loading...</h1>
        </Container>
      </div>
    );
  }

  if (posts.length > 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts?.map((post, index) => (
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
