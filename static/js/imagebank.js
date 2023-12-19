// imagebank.js - for managing background thumbnails on start page

document.addEventListener('DOMContentLoaded', function () {
    const imageBank = document.getElementById('image-bank');
    const imageContainer = document.getElementById('imageContainer');

    // URL of the GitHub repository containing images
    const githubRepoUrl = 'https://raw.githubusercontent.com/jwelkener/InstaBible2/9e37aaa1fac8e22d801b1f86f7237042cf714c40/static/images/';

    // Array of image paths
    const imagePaths = [
        'alexander-grey-jYbKxinWQGk-unsplash.jpg',
        'artur-luczka-loAfOVk1eNc-unsplash.jpg',
        'blue-gradient-square.png',
        'daniel-leone-g30P1zcOzXo-unsplash.jpg',
        'darkblue-square.png',
        'dave-hoefler-lsoogGC_5dg-unsplash.jpg',
        'david-marcu-78A265wPiO4-unsplash.jpg',
        'davies-designs-studio-_UCVrH-ZIIg-unsplash.jpg',
        'eberhard-grossgasteiger-S-2Ukb_VqpA-unsplash.jpg',
        'eberhard-grossgasteiger-y2azHvupCVo-unsplash.jpg',
        'goutham-krishna-h5wvMCdOV3w-unsplash.jpg',
        'green-square.png',
        'guillaume-briard-lSXpV8bDeMA-unsplash.jpg',
        'j-lee-5WFfI63aEBo-unsplash.jpg',
        'janke-laskowski-jz-ayLjk2nk-unsplash.jpg',
        'jonatan-pie-EvKBHBGgaUo-unsplash.jpg',
        'lightblue-square.png',
        'lightpurple-square.png',
        'mads-schmidt-rasmussen-xfngap_DToE-unsplash.jpg',
        'matthew-mcbrayer-qD9xzm7yK9U-unsplash.jpg',
        'micah-boswell-OPnBJ5L2oxs-unsplash.jpg',
        'nareeta-martin-pEWtWnDgGLs-unsplash.jpg',
        'orange-square.png',
        'pink-square.png',
        'purple-pink-square.png',
        'purple-square.png',
        'qingbao-meng-01_igFr7hd4-unsplash.jpg',
        'red-orange-square.png',
        'red-square.png',
        'resul-mentes-DbwYNr8RPbg-unsplash.jpg',
        'rohit-ranwa-twEy5TouJLg-unsplash.jpg',
        'sam-dan-truong-ju2NgSoR6pA-unsplash.jpg',
        'shifaaz-shamoon-9K9ipjhDdks-unsplash.jpg',
        'steffi-Cj0tPzC5Uic-unsplash.jpg',
        'teemu-paananen-OOE4xAnBhKo-unsplash.jpg',
        'white-square.png',
        'yellow-square.png'
    ];

    // Shuffle the array to get random images
    const shuffledImages = shuffleArray(imagePaths);

    // Display all available images
    const imagesToDisplay = shuffledImages.slice(0, 12);

	 // Create a row container
	 let currentRow = document.createElement('div');
	 currentRow.className = 'image-row';

    // Iterate through the array of image paths
    for (let i = 0; i < imagesToDisplay.length; i++) {
        const imageUrl = `${githubRepoUrl}${imagesToDisplay[i]}`;

        // Create an image element
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = `Image ${i + 1}`;

        // Set the width of the image to 140 pixels
        imageElement.style.width = '140px';
        imageElement.style.height = '140px';

        // Add click event listener to display the clicked image in the imageContainer
        imageElement.addEventListener('click', function () {
            displayClickedImage(imageUrl);
        });

        /// Append the image to the current row
        currentRow.appendChild(imageElement);

        // Create a new row after every 4 images
        if ((i + 1) % 4 === 0 || i === imagesToDisplay.length - 1) {
    
			// Append the current row to the imageContainer
            imageBank.appendChild(currentRow);

            // Create a new row for the next set of images
            currentRow = document.createElement('div');

			// Apply the image-row class to the current row (for styling)
            currentRow.className = 'image-row';
        }
    }

    function displayClickedImage(imageURL) {
		// Create an image element for the clicked image
		const clickedImageElement = document.createElement('img');
		clickedImageElement.src = imageURL;
		clickedImageElement.alt = 'Clicked Image';
	
		// Set the width of the clicked image to fit the container
		clickedImageElement.style.width = '100%';
	
		// Clear previous content and append the clicked image
		// imageContainer.innerHTML = ''; 
		// imageContainer.appendChild(clickedImageElement);

		// Set the clicked image URL as the value of the form field
		const imageInput = document.getElementById('imageInput');
		if (imageInput) {
			imageInput.value = imageURL;
		}
	}
	
});


// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
