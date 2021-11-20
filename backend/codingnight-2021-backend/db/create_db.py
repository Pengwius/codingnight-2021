import sqlite3 as sql
conn = sql.connect('db/events.db')

conn.execute('''CREATE TABLE events(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    creator VARChAR(20) NOT NULL,
    date DATE NOT NULL
)
''')

conn.close()
