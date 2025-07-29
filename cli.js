#!/usr/bin/env node
const axios = require("axios");

const prompt = process.argv.slice(2).join(" ");
if (!prompt) {
  console.error("Usage: minivault <prompt>");
  process.exit(1);
}

axios
  .post("http://localhost:3000/generate", { prompt })
  .then((res) => console.log(res.data.response))
  .catch((err) => console.error(err.message));
