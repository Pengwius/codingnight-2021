from sqlalchemy import Column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.sql.sqltypes import TEXT, VARCHAR, DATE, INTEGER

DataBase = declarative_base()

class Event(DataBase):
    __tablename__ = 'event'
    id = Column(INTEGER, primary_key=True)
    creator = Column(VARCHAR(20))
    title = Column(VARCHAR(30))
    date = Column(DATE)
    content = Column(TEXT)

db_engine = create_engine('sqlite:///db/events.db')

DataBase.metadata.create_all(db_engine)
