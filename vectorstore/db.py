from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from config import *


def load_db():
    embeddings = HuggingFaceEmbeddings(model_name  = MODEL_NAME)

    vectorstore = Chroma(
        embedding_function=embeddings,
        persist_directory=PERSIST_DIR
    )

    return vectorstore