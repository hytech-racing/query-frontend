import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router";
import Root from "./routes/root";
import Docs from "./routes/docs";
import Changelog from "./routes/changelog";
import Layout from "./layout";
import ErrorPage from "./error-page";

// First thing React looks at 
// Go to Layout to change the layout
// Go to routes directory to view the paths

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />}> 
      <Route path="/" element={<Root />} /> 
      <Route path="/docs" element={<Docs />} />
      <Route path="/docs/:version/:repo" element={<Docs />} />
      <Route path="/changelog" element={<Changelog />} />
    </Route>,
  ),
  {
    basename: import.meta.env.BASE_URL,
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  </StrictMode>,
);
