function loadGallery(jsonPath) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(posts => {
      const gallery = document.getElementById('gallery');
      posts.sort((a,b) => new Date(b.date) - new Date(a.date));

      posts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        const carousel = document.createElement('div');
        carousel.className = 'carousel';

        // Helper to create the right media element
        function createMediaElement(item) {
  const url = post.folder + item.file;
  if (item.type === 'video' || url.endsWith('.mp4') || url.endsWith('.mov')) {
    const video = document.createElement('video');
    video.src = url;
    video.autoplay = true;
    video.loop = true;
    video.muted = true; // required for autoplay on most browsers
    video.playsInline = true; // keeps it from going fullscreen on mobile
    video.preload = "metadata";
    video.style.width = "100%";
    video.style.height = "auto"; // don't crop
    video.style.objectFit = "contain"; // show full video, letterbox if needed
    return video;
  } else {
    const img = document.createElement('img');
    img.src = url;
    img.alt = "";
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.objectFit = "contain";
    return img;
  }
}


        // Create initial media
        let index = 0;
        let currentMedia = createMediaElement(post.media[0]);
        currentMedia.dataset.index = 0;
        carousel.appendChild(currentMedia);

        // Add carousel buttons if multiple media items
        if (post.media.length > 1) {
          const prev = document.createElement('button');
          prev.className = 'prev';
          prev.textContent = '‹';
          const next = document.createElement('button');
          next.className = 'next';
          next.textContent = '›';

          prev.addEventListener('click', () => changeMedia(-1));
          next.addEventListener('click', () => changeMedia(1));

          carousel.appendChild(prev);
          carousel.appendChild(next);
        }

        function changeMedia(direction) {
          index = (index + direction + post.media.length) % post.media.length;
          const newMedia = createMediaElement(post.media[index]);

          // Replace current media element
          carousel.replaceChild(newMedia, currentMedia);
          currentMedia = newMedia;
        }

        postDiv.appendChild(carousel);

        const caption = document.createElement('p');
        caption.className = 'caption';
        caption.textContent = post.caption;
        postDiv.appendChild(caption);

        const date = document.createElement('p');
        date.className = 'date';
        date.textContent = new Date(post.date).toLocaleDateString();
        postDiv.appendChild(date);

        gallery.appendChild(postDiv);
      });
    });
}
