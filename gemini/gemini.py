import google.generativeai as genai
from dotenv import load_dotenv
import os
from Instance.instance import InstanceInfo
from datetime import datetime

load_dotenv()
api_key=os.environ['API_KEY']
genai.configure(api_key=api_key)
# Initialize an array to store prompts and responses
curr_key = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
instance_info = InstanceInfo()
instance_info.set_info(curr_key, [])
instance_info.set_info(None, None, curr_key)

def get_completion(prompt, model="gemini-1.5-flash", **kwargs):
    model = genai.GenerativeModel(model)
    chat = model.start_chat(
        history=instance_info.get_info(curr_key)
    )
    if not instance_info.get_info(curr_key):
        prompt += " This chat must be an effective cooking companion."
    response = chat.send_message(prompt, stream=True)
    for chunk in response:
        print(chunk.text)
    for a, b in enumerate(chat.history[-2:]):
        instance_info.get_info(curr_key).append(b)
        