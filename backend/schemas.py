from pydantic import BaseModel
from datetime import date


class UserCreate(BaseModel):
    name: str


class UserOut(UserCreate):
    id: int


class CategoryOut(BaseModel):
    id: int
    name: str


class EventOut(BaseModel):
    id: int
    category_id: int
    name: str
    olympic: bool


class NoteCreate(BaseModel):
    text: str | None


class NoteOut(BaseModel):
    id: int
    user_id: int
    event_id: int
    text: str


class TimeCreate(BaseModel):
    time: float
    date: date


class TimeOut(TimeCreate):
    id: int
    event_id: int
    user_id: int
