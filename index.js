console.log('Spotify Clone');

// Initialise the variable
let songIndex = 0;
let audioElement = new Audio('Excuses.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: 'Desires', filePath: '1.mp3', imagePath: 'Desires.jpg' },
    { songName: 'Excuses', filePath: '2.mp3', imagePath: 'Excuses.jpg' },
    { songName: 'Ma Belle', filePath: '3.mp3', imagePath: 'MaBelle.jpg' },
    { songName: ' Brown Munde', filePath: '4.mp3', imagePath: 'BrownMunde.jpg' },
    { songName: 'Insane', filePath: '5.mp3', imagePath: '4.jpg' },
    { songName: 'Tere Te', filePath: '6.mp3', imagePath: 'TereTe.jpg' }
]

songItem.forEach((ele, i) => {
    console.log(ele, i);
    ele.getElementsByTagName('img')[0].src = songs[i].imagePath;
    ele.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})



// Handle Play Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    // update the seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        gif.style.opacity = 1;
        audioElement.play();
        masterPlay.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    audioElement.play();
    // masterPlay.classList.add('fa-circle-pause');
    // masterPlay.classList.remove('fa-circle-play');
    // masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');

})