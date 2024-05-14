import { Navigate, Route, Routes } from "react-router-dom";
import { CreatePost } from "./create-post";
import { InfinitePostList } from "./infinite-post-list";
import { PostDetail } from "./post-detail";
import { PostList } from "./post-list";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/infinite" element={<InfinitePostList />} />
      <Route path=":id" element={<PostDetail />} />
      <Route path="create" element={<CreatePost />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
