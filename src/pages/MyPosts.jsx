import { PostCard, Container } from "../components";
import { useSelector } from "react-redux";
const AllPosts = () => {
  const userData = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.post.posts);
  console.log({ userData });
  console.log({ allPosts });
  console.log({ lastPost: allPosts[allPosts.length - 1] });

  const filteredPosts = allPosts.filter((item) => item);
  console.log({ filteredPosts });
  if (allPosts.length > 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {allPosts.map((post, index) => (
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
