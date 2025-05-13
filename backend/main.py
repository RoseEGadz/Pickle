from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
import db

app = FastAPI()


@app.get("/api/categories")
async def get_categories():
    categories = db.get_categories()
    return categories


@app.get("/api/{category_id}/events")
async def get_events_by_category(category_id: int):
    events = db.get_events_by_category(category_id)
    return events


@app.get("/api/{event_id}")
async def get_times_and_note(event_id: int, user_id: int):
    times = db.get_times(event_id, user_id)
    note = db.get_note(event_id, user_id)
    return [times, note]


@app.post("/api/{note_id}")
async def edit_note(note_id: int, text):
    new_note = db.edit_note(note_id, text)
    return


@app.post("/api/{event_id}")
async def add_time(event_id, time, date):
    new_time = db.add_time(event_id, time, date)
    return


# Route to handle requests for static assets
# this is a catch all so it should be registered last
@app.get("/{file_path}", response_class=FileResponse)
def get_static_file(file_path: str):
    if Path("static/" + file_path).is_file():
        return "static/" + file_path
    raise HTTPException(status_code=404, detail="Item not found")
