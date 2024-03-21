// **************index.js************
document.addEventListener('DOMContentLoaded', function() {
    
    const playButton = document.getElementById('button');

playButton.addEventListener('click', ()=>{
    window.location.href = 'famous_people.html';
});

//************famous-people.js***************
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

//--------Taking care of Buttons on the carousel

//Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//Counter
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

//Button listeners

nextBtn.addEventListener('click', ()=>{
    console.log('next button clicked')
    if(counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});  

prevBtn.addEventListener('click', ()=>{
    if(counter <= 0) return;
    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
})

carouselSlide.addEventListener('transitionend', ()=>{
    const personId = carouselImages[counter].getAttribute('data-person-id');
    if(personId === '20'){
        carouselSlide.style.transition = 'none';
        counter = 1;
        // counter = carouselImages.length -2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if(personId === '0'){
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length-3;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
})

//-----Image click------

//fetch info about the famous person
async function fetchPersonsMusicPieceId(personId) {
    try {
        // Fetch person information
        const response = await fetch(`../backend/famous_people.json`);
        const data = await response.json(); 
               // Find the person with the specified personId
               const personInfo = data.famous_people.find(person => person.id === parseInt(personId));

               if (!personInfo) {
                   throw new Error(`Person with id ${personId} not found.`);
               }
               //fetch the music pieces IDs (array of ids)
               const musicPieceId = personInfo.music_piece_id;
               console.log(musicPieceId)
               const randomIndex = Math.floor(Math.random() * musicPieceId.length);
               console.log(randomIndex)
               const randomPiece = musicPieceId[randomIndex];
               console.log(randomPiece);
               return randomPiece;
           } catch (error) {
               console.error('Error fetching person information:', error);
               throw error;
           }
       }

//fetch the information about the music piece of a person
async function fetchMusicPieceInfo(personId){
    const pieceId = await fetchPersonsMusicPieceId(personId);
    //fetch info about a music piece with a current pieceId
    try {const response = await fetch(`../backend/music_pieces.json`);
    const musicPiecesInfo = await response.json();
    console.log(musicPiecesInfo);
    const musicPieceInfo = musicPiecesInfo.music_pieces[pieceId-1];
    return musicPieceInfo;
} catch (error) {    console.error('Error fetching music pieces info:', error);
    throw error;
} 
}

// Attach click event listener to the carousel slide
carouselSlide.addEventListener('click', handleImageClick);

// Function to handle image click event
function handleImageClick(event) {
    const image = event.target;
    const personId = image.dataset.personId;
    fetchMusicPieceInfo(personId)
        .then(musicPieceInfo =>{
            //  Redirect to the piece_page with the information about the piece
                window.location.href = `piece_page.html?title=${encodeURIComponent(musicPieceInfo.title)}&composer=${encodeURIComponent(musicPieceInfo.composer)}&id=${encodeURIComponent(musicPieceInfo.spotify_id)}`;
                 })
        .catch(error=>{
            console.error('error fetching music piece info:', error);
        })
    } 
// ***********piece_page.js***************

    // Read parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const spotifyId = urlParams.get('id');
    console.log('spotify Id:', spotifyId)
    const title = urlParams.get('title');
    const composer = urlParams.get('composer');
    const backButton = document.getElementById('backButton');
  
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

})
