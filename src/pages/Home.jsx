import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // if (loading) {
  //   return (
  //     <div className="w-full py-8 mt-4 text-center">
  //       <Container>
  //         <h1 className="text-2xl font-bold">Loading...</h1>
  //       </Container>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div className="w-full py-8 mt-4 text-center">
  //       <Container>
  //         <h1 className="text-2xl font-bold text-red-500">{error.message}</h1>
  //       </Container>
  //     </div>
  //   );
  // }
  if (user) {
    if (posts?.length > 0) {
      return (
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap gap-5">
              {[...posts].reverse().map((post, index) => (
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
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Please register or login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
};

export default Home;
