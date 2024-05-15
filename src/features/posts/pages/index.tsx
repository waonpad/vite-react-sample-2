import { Navigate, Route, Routes } from "react-router-dom";
import { CreatePost } from "./create-post";
import { InfiniteAutoLoadPostList } from "./infinite-auto-load-post-list";
import { InfinitePostList } from "./infinite-post-list";
import { PostDetail } from "./post-detail";
import { PostList } from "./post-list";
import { UpdatePost } from "./update-post";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/infinite" element={<InfinitePostList />} />
      <Route path="/infinite/auto" element={<InfiniteAutoLoadPostList />} />
      <Route path=":id" element={<PostDetail />} />
      <Route path="create" element={<CreatePost />} />
      <Route path=":id/update" element={<UpdatePost />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
