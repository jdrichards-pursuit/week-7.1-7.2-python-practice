# TODO: Import the necessary modules
# Define strategic prompts such as system instructions, few shot examples, and topic keywords
# Define functions to declare any plant assistant functions
from gemini.gemini import get_completion
import atexit
from gemini.db_connection import DatabaseConnection
from Instance.instance import InstanceInfo
from gpt2 import summarize_text

instance_info = InstanceInfo()
db_instance = DatabaseConnection()
db_instance.execute_query('''CREATE TABLE IF NOT EXISTS gem_chat (id INTEGER PRIMARY KEY AUTOINCREMENT, session_time TEXT UNIQUE, chatlog TEXT)''')

def save_conversation():
    plain_text_history = ""
    session_time = instance_info.get_session_time()
    for ch in instance_info.get_info(session_time):
        sub_text = ""
        for part in ch.parts:
            sub_text += f"{part.text}"

        plain_text_history += f"{ch.role}: {sub_text}\n"
    if not plain_text_history or not instance_info.get_info(session_time):
        return
    try:
        summarize_conv = summarize_text(plain_text_history)
        plain_text_history = str(summarize_conv)
    except:
        print("hugging face api integration")
    sql_insert = '''INSERT INTO gem_chat (session_time, chatlog) VALUES (?, ?)'''
    try:
        db_instance.execute_query(sql_insert, (session_time, plain_text_history))
    except Exception as e:
        print(f"Error executing SQL query: {e}")
    finally:
        db_instance.close_connection()
    
def main():
    while True:
        print("Welcome to gemini-> Cooking Companion")
        u_input = input()
        try:
            get_completion(u_input.strip(), temperature=0.9, max_output_tokens=1000)
        except:
            print("api error")

if __name__ == "__main__":
    try:
        atexit.register(save_conversation)
        main()
    except:
        pass
    finally:
        print("goodbye")