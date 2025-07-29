# MiniVault API & CLI

A lightweight local LLM API service with CLI access using Ollama models.

## 1. Overview

This project provides:

- A local Express.js server to interact with Ollama models.
- A CLI tool to send prompts and receive responses directly from your terminal.
- Debug and status endpoints.
- JSONL-based logging for all communications.

---

## 2. Installation & Setup

### 2.1. Prerequisites

- Node.js (v16+ recommended)
- Ollama installed and a model (e.g., llama2) pulled locally

To install Ollama and pull a model:

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama2
```

### 2.2. Clone and Install

```bash
git clone https://github.com/ghayasurrahman/minivault-api.git
cd minivault-api
npm install
```

### 2.3. Make CLI Globally Available

Install the CLI tool globally using:

```bash
npm link
```

Now you can use the `minivault` command from anywhere in your terminal.

---

## 3. CLI Usage

You can interact with the local LLM by simply running:

```bash
minivault "Your prompt here"
```

Example:

```bash
minivault "What's the capital of France?"
```

This sends the prompt to the local server and prints the response to the terminal.

---

## 4. API Endpoints

### 4.1. POST /generate

Send a prompt to the LLM and get a response.

Request:

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello, who are you?"}'
```

Response:

```json
{
  "response": "I am an AI model..."
}
```

### 4.2. GET /status

Returns runtime info such as memory, uptime, etc.

Example:

```bash
curl http://localhost:3000/status
```

### 4.3. GET /debug-env

Provides environmental debug info to check if Ollama is accessible.

Example:

```bash
curl http://localhost:3000/debug-env
```

---

## 5. Logging

All interactions (prompts and responses) are logged to:

```
logs/log.jsonl
```

---

## 6. Development

To start the local API server:

```bash
npm start
```

Ensure your Ollama model is downloaded and working. You can test with:

```bash
ollama run llama2
```

---

## 7. File Structure

```
minivault-api/
├── cli.js              # CLI interface
├── logger.js           # Logger utility
├── server.js           # Express API server
├── logs/
│   └── log.jsonl       # Log file in JSONL format
├── package.json
└── README.md
```

---

## 9. Debugging Ollama Path

The `/debug-env` endpoint helps identify whether the `ollama` binary is accessible and correctly configured in your system's `$PATH`.

This command is used:

```js
exec("which ollama", (err, stdout, stderr) => {
  ...
});
```

The output is returned as JSON with:

- `path`
- `whichOllama` (resolved binary path)
- `stderr` (error stream output)
- `error` (error message if any)

---
