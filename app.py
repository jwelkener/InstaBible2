# app.py

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import random
from sqlalchemy import func

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///instabible'  # Use SQLite for simplicity
db = SQLAlchemy(app)

class Verse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book = db.Column(db.String(50))
    chapter = db.Column(db.Integer)
    verse = db.Column(db.Integer)
    text = db.Column(db.Text)

# Create tables
with app.app_context():
    db.create_all()

# Route to display a random verse
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/random')
def display_random_verse():
    # Get a random verse from the database
    random_verse = Verse.query.order_by(func.random()).first()

    return render_template('index.html', random_verse=random_verse)

if __name__ == '__main__':
    app.run(debug=True)
