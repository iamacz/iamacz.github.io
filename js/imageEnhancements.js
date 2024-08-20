document.addEventListener("DOMContentLoaded", function() {
  // Find all images within <p> tags with .content class
  const images = document.querySelectorAll('.content p img');

  images.forEach(img => {
    // Default margin if the alt text does not include a pipe character
    let caption = img.alt;
    let margin = '0';

    if (img.alt.includes('|')) {
      [caption, margin] = img.alt.split('|').map(item => item.trim());
    }

    // Check if the caption is empty
    const hideCaption = caption === '';

    // Calculate margins
    const marginValue = parseInt(margin, 10) || 0; // Ensure margin is a number
    const marginPercent = (1 - (marginValue / 700)) / 2 * 100;
    const marginLarge = marginPercent + "%";
    const marginMedium = (0.5 * marginPercent) + "%";
    const marginSmall = "0%";

    // Apply initial styles
    img.style.borderRadius = "10px";
    img.style.display = "block";
    img.style.position = "relative";

    let captionElement;
    if (!hideCaption) {
      // Create caption element only if there's text
      captionElement = document.createElement('div');
      captionElement.innerText = caption;
      captionElement.style.position = "absolute";
      captionElement.style.top = "0";  // Positioning caption at the top of the image
      captionElement.style.right = `${marginLarge}`;
      captionElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      captionElement.style.color = "white";
      captionElement.style.padding = "5px";
      captionElement.style.borderRadius = "3px";
      captionElement.style.fontSize = "12px";
      captionElement.style.opacity = "0";
      captionElement.style.transition = "opacity 0.3s ease";
      captionElement.style.pointerEvents = "none";

      // Insert caption into the parent <p> element
      img.parentElement.style.position = "relative";
      img.parentElement.appendChild(captionElement);
    }

    // Dynamically adjust image and caption margins based on screen width
    function adjustMargins() {
      const screenWidth = window.innerWidth;
      let currentMargin, currentMarginValue;

      if (screenWidth <= 900) {
        currentMargin = marginSmall;
        currentMarginValue = 0;
      } else if (screenWidth <= 1200) {
        currentMargin = marginMedium;
        currentMarginValue = 0.5 * marginPercent;
      } else {
        currentMargin = marginLarge;
        currentMarginValue = marginPercent;
      }

      // Apply the margins to the image and caption
      img.style.marginLeft = currentMargin;
      img.style.marginRight = currentMargin;
      img.style.width = `calc(100% - 2 * ${currentMarginValue}%)`;

      if (!hideCaption) {
        captionElement.style.right = currentMargin; // Caption aligns with image margin
        captionElement.style.top = "0"; // Ensure caption is at the top of the image
      }
    }

    // Initial adjustment on page load
    adjustMargins();

    // Adjust margins on window resize
    window.addEventListener('resize', adjustMargins);

    // Add hover effect for the caption
    if (!hideCaption) {
      img.addEventListener("mouseenter", function() {
        captionElement.style.opacity = "1";
      });

      img.addEventListener("mouseleave", function() {
        captionElement.style.opacity = "0";
      });
    }
  });
});
