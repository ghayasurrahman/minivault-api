const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const logger = require('./logger');
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /generate — uses local Ollama model
app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    logger.warn("Prompt missing in request");
    return res.status(400).json({ error: "Missing prompt" });
  }
  res.setHeader("Content-Type", "application/json");

  const ollama = spawn("ollama", ["run", "llama2"]);

  logger.info(`Prompt: ${prompt}`);
  console.log("Prompt:", prompt);

  logger.info("Spawning Ollama model llama2.");
  console.log("Spawning Ollama model llama2.");

  // Send the prompt to ollama stdin
  ollama.stdin.write(prompt);
  ollama.stdin.end();

  let output = "";
  let stderrOutput = "";

  ollama.stdout.on("data", (data) => {
    output += data.toString();
  });

  ollama.stderr.on("data", (data) => {
    stderrOutput += data.toString();
  });

  ollama.on("error", (err) => {
    console.error("spawn error:", err);
    logger.error("Failed to start Ollama:", err);
    res.status(500).json({ error: "Failed to start Ollama" });
  });

  ollama.on("close", (code) => {
    if (code !== 0) {
      logger.error(`Ollama exited with code ${code}, ${stderrOutput}`);
      return res.status(500).json({
        error: `Ollama exited with code ${code}`,
        stderr: stderrOutput,
      });
    }

    res.status(200).json({ response: output.trim() });
    console.log("llama2 responded.");
    logger.info("llama2 responded");
  });
});


// DEBUG endpoint 
app.get("/debug-env", (req, res) => {
  const { exec } = require("child_process");
  exec("which ollama", (err, stdout, stderr) => {
    res.json({
      path: process.env.PATH,
      whichOllama: stdout.trim(),
      stderr: stderr.trim(),
      error: err?.message || null
    });
  });
});


// status
app.get("/status", (req, res) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpuCount: os.cpus().length,
    platform: os.platform(),
    arch: os.arch()
  });
});

app.listen(PORT, () => {
  console.log(`MiniVault API running at http://localhost:${PORT}`);
});
