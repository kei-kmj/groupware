from sqlalchemy.orm import Session, joinedload
from . import models, schemas


# ユーザー一覧を取得する
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


# ユーザーを取得する
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()


# ユーザーを作成する
def create_user(db: Session, user: schemas.User):
    db_user = models.User(username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# 会議室一覧を取得する
def get_rooms(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Room).offset(skip).limit(limit).all()


# 会議室を取得する
def get_room(db: Session, room_id: int):
    return db.query(models.Room).filter(models.Room.room_id == room_id).first()


# 会議室を作成する
def create_room(db: Session, room: schemas.Room):
    db_room = models.Room(room_name=room.room_name, capacity=room.capacity)
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room


# 予約一覧を取得する
def get_bookings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Booking).options(
        joinedload(models.Booking.user),
        joinedload(models.Booking.room)).offset(skip).limit(limit).all()


# 予約を取得する
def get_booking(db: Session, booking_id: int):
    return db.query(models.Booking).filter(models.Booking.booking_id == booking_id).first()


# 予約を作成する
def create_booking(db: Session, booking: schemas.Booking):
    db_booking = models.Booking(
        user_id=booking.user_id,
        room_id=booking.room_id,
        booked_num=booking.booked_num,
        meeting_name=booking.meeting_name,
        start_datetime=booking.start_datetime,
        end_datetime=booking.end_datetime,
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking
