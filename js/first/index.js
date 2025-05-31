const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

// Health check endpoint
app.get('/health', (req, res) => {
    try {
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'first-service'
        });
    } catch (error) {
        res.status(500).json({
            status: 'unhealthy',
            error: error.message
        });
    }
});
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});
app.get("/", (req, res) => {
    res.send("Hello, World from first!");
});

app.get("/second", async(req, res) => {
    try {
        const result = await axios.get(process.env.SERVER_URL || "http://127.0.0.1:9080/first");
        res.status(200).json({
            message: "Hello from second endpoint!",
            data: result.data,
        });
    } catch (error) {
        console.error("Error fetching data from second endpoint:", error);
        res.status(500).json({
            message: "Error fetching data from second endpoint",
            error: error.message,
        });
    }
    finally {
        console.log("Request to /second completed");
    }
});

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// console.log("Hello, World!");
// console.log(`This is a simple Updated JavaScript file that prints a message to the console.`)
