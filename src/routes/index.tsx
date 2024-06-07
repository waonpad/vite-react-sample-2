import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { RouteNameSetter as R } from "./named-routes/route-name-setter";
import { appRoutes } from "./named-routes/routes";
import { SuspenseFallback } from "@/components/elements/suspense-fallback";
import { MainLayout } from "@/components/layouts/main-layout";
import { lazyImport } from "@/utils/lazy-import";

const { NotFound } = lazyImport(() => import("@/features/misc/pages/not-found"), "NotFound");

const { PostsRoutes } = lazyImport(() => import("@/features/posts/pages"), "PostsRoutes");

const { PostList } = lazyImport(() => import("@/features/posts/pages/post-list"), "PostList");

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<SuspenseFallback />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={appRoutes.index().fullPath} element={<App />}>
        <Route
          index={true}
          element={
            <>
              <R routeName={appRoutes.index().fullPath} />
              <PostList />
            </>
          }
        />
        <Route path={appRoutes.postsAll().fullPath} element={<PostsRoutes />} />
        <Route path={appRoutes.all().fullPath} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
