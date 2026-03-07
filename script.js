// Clock & greeting
function updateTime() {
    const now = new Date();
    const h = now.getHours();

    const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    document.getElementById('greeting').textContent = `${greeting}, Martin`;

    document.getElementById('clock').textContent =
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('date').textContent =
        now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}
setInterval(updateTime, 1000);
updateTime();

// Hacker News ticker
async function fetchNews() {
    try {
        const rssUrl = encodeURIComponent('https://news.ycombinator.com/rss');
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
        const data = await res.json();

        const track = document.getElementById('ticker-track');
        track.innerHTML = data.items
            .map(item => `<a href="${item.link}" target="_blank">${item.title}</a>`)
            .join('');

        // Scale animation duration to content length for consistent scroll speed
        const duration = Math.max(40, data.items.length * 6);
        track.style.animationDuration = `${duration}s`;
    } catch {
        document.getElementById('ticker-track').textContent = 'News feed temporarily offline';
    }
}
fetchNews();
