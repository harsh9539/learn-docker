const express = require("express");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 9080;

// Health check endpoint
app.get('/health', (req, res) => {
    try {
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'second-service'
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
    res.send("Hello, World from second!");
});

app.get("/first", (req, res) => {
    res.status(200).json({
        message: "Hello from first endpoint!",
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
