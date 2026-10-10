import fs from "node:fs/promises";
const manifest = JSON.parse(await fs.readFile("package.json", "utf8"));
const lock = JSON.parse(await fs.readFile("package-lock.json", "utf8"));
for (const field of ["dependencies", "devDependencies"])
  for (const name of Object.keys(manifest[field]))
    manifest[field][name] = lock.packages["node_modules/" + name].version;
await fs.writeFile("package.json", JSON.stringify(manifest, null, 2) + "\n");
