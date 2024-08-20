document.addEventListener("DOMContentLoaded", function() {
  // Find all images within <p> tags with .content class
  const images = document.querySelectorAll('.content p img');

  images.forEach(img => {
    // Default margin if the alt text does not include a pipe character
    let caption = img.alt;
    let margin = '700';
    
    if (img.alt.includes('|')) {
      [caption, margin] = img.alt.split('|').map(item => item.trim());
    }

    // Calculate margins
    const marginValue = parseInt(margin, 10) || 0; // Ensure margin is a number
    const marginPercent = (1 - (marginValue / 700)) / 2 * 100;
    const marginLarge = `calc(${marginPercent}%)`;
    const marginMedium = `calc(${0.5 * marginPercent}%)`;
    const marginSmall = `0%`;

    // Apply styles for different screen sizes
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @media (max-width: 1600px) {
          img[data-custom="${marginValue}"] {
              margin-left: ${marginLarge} !important;
              margin-right: ${marginLarge} !important;
              width: calc(100% - 2 * ${marginLarge}) !important;
          }
          .image-caption[data-custom="${marginValue}"] {
              right: ${marginLarge} !important;
          }
      }
      @media (max-width: 1200px) {
          img[data-custom="${marginValue}"] {
              margin-left: ${marginMedium} !important;
              margin-right: ${marginMedium} !important;
              width: calc(100% - 2 * ${marginMedium}) !important;
          }
          .image-caption[data-custom="${marginValue}"] {
              right: ${marginMedium} !important;
          }
      }
      @media (max-width: 900px) {
          img[data-custom="${marginValue}"] {
              margin-left: ${marginSmall} !important;
              margin-right: ${marginSmall} !important;
              width: calc(100% - 2 * ${marginSmall}) !important;
          }
          .image-caption[data-custom="${marginValue}"] {
              right: ${marginSmall} !important;
          }
      }
    `;
    document.head.appendChild(styleElement);

    // Set custom data attribute to ensure targeting
    img.setAttribute('data-custom', marginValue);

    // Set initial styles for the image
    img.style.borderRadius = "10px";
    img.style.display = "block";
    img.style.position = "relative";
    img.style.transition = "opacity 0.8s cubic-bezier(0, 0, 0, 1) 0.25s, transform 0.8s cubic-bezier(0, 0, 0, 1) 0.25s";
    img.style.opacity = "0";
    img.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 60, 0, 1)";

    // Create caption element
    const captionElement = document.createElement('div');
    captionElement.innerText = caption;
    captionElement.style.position = "absolute";
    captionElement.style.top = "10px";
    captionElement.style.right = `${marginLarge}`; // Initially set to large margin
    captionElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    captionElement.style.color = "white";
    captionElement.style.padding = "5px";
    captionElement.style.borderRadius = "3px";
    captionElement.style.fontSize = "12px";
    captionElement.style.opacity = "0";
    captionElement.style.transition = "opacity 0.3s ease";
    captionElement.style.pointerEvents = "none";
    captionElement.setAttribute('data-custom', marginValue);

    // Insert caption into the parent <p> element
    img.parentElement.style.position = "relative";
    img.parentElement.appendChild(captionElement);

    // Add hover effect for the caption
    img.addEventListener("mouseenter", function() {
      captionElement.style.opacity = "1";
    });

    img.addEventListener("mouseleave", function() {
      captionElement.style.opacity = "0";
    });

    // Set up Intersection Observer to animate images on scroll
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.style.opacity = "1";
          img.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
        } else {
          img.style.opacity = "0";
          img.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 60, 0, 1)";
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(img);
  });
});
