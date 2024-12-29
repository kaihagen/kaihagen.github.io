document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    const tag = params.get("tag");
    const text = params.get("text");
    const paragraph2 = params.get("paragraph2");
    const paragraph = params.get("paragraph");
    const media = params.get("media"); // Get the media list for slideshow
    const singleMedia = params.get("singleMedia"); // Get the media list for single media display
    const singleMedia2 = params.get("singleMedia2"); // Get the media list for single media display
    const mediaArray = media ? media.split(",") : []; // Split the media list into an array for slideshow
    const singleMediaArray = singleMedia ? singleMedia.split(",") : []; // Split the media list into an array for single media
    const singleMediaArray2 = singleMedia2 ? singleMedia2.split(",") : []; // Split the media list into an array for single media

    const slideshowContainer = document.getElementById("slideshowContainer");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const singleMediaContainer = document.getElementById("singleMediaContainer"); // Container for single media items
    const singleMediaContainer2 = document.getElementById("singleMediaContainer2"); // Container for single media items

    let currentSlideIndex = 0;

    // Update project title and other details
    document.getElementById("projectTitle").textContent = title;
    document.getElementById("projectTag").textContent = tag;
    document.getElementById("projectText").textContent = text;
    document.getElementById("projectParagraph2").textContent = paragraph2;
    document.getElementById("projectParagraph").textContent = paragraph;

    // Extract width and height from URL parameters
    const width = '100%';  // Default to 2000 if not provided
    const height = '460'; // Default to 1000 if not provided

    function createSlideshow() {
        mediaArray.forEach((item, index) => {
            const ext = item.split('.').pop().toLowerCase(); // Get file extension to determine type
            let mediaElement;

            // Check if the item is a YouTube link
            if (item.includes('youtube.com') || item.includes('youtu.be')) {
                // Extract the video ID from the YouTube URL
                const videoId = item.split('v=')[1]?.split('&')[0] || item.split('/').pop();
                
                // Debug: log the videoId, width, and height
                console.log('Video ID:', videoId, 'Width:', width, 'Height:', height);

                // Create an iframe element to embed the YouTube video
                mediaElement = document.createElement('iframe');
                mediaElement.src = 'https://www.youtube.com/embed/' + videoId;
                mediaElement.width = width;  // Set the width dynamically
                mediaElement.height = height; // Set the height dynamically
                mediaElement.frameBorder = "0";
				mediaElement.style.border = 'none';
				mediaElement.style.outline = 'none';
                mediaElement.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
                mediaElement.allowFullscreen = true;
                mediaElement.classList.add('slideshow-media');
            } else if (ext === 'mp4' || ext === 'mov' || ext === 'webm') {
                // If the media is a video file (local file)
                mediaElement = document.createElement('video');
                mediaElement.src = item;
                mediaElement.controls = true;
                mediaElement.classList.add('slideshow-media');
                mediaElement.loop = true; // Loop video
            } else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
                // If the media is an image
                mediaElement = document.createElement('img');
                mediaElement.src = item;
                mediaElement.classList.add('slideshow-media');
            }
                
            mediaElement.style.width = width + 'px';
            mediaElement.style.height = height + 'px';

            const slideDiv = document.createElement('div');
            slideDiv.classList.add('slide');
            slideDiv.appendChild(mediaElement);
            slideshowContainer.appendChild(slideDiv);
        });

        // Show the first slide
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            slides[0].style.display = 'block'; // Show the first slide
            playCurrentSlide(slides[0]); // Play the first slide's media (if applicable)
        }

        // Function to play media in the current slide (for autoplay)
        function playCurrentSlide(slide) {
            const mediaElement = slide.querySelector('video, iframe'); // Select video or iframe element
            if (mediaElement && mediaElement.tagName.toLowerCase() === 'video') {
                mediaElement.play(); // Autoplay the video if it's the current slide
            }
        }

        // Function to stop media when it's not the current slide
        function stopCurrentSlide(slide) {
            const mediaElement = slide.querySelector('video');
            if (mediaElement) {
                mediaElement.pause(); // Pause video when the slide is not visible
            }
        }

        // Show the next slide
        function showSlide(index) {
            const slides = document.querySelectorAll('.slide');
            slides.forEach(slide => slide.style.display = 'none'); // Hide all slides

            if (slides.length > 0) {
                slides[index].style.display = 'block'; // Show the current slide
                playCurrentSlide(slides[index]); // Play the media of the current slide
            }
        }

        // Next Button
        nextBtn.addEventListener('click', () => {
            const slides = document.querySelectorAll('.slide');
            stopCurrentSlide(slides[currentSlideIndex]); // Stop current slide's media
            currentSlideIndex = (currentSlideIndex + 1) % mediaArray.length; // Loop back to the first slide
            showSlide(currentSlideIndex);
        });

        // Previous Button
        prevBtn.addEventListener('click', () => {
            const slides = document.querySelectorAll('.slide');
            stopCurrentSlide(slides[currentSlideIndex]); // Stop current slide's media
            currentSlideIndex = (currentSlideIndex - 1 + mediaArray.length) % mediaArray.length; // Loop back to the last slide
            showSlide(currentSlideIndex);
        });

        // Autoplay (only autoplay the current slide)
        setInterval(function() {
            const slides = document.querySelectorAll('.slide');
            stopCurrentSlide(slides[currentSlideIndex]); // Stop current slide's media
            currentSlideIndex = (currentSlideIndex + 1) % mediaArray.length; // Loop through slides
            showSlide(currentSlideIndex); // Show next slide
        }, 5000000); // Change slide every 5 seconds
    }

    // Create the slideshow
    createSlideshow();

    // Display multiple media items in a row if 'singleMedia' parameter is set
    function displaySingleMedia(mediaArray, container) {
        const mediaRow = document.createElement('div');
        mediaRow.classList.add('media-row'); // Add a class for styling

        mediaArray.forEach(item => {
            const ext = item.split('.').pop().toLowerCase();
            let mediaElement;

            if (item.includes('soundcloud.com')) {
                // If the media is a SoundCloud track
                const trackId = item.split('/').pop(); // Extract track ID from the URL
                mediaElement = document.createElement('iframe');
                mediaElement.src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + trackId + '&auto_play=false&hide_related=false&visual=true';
                mediaElement.frameBorder = '0';
                mediaElement.width = '100%';
                mediaElement.height = '166';
                mediaElement.classList.add('soundcloud-player');
            } else if (['mp4', 'mov', 'webm'].includes(ext)) {
                // If the media is a video file
                mediaElement = document.createElement('video');
                mediaElement.src = item;
                mediaElement.controls = true;
                mediaElement.classList.add('single-media');
                mediaElement.loop = true;
            } else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
                // If it's an image
                mediaElement = document.createElement('img');
                mediaElement.src = item;
                mediaElement.classList.add('single-media');
            }

            if (mediaElement) {
                mediaRow.appendChild(mediaElement);
            }
        });

        // Append the media row to the container
        container.appendChild(mediaRow);
    }

    // Display single media for singleMedia
    if (singleMediaArray.length > 0) {
        displaySingleMedia(singleMediaArray, singleMediaContainer);
    }

    // Display single media for singleMedia2
    if (singleMediaArray2.length > 0) {
        displaySingleMedia(singleMediaArray2, singleMediaContainer2);
    }

    console.log(title, tag, media, text);
});
