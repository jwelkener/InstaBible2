from flask_sqlalchemy import SQLAlchemy
from flask import Flask

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///instabible'  # Use PostgreSQL for simplicity
db = SQLAlchemy(app)

class Verse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book = db.Column(db.String(50))
    chapter = db.Column(db.Integer)
    verse = db.Column(db.Integer)
    text = db.Column(db.Text)

    @classmethod
    def get_by_book(cls, book_name):
        return cls.query.filter_by(book=book_name).all()

    # Example usage:
    # verses_by_john = Verse.get_by_book('John')
    # for verse in verses_by_john:
    #     print(verse.text)

    @classmethod
    def get_by_chapter(cls, book_name, chapter_number):
        return cls.query.filter_by(book=book_name, chapter=chapter_number).all()

    # Example usage:
    # verses_by_john_chapter_3 = Verse.get_by_chapter('John', 3)
    # for verse in verses_by_john_chapter_3:
    #     print(verse.text)

# Create tables
with app.app_context():
    db.create_all()
