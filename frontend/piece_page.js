document.addEventListener('DOMContentLoaded', function() {
    // Read parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const spotifyId = urlParams.get('id');
    console.log('spotify Id:', spotifyId)
    const title = urlParams.get('title');
    const composer = urlParams.get('composer');
    const backButton = this.getElementById('backButton');
  
    // Fetch music pieces information based on the person's years of living

    const displayElement = document.getElementById('pieceInfo');

    // Display information about the person and the selected music piece
    displayElement.innerHTML = `
        <p>Title: ${title}</p>
        <p>Composer: ${composer}</p>
    `;
    // Construct the Spotify embed URL with the dynamic track ID
    const embedUrl = `https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`;

    // Set the src attribute of the iframe to the dynamically constructed URL
    document.getElementById("spotify-embed").src = embedUrl;

    backButton.addEventListener ('click', function() {
        window.location.href = 'famous_people.html';
    })
});



