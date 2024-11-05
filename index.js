import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
import { GoogleGenerativeAI } from "@google/generative-ai";
import inquirer from 'inquirer';

import classifyInput from './Tier2/classifyInput.js';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Instructions for each topic
const topicInstructions = {
    "Energy Conservation": "Provide tips and insights on conserving energy, including the use of renewable energy sources and energy-efficient practices.",
    "Recycling and Waste Reduction": "Give advice on reducing waste, recycling, composting, and sustainable packaging options.",
    "Eco-Friendly Products": "Recommend eco-friendly and sustainable products, focusing on biodegradable, reusable, and low-impact materials.",
    "Climate Change": "Explain climate change concepts and share ways to reduce carbon footprint and adapt to climate impacts.",
    "Pollution": "Discuss the effects of pollution on air, water, and soil, and offer tips to minimize pollution.",
    "Sustainable Agriculture": "Offer tips on sustainable farming practices, soil health, and pesticide alternatives.",
    "Water Conservation": "Provide tips on saving water and efficient water management techniques.",
    "Biodiversity and Conservation": "Highlight the importance of biodiversity, species protection, and habitat conservation.",
    "Sustainable Transportation": "Discuss eco-friendly transportation options, including cycling, public transport, and electric vehicles.",
    "Green Building and Architecture": "Share advice on sustainable building designs, materials, and energy-efficient architecture.",
    "Environmental Policy and Legislation": "Explain environmental policies, laws, and government initiatives related to sustainability.",
    "Sustainable Fashion": "Discuss sustainable fashion practices, ethical clothing, and the environmental impact of the fashion industry.",
    "General": "Provide general environmental advice on sustainability and eco-friendly practices.",
};

// System Instructions
const systemInstructions = `You are an expert environmental advisor specializing in sustainability, energy conservation, waste reduction, and eco-friendly practices.
Please provide concise, practical advice tailored to the given topic, avoiding jargon. End every resposne with "Let me know if you have other questions!".
When a topic is outside your expertise, kindly suggest resources or direct users accordingly.`;


async function getResponse(userInput, chatState) {
    const topic = classifyInput(userInput); // Classify input to identify topic
    const additionalInstruction = topicInstructions[topic] || topicInstructions["General"];
    const prompt = `${systemInstructions}\nTopic: ${topic}\n${additionalInstruction}\nUser: ${userInput}`;

    try {
        const result = await model.generateContent(prompt);
        const assistantResponse = result.response.text();

        // Append disclaimer only if chatState is 'new'
        const finalResponse = chatState === 'new'
            ? `**Topic: ${topic}**\n\n${assistantResponse}\n\nNote: This assistant provides general environmental advice. For medical, legal, or technical matters, consult qualified professionals or trusted resources.`
            : `**Topic: ${topic}**\n\n${assistantResponse}`;

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
                    : "I'm here to help! Is there anything else about sustainability you're curious about?",
            },
        ]);

        // Check if the user wants to exit the chat
        if (userInput.toUpperCase() === 'EXIT') {
            console.log("Goodbye! Feel free to come back if you have more questions.");
            break;
        }

        // Generate and display the assistant's response
        await getResponse(userInput, chatState);

        // Update chat state to indicate the conversation is ongoing
        chatState = 'ongoing';

    }
}

main();
