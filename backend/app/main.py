from fastapi import FastAPI
from .converters import convert_unit
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Unit Converter API"}

@app.get("/convert")
def convert(metric: str, from_unit: str, to_unit: str, value: float):
    result = convert_unit(metric, from_unit, to_unit, value)
    return {"result": result} 