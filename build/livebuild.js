import { watch } from "chokidar";
import { BlueFoxDomGate } from "@xofeulb/bluefox-domgate";

let gate_map = [
  {
    index: "../src/index.html",
    out: "../docs/index.html",
  },
  {
    index: "../src/staff.html",
    out: "../docs/staff.html",
  },
  {
    index: "../src/privacypolicy.html",
    out: "../docs/privacypolicy.html",
  },
  {
    index: "../src/faq.html",
    out: "../docs/faq.html",
  },
  {
    index: "../src/service.html",
    out: "../docs/service.html",
  },
];
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
