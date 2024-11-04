import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
import { GoogleGenerativeAI } from "@google/generative-ai";
import inquirer from 'inquirer';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// System Instructions
const systemInstructions = `You are an environmental advisor with expertise in energy conservation, sustainability practices, waste reduction, and eco-friendly product recommendations.
Please respond in a clear, concise, and friendly tone. You can provide practical tips, explanations, and insights about environmental topics.
Use simple language that is easy to understand. Avoid jargon whenever possible.
If a user’s question falls outside your expertise, let them know politely and suggest resources for further assistance.
At the end of every response, remind users not to rely solely on this information and to consult qualified professionals or trusted resources for critical advice.
`;

// Basic conversation handling function
async function getResponse(userInput) {
    const prompt = `${systemInstructions}\nUser: ${userInput}\nAssistant:`;

    try {
        const result = await model.generateContent(prompt);
        const assistantResponse = result.response.text();

        // Append disclaimer to every response
        const finalResponse = `${assistantResponse}\n\nNote: This assistant provides general environmental advice. For medical, legal, or technical matters, consult qualified professionals or trusted resources.`;

        console.log("\nAssistant Response:", finalResponse);
        return finalResponse;
    } catch (error) {
        console.error("Error:", error.message || "An unexpected error occurred.");
        return "Sorry, I couldn’t process your request due to an error. Please try again.";
    }
}

// Main loop for continuous user interaction
async function main() {
    console.log("Welcome to the Environmental Advisor Assistant! Type 'EXIT' to quit.");
    let chatState = 'new'; // Track whether the chat is new or ongoing

    while (true) {
        const { userInput } = await inquirer.prompt([
            {
                type: 'input',
                name: 'userInput',
                message: chatState === 'new' 
                    ? "Need some green advice? I’m here to help with tips on sustainable living—just ask!"
                    : "What else would you like to know about sustainability? I'm here to help!"
            },
        ]);

        // Check if the user wants to exit the chat
        if (userInput.toUpperCase() === 'EXIT') {
            console.log("Goodbye! Feel free to come back if you have more questions.");
            break;
        }

        // Generate and display the assistant's response
        await getResponse(userInput);

        // Update chat state to indicate the conversation is ongoing
        chatState = 'ongoing';
        
        // Friendly acknowledgment after the response
        console.log("\nAssistant: I'm here for you! Feel free to ask more questions about sustainability.");
    }
}

main();
