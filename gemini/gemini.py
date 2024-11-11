import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
api_key=os.environ['API_KEY']
genai.configure(api_key=api_key)
# Initialize an array to store prompts and responses
history = []

def get_completion(prompt, model="gemini-1.5-flash", **kwargs):
    model = genai.GenerativeModel(model)
    chat = model.start_chat(
        history=history
    )
    response = chat.send_message(prompt, stream=True)
    for chunk in response:
        print(chunk.text)
    for a, b in enumerate(chat.history[-2:]):
        history.append(b)