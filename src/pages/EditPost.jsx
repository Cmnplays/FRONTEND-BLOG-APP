import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm, Container } from "../components";

import appwriteServices from "../appwrite/config";

const EditPost = () => {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appwriteServices.getPostWithPostId(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
