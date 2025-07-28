import { watch } from "chokidar";
import { BlueFoxDomGate } from "@xofeulb/bluefox-domgate";
import fs from "fs";

let gate_map = [];

watch("./config.json").on("all", async (event, path) => {
  console.log(event, path);
  gate_map = JSON.parse(fs.readFileSync("./config.json", "utf8"));
});

watch("../src").on("all", async (event, path) => {
  console.log(event, path);
  gate_map.forEach((_) => {
    try {
      BlueFoxDomGate.connect(
        _.index,
        "../src",
        _.out,
        10000,
        true,
        true
      );
    } catch { }
  });
});
