# TODO: Import the necessary modules
# Define strategic prompts such as system instructions, few shot examples, and topic keywords
# Define functions to declare any plant assistant functions
from gemini.gemini import get_completion

def main():
    while True:
        print("Welcome to gemini-> Cooking Companion")
        u_input = input()
        try:
            get_completion(u_input.strip(), temperature=0.9, max_output_tokens=1000)
        except:
            print("api error")

if __name__ == "__main__":
    main()