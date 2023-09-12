from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from server.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    bookings = relationship("Booking", back_populates="user")


class Room(Base):
    __tablename__ = "rooms"

    room_id = Column(Integer, primary_key=True, index=True)
    room_name = Column(String, unique=True, index=True)
    capacity = Column(Integer)
    bookings = relationship("Booking", back_populates="room")


class Booking(Base):
    __tablename__ = "bookings"

    booking_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"), nullable=False)
    room_id = Column(Integer, ForeignKey("rooms.room_id", ondelete="SET NULL"), nullable=False)
    meeting_name = Column(String, nullable=True)
    booked_num = Column(Integer)
    start_datetime = Column(DateTime)
    end_datetime = Column(DateTime)

    user = relationship("User", back_populates="bookings")
    room = relationship("Room", back_populates="bookings")




