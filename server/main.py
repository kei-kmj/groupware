from fastapi import FastAPI, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CORS対応
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    return {"message": "Success"}


@app.get("/users", response_model=List[schemas.User])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
async def read_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.post("/users", response_model=schemas.User)
async def create_users(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)


@app.get("/rooms", response_model=List[schemas.Room])
async def read_rooms(skip: int = 0, limit: int = 100,db: Session = Depends(get_db)):
    rooms = crud.get_rooms(db,skip=skip, limit=limit)
    return rooms


@app.get("/rooms/{room_id}", response_model=schemas.Room)
async def read_room(room_id: int, db: Session = Depends(get_db)):
    room = crud.get_room(db, room_id=room_id)
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return room


@app.post("/rooms")
async def create_rooms(rooms: schemas.RoomCreate, db: Session = Depends(get_db)):
    return crud.create_room(db=db, room=rooms)


@app.get("/bookings")
async def read_bookings(skip: int = 0, limit: int = 100,db: Session = Depends(get_db)):
    bookings = crud.get_bookings(db,skip=skip, limit=limit)
    result = []
    for booking in bookings:
        result.append({
            **booking.__dict__,
            "username": booking.user.username,
            "room_name": booking.room.room_name
        })
    return result


@app.get("/bookings/{booking_id}", response_model=schemas.Booking)
async def read_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = crud.get_booking(db, booking_id=booking_id)
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@app.post("/bookings")
async def create_bookings(bookings: schemas.BookingCreate, db: Session = Depends(get_db)):
    print("data:", bookings)
    return crud.create_booking(db=db, booking=bookings)


