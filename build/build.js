import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BlueFoxDomGate } from "@xofeulb/bluefox-domgate";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "config.json");
const srcRoot = path.join(__dirname, "..", "src");

const gateMap = JSON.parse(fs.readFileSync(configPath, "utf8"));

const depth = 10000;
const prettier = true;
const minify = true;

await Promise.all(
  gateMap.map((entry) =>
    BlueFoxDomGate.connect(
      path.join(__dirname, entry.index),
      srcRoot,
      path.join(__dirname, entry.out),
      depth,
      prettier,
      minify
    )
  )
);
