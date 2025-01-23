import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deletePost } from "../store/postSlice.js";
export default function Post() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  let post = useSelector((state) =>
    state.post.posts.find((post) => post.$id === slug)
  );
  const userData = useSelector((state) => state.auth.userData);
  const deletePostFromDb = () => {
    setLoading(true);
    appwriteService
      .deletePost(post.$id)
      .then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage).then(() => {
            dispatch(deletePost(post.$id));
          });
          setLoading(false);
          navigate("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!slug || !post) {
      navigate("/");
    }
  }, [slug, post, navigate]);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <h1 className="text-white text-2xl">Loading...</h1>
    </div>
  ) : (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreviewWIthId(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePostFromDb}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  );
}
