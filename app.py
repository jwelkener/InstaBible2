# app.py

from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import requests
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


@app.route('/')
def home():
    return render_template('index.html')

# Route to display a random verse
@app.route('/random')
def display_random_verse():
    # Get a random verse from the database
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

def home():
    # Check if the user has submitted the form
    if request.method == 'POST':
        # Get the user-input verse from the form
        user_input_verse = request.form.get('verseInput')

        # Fetch the verse based on the user input
        verse_data = get_verse_by_input(user_input_verse)

        # Get the verse text
        verse_text = verse_data['text']

        # Count the number of words in the verse
        word_count = len(verse_text.split())

        # Determine the CSS class based on the word count
        css_class = get_css_class(word_count)

        return render_template('index.html', verse=verse_text, css_class=css_class)

    # Render the initial page
    return render_template('index.html', verse='', css_class='')

def get_verse_by_input(user_input_verse):
    # Fetch the verse from an external API or source based on user input
    api_url = f'https://bible-api.com/{user_input_verse}?verse_numbers=true'
    response = requests.get(api_url)
    return response.json()

def get_css_class(word_count):
    if word_count <= 20:
        return 'short'
    elif 20 < word_count <= 50:
        return 'medium'
    elif 50 < word_count <= 70:
        return 'long'
    else:
        return 'extra-long'
