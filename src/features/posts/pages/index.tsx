import { Navigate, Route, Routes } from "react-router-dom";
import { CreatePost } from "./create-post";
import { EditPost } from "./edit-post";
import { InfiniteAutoLoadPostList } from "./infinite-auto-load-post-list";
import { InfinitePostList } from "./infinite-post-list";
import { OptimisticPostList } from "./optimistic-update-post-list";
import { PostDetail } from "./post-detail";
import { PostList } from "./post-list";
import { RouteNameSetter as R } from "@/routes/named-routes/route-name-setter";
import { appRoutes } from "@/routes/named-routes/routes";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route
        path={appRoutes.postsIndex().value}
        element={
          <>
            <R routeName={appRoutes.postsIndex().fullPath} />
            <PostList />
          </>
        }
      />
      <Route
        path={appRoutes.postsOptimistic().value}
        element={
          <>
            <R routeName={appRoutes.postsOptimistic().fullPath} />
            <OptimisticPostList />
          </>
        }
      />
      <Route
        path={appRoutes.postsInfinite().value}
        element={
          <>
            <R routeName={appRoutes.postsInfinite().fullPath} />
            <InfinitePostList />
          </>
        }
      />
      <Route
        path={appRoutes.postsInfiniteAuto().value}
        element={
          <>
            <R routeName={appRoutes.postsInfiniteAuto().fullPath} />
            <InfiniteAutoLoadPostList />
          </>
        }
      />
      <Route
        path={appRoutes.postsCreate().value}
        element={
          <>
            <R routeName={appRoutes.postsCreate().fullPath} />
            <CreatePost />
          </>
        }
      />
      <Route
        path={appRoutes.postsDetail().value}
        element={
          <>
            <R routeName={appRoutes.postsDetail().fullPath} />
            <PostDetail />
          </>
        }
      />
      <Route
        path={appRoutes.postsEdit().value}
        element={
          <>
            <R routeName={appRoutes.postsEdit().fullPath} />
            <EditPost />
          </>
        }
      />
      <Route path={appRoutes.postsAll().value} element={<Navigate to="." />} />
    </Routes>
  );
};
