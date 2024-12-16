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

    // Function to create slideshow media elements
    function createSlideshow() {
        mediaArray.forEach((item, index) => {
            const ext = item.split('.').pop().toLowerCase(); // Get file extension to determine type
            let mediaElement;

            if (ext === 'mp4' || ext === 'mov' || ext === 'webm') {
                // If the media is a video
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
            const mediaElement = slide.querySelector('video, img'); // Select video or image element
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
    if (singleMediaArray.length > 0) {
        // Create a container to hold all media items on the same line
        const mediaRow = document.createElement('div');
        mediaRow.classList.add('media-row'); // Add a class for styling

        singleMediaArray.forEach(item => {
            const ext = item.split('.').pop().toLowerCase();
            let mediaElement;

            if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
                // If it's an image, create an <img> element
                mediaElement = document.createElement('img');
                mediaElement.src = item;
                mediaElement.classList.add('single-media');
            } else if (['mp4', 'mov', 'webm'].includes(ext)) {
                // If it's a video, create a <video> element
                mediaElement = document.createElement('video');
                mediaElement.src = item;
                mediaElement.controls = true;
                mediaElement.classList.add('single-media');
                mediaElement.loop = true; // Optionally loop the video
            }

            // Add the media element to the row
            if (mediaElement) {
                mediaRow.appendChild(mediaElement);
            }
        });
		
		// Append the media row to the container
        singleMediaContainer.appendChild(mediaRow);
    }

    // Display multiple media items in a row if 'singleMedia' parameter is set
    if (singleMediaArray2.length > 0) {
        // Create a container to hold all media items on the same line
        const mediaRow2 = document.createElement('div');
        mediaRow2.classList.add('media-row2'); // Add a class for styling

        singleMediaArray2.forEach(item => {
            const ext = item.split('.').pop().toLowerCase();
            let mediaElement;

            if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
                // If it's an image, create an <img> element
                mediaElement = document.createElement('img');
                mediaElement.src = item;
                mediaElement.classList.add('single-media2');
            } else if (['mp4', 'mov', 'webm'].includes(ext)) {
                // If it's a video, create a <video> element
                mediaElement = document.createElement('video');
                mediaElement.src = item;
                mediaElement.controls = true;
                mediaElement.classList.add('single-media2');
                mediaElement.loop = true; // Optionally loop the video
            } else if (['mp3', 'wav', 'ogg'].includes(ext)) {
                // If it's an audio, create a custom audio player with a play/pause button and volume control
                mediaElement = document.createElement('audio');
                mediaElement.src = item;
                mediaElement.controls = false; // Disable default controls to customize it
                mediaElement.classList.add('single-media');

                // Create custom controls
                const audioContainer = document.createElement('div');
                audioContainer.classList.add('audio-container');
                
                // Play/Pause Button
                const playPauseBtn = document.createElement('button');
                playPauseBtn.textContent = 'Play';
                playPauseBtn.classList.add('play-pause-btn');
                playPauseBtn.addEventListener('click', function() {
                    if (mediaElement.paused) {
                        mediaElement.play();
                        playPauseBtn.textContent = 'Pause';
                    } else {
                        mediaElement.pause();
                        playPauseBtn.textContent = 'Play';
                    }
                });

                // Volume Slider
                const volumeSlider = document.createElement('input');
                volumeSlider.type = 'range';
                volumeSlider.min = '0';
                volumeSlider.max = '1';
                volumeSlider.step = '0.01';
                volumeSlider.value = '1';
                volumeSlider.classList.add('volume-slider');
                volumeSlider.addEventListener('input', function() {
                    mediaElement.volume = volumeSlider.value;
                });

                // Progress Bar
                const progressBar = document.createElement('input');
                progressBar.type = 'range';
                progressBar.min = '0';
                progressBar.max = '100';
                progressBar.value = '0';
                progressBar.classList.add('progress-bar');
                mediaElement.addEventListener('timeupdate', function() {
                    progressBar.value = (mediaElement.currentTime / mediaElement.duration) * 100;
                });
                progressBar.addEventListener('input', function() {
                    mediaElement.currentTime = (progressBar.value / 100) * mediaElement.duration;
                });

                // Append controls and the audio element to the container
                audioContainer.appendChild(playPauseBtn);
                audioContainer.appendChild(volumeSlider);
                audioContainer.appendChild(progressBar);
                audioContainer.appendChild(mediaElement);

                // Append the container to the row
                mediaRow2.appendChild(audioContainer);
            }

            // Add the media element to the row
            if (mediaElement) {
                mediaRow2.appendChild(mediaElement);
            }
        });

        // Append the media row to the container
        singleMediaContainer2.appendChild(mediaRow2);
    }

    console.log(title, tag, media, text);
});
