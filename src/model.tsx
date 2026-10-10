import { createRoot } from "react-dom/client";
import Viewer from "./components/Viewer";
const params = new URLSearchParams(location.search);
createRoot(document.getElementById("root")!).render(
  <Viewer
    id={params.get("id") || "core"}
    finish="Silver"
    view={params.get("view") || "studio"}
  />,
);
