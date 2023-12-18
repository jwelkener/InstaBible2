-- verses.sql

CREATE TABLE verses (
    id INTEGER PRIMARY KEY,
    book TEXT,
    chapter INTEGER,
    verse INTEGER,
    text TEXT
);

-- Insert the new verses into the database
INSERT INTO verses (book, chapter, verse, text) VALUES
    ('John', 3, 16, 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'),
    ('Philippians', 4, 13, 'I can do all this through him who gives me strength.'),
    ('Jeremiah', 29, 11, 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.'),
    ('Psalm', 23, 1, 'The Lord is my shepherd, I lack nothing.'),
    ('Romans', 8, 28, 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.'),
    ('Proverbs', 3, 5, 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.'),
    ('Matthew', 11, 28, 'Come to me, all you who are weary and burdened, and I will give you rest.'),
    ('1 Corinthians', 13, 4, 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.'),
    ('Isaiah', 40, 31, 'but those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.'),
    ('Ephesians', 2, 8, 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.'),
    ('Romans', 13, 10, 'Love does no harm to a neighbor. Therefore love is the fulfillment of the law.');
