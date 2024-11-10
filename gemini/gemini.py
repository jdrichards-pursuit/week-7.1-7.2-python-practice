import google.generativeai as genai
from dotenv import load_dotenv
import pandas as pd
import os

load_dotenv()
api_key=os.environ['API_KEY']
genai.configure(api_key=api_key)
# Initialize an array to store prompts and responses
conversation_history = []

def get_completion(prompt, model="gemini-1.5-flash", **kwargs):
    model = genai.GenerativeModel(model)
    
    # Append the prompt to the conversation history
    conversation_history.append(prompt)
    
    # Create a generation_config dictionary with default values
    generation_config = {
        "temperature": 0.8,
        "max_output_tokens": 200
    }
    
    # Update generation_config with any provided kwargs
    generation_config.update(kwargs)
    
    response = model.generate_content(" ".join(conversation_history), generation_config=generation_config)
    
    # Append the response to the conversation history
    conversation_history.append(response.text)
    
    return response.text