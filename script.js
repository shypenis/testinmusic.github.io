const songlist = [
    {
        name: "here be monsters",
        artist: "Ed Harcourt",
        src: "assets/1.mp3",
        cover: "assets/1.jpg"
    },
    {
        name: "boys don't cry",
        artist: "The cure",
        src: "assets/2.mp3",
        cover: "assets/2.jpg"
    },
    {
        name: "somewhere only we know",
        artist: "Kean",
        src: "assets/3.mp3",
        cover: "assets/3.jpg"
    },
    {
        name: "ode to the mets",
        artist: "The Strokes",
        src: "assets/4.mp3",
        cover: "assets/4.jpg"
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover'); // Remove the dot before 'cover'
const playBtn = document.getElementById('play'); // Remove the dot before 'play'
const prevBtn = document.getElementById('prev'); // Remove the dot before 'prev'
const nextBtn = document.getElementById('next'); // Remove the dot before 'next'
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false; // Corrected spelling of 'false'

document.addEventListener('DOMContentLoaded', () =>{
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateprogress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index){
    const { name, artist, src, cover: thumb } = songlist[index]; // Corrected variable name to 'songlist'
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateprogress(){
    if(song.duration){
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formaletime(song.duration);
        const currentTime = formaletime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formaletime(seconds){
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Removed space before `${secs}`
}

function togglePlayPause(){
    if(playing){
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing); // Corrected class name to 'fa-pause'
    playBtn.classList.toggle('fa-play', !playing); // Corrected class name to 'fa-play'
    cover.classList.toggle('active', playing);
}

function nextSong(){
    currentSong = (currentSong + 1) % songlist.length; // Corrected variable name to 'songlist'
    playMusic();
}

function prevSong(){
    currentSong = (currentSong - 1 + songlist.length) % songlist.length; // Corrected variable name to 'songlist'
    playMusic();
}

function playMusic(){
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause'); // Corrected class name to 'fa-pause'
    playBtn.classList.remove('fa-play'); // Corrected class name to 'fa-play'
    cover.classList.add('active');
}

function seek(e){
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}