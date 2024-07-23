
// Function to change the giscus theme based on the current blog theme
function setGiscusTheme(theme) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (iframe) {
        // Send a message to the giscus iframe to change the theme
        iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: theme } } }, 'https://giscus.app');
    }
}

// Function to detect and apply the current theme
function applyTheme() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const giscusTheme = isDarkMode ? 'dark' : 'light';
    setGiscusTheme(giscusTheme);
}

// Listen for changes in the theme
const observer = new MutationObserver(applyTheme);
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

// Apply the theme on initial load
applyTheme();

