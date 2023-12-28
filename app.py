# app.py

from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://johnwelkener:Luge12345@localhost:5432/instabible'
db = SQLAlchemy(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

class Verse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book = db.Column(db.String(50))
    chapter = db.Column(db.Integer)
    verse = db.Column(db.Integer)
    text = db.Column(db.Text)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/random')
def display_random_verse():
    try:
        api_url = 'https://bible-api.com/?random=verse'
        response = requests.get(api_url)
        response.raise_for_status()
        verse_data = response.json()
        return jsonify(verse_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
