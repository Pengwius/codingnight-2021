from flask import Flask, render_template, jsonify, request
from datetime import datetime
import pytz
from datetime import datetime

app = Flask(__name__)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db.db_declarative import DataBase, Event

db_engine = create_engine('sqlite:///db/events.db')
DataBase.metadata.bind = db_engine

db_DBSession = sessionmaker(bind=db_engine)
db_session = db_DBSession()

@app.route('/uploadEvent', methods=['POST'])
def upload_event():
    body = request.get_json(force=True)
    date_now = datetime.now()

    print(body)

    new_event = Event(
        creator=body['creator'],
        title=body['title'],
        content=body['content'],
        date=date_now
    )

    db_session.add(new_event)
    db_session.commit()

    return jsonify({"status": "ok"})

@app.route('/getEvents', methods=['GET'])
def get_events():
    events = db_session.query(Event).all()
    events_list = []

    for event in events:
        events_list.append({
            'id': event.id,
            'creator': event.creator,
            'title': event.title,
            'content': event.content,
            'date': event.date.strftime("%d.%m.%Y %H:%M:%S")
        })

    return jsonify({"response": events_list})

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    app.run()
