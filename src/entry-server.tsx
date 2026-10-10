import { renderToString } from "react-dom/server";
import { App } from "./App";
export { routes, pageMeta } from "./data";
export function render(path: string) {
  return renderToString(<App path={path} />);
}
