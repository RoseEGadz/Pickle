from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db_models import DBUser, DBCategory, DBEvent, DBNote, DBTime
from schemas import (
    UserOut,
    CategoryOut,
    EventOut,
    NoteCreate,
    TimeCreate,
    NoteOut,
    TimeOut,
)
from rich import print

DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/pickle"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def get_user():
    db = SessionLocal()
    db_user = db.query(DBUser).filter(DBUser.id == 1).first()

    user = UserOut(id=1, name="developer")
    db.close()
    return user


def get_categories() -> list[CategoryOut]:
    db = SessionLocal()
    db_categories = db.query(DBCategory).all()

    categories: list[CategoryOut] = []
    for db_category in db_categories:
        categories.append(CategoryOut(id=db_category.id, name=db_category.name))
    db.close()
    return categories


def get_events_by_category(category_id: int) -> list[EventOut]:
    db = SessionLocal()
    db_events = db.query(DBEvent).filter(DBEvent.category_id == category_id).all()

    events: list[EventOut] = []
    for db_event in db_events:
        events.append(
            EventOut(
                id=db_event.id,
                category_id=db_event.category_id,
                name=db_event.name,
                olympic=db_event.olympic,
            )
        )
    db.close()
    return events


def get_times(event_id: int, user_id: int) -> list[TimeOut] | None:
    db = SessionLocal()
    db_times = (
        db.query(DBTime)
        .filter(DBTime.event_id == event_id and DBTime.user_id == user_id)
        .all()
    )

    times: list[TimeOut] = []
    for db_time in db_times:
        times.append(
            TimeOut(
                id=db_time.id,
                event_id=db_time.event_id,
                user_id=db_time.user_id,
                time=db_time.time,
                date=db_time.date,
            )
        )
    db.close()
    return times


def get_note(event_id: int, user_id: int) -> NoteOut | None:
    db = SessionLocal()
    db_note = (
        db.query(DBNote)
        .filter(DBNote.event_id == event_id and DBNote.user_id == user_id)
        .first()
    )
    if db_note is None:
        return None
    note = NoteOut(
        id=db_note.id,
        user_id=db_note.user_id,
        event_id=db_note.event_id,
        text=db_note.text,
    )
    db.close()
    return note


def add_time(event_id: int, user_id: int, time: TimeCreate) -> TimeOut:
    db = SessionLocal()
    time_model = DBTime(**time.model_dump())
    time_model.event_id = event_id
    time_model.user_id = user_id
    db.add(time_model)
    db.commit()
    new_time = TimeOut(
        id=time_model.id,
        event_id=time_model.event_id,
        user_id=time_model.user_id,
        time=time_model.time,
        date=time_model.date,
    )
    db.close()
    return new_time


def create_note(event_id: int, user_id: int, note: NoteCreate):
    db = SessionLocal()
    db_note = (
        db.query(DBNote)
        .filter(DBNote.event_id == event_id and DBNote.user_id == user_id)
        .first()
    )
    if db_note:
        db_note.text = note.text
    else:
        note_model = DBNote(**note.model_dump())
        note_model.event_id = event_id
        note_model.user_id = user_id
        db.add(note_model)
    db.commit()
    db.close()
    return note
