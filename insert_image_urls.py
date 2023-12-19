import os
import psycopg2

# Connect to your PostgreSQL database
conn = psycopg2.connect("dbname=yourdbname user=youruser password=yourpassword host=yourhost")
cursor = conn.cursor()

# Folder containing your images
image_folder = "https://raw.githubusercontent.com/jwelkener/InstaBible2/9e37aaa1fac8e22d801b1f86f7237042cf714c40/static/images/"

# Insert each image URL into the database
for filename in os.listdir(image_folder):
    if filename.endswith(".jpg"):  # Adjust the file extension as needed
        url = os.path.join(image_folder, filename)
        cursor.execute("INSERT INTO images (url) VALUES (%s);", (url,))

# Commit the changes and close the connection
conn.commit()
cursor.close()
conn.close()
