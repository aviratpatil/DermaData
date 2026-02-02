from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

from .database import SessionLocal
from .services import analyze_ingredients_text

app = FastAPI()

# Input Model
class AnalyzeRequest(BaseModel):
    text: str

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS Setup
origins = [
    "http://localhost:5173",
    "http://localhost:5174", # Added current user port
    "*", # Allow all for dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Ingredient Safety API is running"}

@app.post("/analyze")
def analyze_ingredients(request: AnalyzeRequest, db: Session = Depends(get_db)):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    try:
        results = analyze_ingredients_text(request.text, db)
        return results
    except Exception as e:
        # In a real app, log this
        raise HTTPException(status_code=500, detail=str(e))
