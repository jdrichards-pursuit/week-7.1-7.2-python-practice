from transformers import T5ForConditionalGeneration, T5Tokenizer
import logging
from transformers import logging as hf_logging

# Set the logging level to suppress the warnings
logging.getLogger("transformers").setLevel(logging.ERROR)
hf_logging.set_verbosity_error()

def summarize_text(input_text):
    # Load the pre-trained T5 model and tokenizer
    model_name = "t5-small"
    tokenizer = T5Tokenizer.from_pretrained(model_name)
    model = T5ForConditionalGeneration.from_pretrained(model_name)

    # Tokenize the input text
    inputs = tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=512, truncation=True)

    # Generate the summary
    summary_ids = model.generate(inputs, num_beams=4, no_repeat_ngram_size=2, min_length=30, max_length=100, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return summary