import React from "react";
import dataBaseServices from "../appwrite/config";
import { Link } from "react-router-dom";
const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center">
          <img
            src={dataBaseServices.getFilePreviewWIthId(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
          <h2 className="text-2xl font-bold mt-2">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
