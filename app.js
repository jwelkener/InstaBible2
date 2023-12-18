//app.js

const verseInputField = document.getElementById('verseInput');
const imageInputField = document.getElementById('imageInput');
const imageContainer = document.querySelector('.imageContainer');
const centeredVerseDiv = document.querySelector('.centered-verse');

// Function to check if the entered value is a valid verse format
function isValidVerseFormat(verse) {
    const verseRegex = /^[a-zA-Z]+\s\d+:\d+$/;
    return verseRegex.test(verse);
}

// Function to check if the entered value is a valid image URL
function validateImage(url) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject();
        image.src = url;
    });
}

// Listen for input events on the verse input field
verseInputField.addEventListener('input', function () {
    const verseInput = verseInputField.value;
    if (isValidVerseFormat(verseInput)) {
        fetchVerseAndDisplay(verseInput);
    }
});

// Listen for input events on the image input field
imageInputField.addEventListener('input', function () {
    const imageInput = imageInputField.value;
    displayImage(imageInput);
});

// Function to make an API call to get the verse text
async function getVerseText(verseInput) {
    const apiUrl = `https://bible-api.com/${verseInput}?verse_numbers=true`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const verseData = await response.json();

        if (verseData.verses) {
            return verseData.verses[0].text;
        } else {
            throw new Error(`Verse not found for ${verseInput}`);
        }
    } catch (error) {
        console.error('Error fetching verse:', error);
        throw new Error('An error occurred while fetching the verse. Please try again.');
    }
}

// Function to download the div as an image
function downloadDivAsImage(container) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas size to the dimensions of the square div
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Draw the content of the div onto the canvas
    context.drawSvg(container.innerHTML, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL('image/png');

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with a desired filename
    link.download = 'verse_image.png';

    // Set the href attribute to the data URL
    link.href = dataUrl;

    // Append the link to the document and trigger a click event to initiate the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}

// Function to make an API call and display verse in the centered-verse div
async function fetchVerseAndDisplay(verseInput) {
    try {
        const verseText = await getVerseText(verseInput);

        // Find the container div
        const containerDiv = document.querySelector('.imageContainer');

        // Find or create the centered-verse div
        let centeredVerseDiv = containerDiv.querySelector('.centered-verse');
        if (!centeredVerseDiv) {
            centeredVerseDiv = document.createElement('div');
            centeredVerseDiv.classList.add('centered-verse');
            containerDiv.appendChild(centeredVerseDiv);
        }

        // Clear existing content in the centered-verse div
        centeredVerseDiv.innerHTML = '';

        // Set the text properties
        centeredVerseDiv.innerText = `${verseText} - ${verseInput}`;
    } catch (error) {
        console.error('Error fetching and displaying verse:', error);
        // Handle error as needed, e.g., display an error message
    }
}


// Function to display image in the imageContainer
function displayImage(imageUrl) {
    // Validate the image URL before setting it
    validateImage(imageUrl)
        .then(() => {
            // Create a new image element
            const imageElement = document.createElement('img');
            // Set the image URL
            imageElement.src = imageUrl;
            imageElement.alt = 'Selected Image';
            imageElement.classList.add('centered-image'); // Add a class for styling if needed

            // Clear existing content in the imageContainer
            imageContainer.innerHTML = '';

            // Append the image to the container
            imageContainer.appendChild(imageElement);
        })
        .catch(() => {
            // Handle invalid image URL if needed
            console.error('Invalid image URL');
        });
}


// Function to get a random verse
function getRandomVerse() {
    const apiUrl = 'https://bible-api.com/?random=verse';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Assuming the response structure has a 'text' property for the verse
            const randomVerse = data.text;
            
            // Assuming you have a verse input field with id 'verseInput'
            const verseInputField = document.getElementById('verseInput');

            // Set the value of the verse input field with the random verse
            verseInputField.value = randomVerse;

            // Fetch and display the verse
            fetchVerseAndDisplay(randomVerse);
        })
        .catch(error => {
            console.error('Error fetching random verse:', error);
            // Handle error as needed
        });
}

// Connect to button with id 'randomVerseButton'
const randomVerseButton = document.getElementById('randomVerseButton');

// Attach click event listener to the 'Random Verse' button
randomVerseButton.addEventListener('click', getRandomVerse);


