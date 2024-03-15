document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired!');

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
    console.log(personId)
    console.log('counter:', counter)
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
               console.log('fetch person data:', personInfo); 
               //fetch the music piece ID
               const musicPieceId = personInfo.music_piece_id;
               console.log('persons music piece Id:', musicPieceId)
               return musicPieceId;
           } catch (error) {
               console.error('Error fetching person information:', error);
               throw error;
           }
       }

//fetch the information about the music piece of a person
async function fetchMusicPieceInfo(personId){
    const pieceId = await fetchPersonsMusicPieceId(personId);
    console.log('music piece ID:', pieceId)
    //fetch info about a music piece with a current pieceId
    try {const response = await fetch(`../backend/music_pieces.json`);
    const musicPiecesInfo = await response.json();
    console.log ('music pieces info:', musicPiecesInfo)
    const musicPieceInfo = musicPiecesInfo.music_pieces[pieceId-1];
    console.log('music piece info:', musicPieceInfo)
    return musicPieceInfo;
} catch (error) {
    console.error('Error fetching music pieces info:', error);
    throw error;
} 
}

// Attach click event listener to the carousel slide
carouselSlide.addEventListener('click', handleImageClick);

// Function to handle image click event
function handleImageClick(event) {
    const image = event.target;
    const personId = image.dataset.personId;
    console.log ('person Id from event.target:', personId)
    fetchMusicPieceInfo(personId)
        .then(musicPieceInfo =>{
            console.log('music piece info:', musicPieceInfo);
            console.log('spotify Id:', musicPieceInfo.spotify_id)
            //  Redirect to the piece_page with the information about the piece
                window.location.href = `piece_page.html?title=${encodeURIComponent(musicPieceInfo.title)}&composer=${encodeURIComponent(musicPieceInfo.composer)}&id=${encodeURIComponent(musicPieceInfo.spotify_id)}`;
                 })
        .catch(error=>{
            console.error('error fetching music piece info:', error);
        })
    } 
})

