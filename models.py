from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app)
	db.app = app
	db.init_app(app)

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
