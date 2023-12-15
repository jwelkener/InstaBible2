const verseInputField = document.getElementById('verseInput');
const imageInputField = document.getElementById('imageInput');
const imageContainer = document.querySelector('.imageContainer');

// Function to check if the entered value is a valid verse format
function isValidVerseFormat(verse) {
    const verseRegex = /^[a-zA-Z]+\s\d+:\d+$/;
    return verseRegex.test(verse);
}

// Function to validate image loading
function validateImage(url) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject();
        image.src = url;
    });
}

// Listen for input events on the verse input field
verseInputField.addEventListener('input', function() {
    const verseInput = verseInputField.value;
    if (isValidVerseFormat(verseInput)) {
        fetchVerseAndDisplay(verseInput);
    }
});

// // Listen for input events on the image input field
// imageInputField.addEventListener('input', function () {
//     const imageInput = imageInputField.value;
//     displayImage(imageInput);
// });

// Listen for input events on the image input field
imageInputField.addEventListener('input', function() {
    const imageInput = imageInputField.value;
    validateImage(imageInput)
        .then(() => {
            createImageWithVerse(imageInput);
        })
        .catch(() => {
            // Handle invalid image URL if needed
        });
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

// Function to adjust styles based on content
// function adjustStyles(imageContainer, centeredVerse) {
//     // Apply styles to imageContainer
//     imageContainer.style.position = 'relative';
//     imageContainer.style.width = '500px';
//     imageContainer.style.height = '500px';
//     imageContainer.style.display = 'block';
//     imageContainer.style.marginLeft = 'auto';
//     imageContainer.style.marginRight = 'auto';
//     imageContainer.style.objectFit = 'cover';
//     imageContainer.style.alignItems = 'center';

//     // Apply styles to centeredVerse
//     centeredVerse.style.fontFamily = "'Shrikhand', sans-serif";
//     centeredVerse.style.fontSize = '20px';
//     centeredVerse.style.color = 'white';
//     centeredVerse.style.textShadow = '1px 1px 1px gray';
//     centeredVerse.style.position = 'absolute';
//     centeredVerse.style.textAlign = 'center';
//     centeredVerse.style.height = '400px';
//     centeredVerse.style.width = '400px';
//     centeredVerse.style.top = '70%';
//     centeredVerse.style.left = '50%';
//     centeredVerse.style.transform = 'translate(-50%, -50%)';
//     centeredVerse.style.webkitTextStrokeWidth = '.75px';
//     centeredVerse.style.webkitTextStrokeColor = 'black';
//     centeredVerse.style.zIndex = '4';
// }

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

// Function to make an API call and display verse on the image
async function fetchVerseAndDisplay(verseInput) {
    try {
        const verseText = await getVerseText(verseInput);

        // Create a new container div for the image and centered verse
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('image-container'); // Add a class for styling if needed

        // Create a new image element
        const imageElement = document.createElement('img');
        // You can set a default image URL or leave it blank
        imageElement.src = ''; // Set default or leave blank
        imageElement.alt = 'Selected Image';
        imageElement.classList.add('centered-image'); // Add a class for styling if needed

        // Create a new div element for the centered verse
        const centeredVerse = document.createElement('div');
        centeredVerse.classList.add('centered-verse'); // Add styling class if needed

        // Set the text properties
        centeredVerse.innerText = `${verseText} - ${verseInput}`;

        // Append the image and centered verse to the container
        containerDiv.appendChild(imageElement);
        containerDiv.appendChild(centeredVerse);

        // Append the container to the image container
        imageContainer.innerHTML = ''; // Clear existing content
        imageContainer.appendChild(containerDiv);
    } catch (error) {
        console.error('Error fetching and displaying verse:', error);
        // Handle error as needed, e.g., display an error message
    }
}

// Function to create image with verse
// function createImageWithVerse(imageUrl) {
//     // Clear existing content in the imageContainer
//     imageContainer.innerHTML = '';

//     // Create a new container div for the image and centered verse
//     const containerDiv = document.createElement('div');
//     containerDiv.classList.add('image-container'); // Add a class for styling if needed

//     // Create a new image element
//     const imageElement = document.createElement('img');
//     imageElement.src = imageUrl;
//     imageElement.alt = 'Selected Image';
//     imageElement.classList.add('centered-image'); // Add a class for styling if needed

//     // Create a new div element for the centered verse
//     const centeredVerse = document.createElement('div');
//     centeredVerse.classList.add('centered-verse'); // Add styling class if needed

//     // Set the text properties
//     centeredVerse.innerText = ''; // You can set default text or leave it blank

//     // Append the image and centered verse to the container
//     containerDiv.appendChild(imageElement);
//     containerDiv.appendChild(centeredVerse);

//     // Append the container to the image container
//     imageContainer.innerHTML = ''; // Clear existing content
//     imageContainer.appendChild(containerDiv);
// }

// Function to display image in the imageContainer
function displayImage(imageUrl) {
    // Clear existing content in the imageContainer
    imageContainer.innerHTML = '';

    // Create a new container div for the image
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('image-container'); // Add a class for styling if needed

    // Create a new image element
    const imageElement = document.createElement('img');

    // Validate the image URL before setting it
    validateImage(imageUrl)
        .then(() => {
            // If the image URL is valid, set it
            imageElement.src = imageUrl;
            imageElement.alt = 'Selected Image';
            imageElement.classList.add('centered-image'); // Add a class for styling if needed

            // Append the image to the container
            containerDiv.appendChild(imageElement);

            // Append the container to the image container
            imageContainer.appendChild(containerDiv);
        })
        .catch(() => {
            // Handle invalid image URL if needed
            console.error('Invalid image URL');
        });
}



