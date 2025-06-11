import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
    id: "carrier-guide-by-sunny",
    name: "Carrier Guide by Sunny",
    credentials: {
        apiKey: process.env.GEMINI_API_KEY,
    }
});
