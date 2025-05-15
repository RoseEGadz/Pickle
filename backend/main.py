from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from schemas import (
    UserOut,
    CategoryOut,
    EventOut,
    NoteUpdate,
    NoteCreate,
    TimeCreate,
    NoteOut,
    TimeOut,
)
import db

app = FastAPI()

origins = ["http://127.0.0.1:5173"]

app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/user")
async def get_user():
    user = db.get_user()
    return user


@app.get("/api/categories")
async def get_categories() -> list[CategoryOut]:
    categories = db.get_categories()
    return categories


@app.get("/api/{category_id}/events")
async def get_events_by_category(category_id: int) -> list[EventOut]:
    events = db.get_events_by_category(category_id)
    return events


@app.get("/api/{event_id}")
async def get_times_and_note(event_id: int):
    user_id = 1
    times = db.get_times(event_id, user_id)
    note = db.get_note(event_id, user_id)
    return [times, note]


@app.post("/api/{event_id}/note")
async def create_note(event_id: int, note: NoteCreate):
    user_id = 1
    new_note = db.create_note(event_id, user_id, note)
    return new_note


@app.get("/{file_path}", response_class=FileResponse)
def get_static_file(file_path: str):
    if Path("static/" + file_path).is_file():
        return "static/" + file_path
    raise HTTPException(status_code=404, detail="Item not found")
