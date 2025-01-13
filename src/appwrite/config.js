import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      );
    } catch (error) {
      console.log("create post error:", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug, //this is the unique id of that post,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("update post error : ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("delete Post error : ", error);
      return false;
    }
  }

  async getPostWithPostId(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("error getting post with unique id", error);
    }
  }

  async getAllPosts(statusQuery, userId) {
    try {
      const queries = [];
      if (statusQuery === "active") {
        queries.push(Query.equal("status", statusQuery));
      }
      if (userId) {
        queries.push(Query.equal("userId", userId));
      }
      return this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("error getting active posts : ", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("uploadFile error : ", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("deletefile error : ", error);
      return false;
    }
  }

  getFilePreviewWIthId(fileId) {
    try {
      console.log("file id is", fileId);
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("error previewing file : ", error);
    }
  }

  downloadFileWithId(fileId) {
    try {
      return this.bucket.getFileDownload(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("error downloadFileWithId : ", error);
    }
  }
}

const databaseService = new Service();

export default databaseService;
