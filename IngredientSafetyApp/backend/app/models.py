from sqlalchemy import Column, Integer, String, Boolean, Text
from .database import Base

class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    common_names = Column(String)  # Stored as comma-separated string
    hazard_score = Column(Integer)
    description = Column(Text)
    concerns = Column(Text)
    is_restricted = Column(Boolean, default=False)
