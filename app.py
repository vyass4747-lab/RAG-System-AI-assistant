from llm.llm_model import get_llm
from retrievel.retriever import get_retriever
from prompts.prompt import get_prompt
from vectorstore.db import load_db

llm = get_llm()
vectorstore = load_db()
prompt = get_prompt()
retriever = get_retriever()

print("RAG system ready")
print("Press 0 to exit")


while True:
    query = input("you:")
    if query == 0:
        break

    docs = retriever.invoke(query)

    context = "\n\n".join([doc.page_content for doc in docs])

    final_prompt = prompt.invoke({
        "context": context,
        "question": query
    })

    response = llm.invoke(final_prompt)

    print("\nAI:", response.content)
   