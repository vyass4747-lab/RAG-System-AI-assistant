from langchain_mistralai import ChatMistralAI
from config import *

def get_llm():
    return ChatMistralAI(model = LLM_MODEL)