from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from vectorstore.db import load_db
from retrievel.retriever import get_retriever
from llm.llm_model import get_llm
from prompts.prompt import get_prompt
from ingestion.ingestion import ingest_data



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Query(BaseModel):
    question: str



vectorstore = load_db()
retriever = get_retriever(vectorstore)
llm = get_llm()
prompt = get_prompt()


@app.post("/ask")
def ask(q: Query):
    docs = retriever.invoke(q.question)

    context = "\n\n".join([doc.page_content for doc in docs])

    sources = []
    for doc in docs:
        meta = doc.metadata
        sources.append({
        "source": meta.get("source", "unknown"),
        "page": meta.get("page", "N/A")
        })


    final_prompt = prompt.invoke({
        "context": context,
        "question": q.question
    })

    response = llm.invoke(final_prompt)

    return {
        "answer": response.content,
        "sources":sources
    }




@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # call your ingestion
    ingest_data(file_path)

    return {"message": "file uploaded and processed"}