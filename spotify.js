console.log("welcome");

//Initialize the Variables
let songIndex= 0;
let audioElement= new Audio();
let randomElement= new Audio();
let imgElement= new Image();
let masterPlay= document.getElementById('masterPlay');
let myProgressBar= document.getElementById('myProgressBar');
let songInfo= document.getElementById('songInfo1');
let masterSongName= document.getElementById('masterSongName');
let songTime= document.getElementById('songTime');

let songs= [
    {songName: "Cupid", filepath: "assets/0.mp3", coverPath: "assets/cupid.png"},
    {songName: "Tot Musica", filepath: "assets/1.mp3", coverPath: "assets/Tot Musica.png"},
    {songName: "At My Worst", filepath: "assets/2.mp3", coverPath: "assets/at my worst.png"},
    {songName: "Fairytale", filepath: "assets/3.mp3", coverPath: "assets/fairytale.png"},
    {songName: "Steal My Girl", filepath: "assets/4.mp3", coverPath: "assets/steal my girl.png"},
    {songName: "Wellerman", filepath: "assets/5.mp3", coverPath: "assets/wellerman.png"},
    {songName: "Suzume No Tojimari", filepath: "assets/6.mp3", coverPath: "assets/suzume no tojimari.png"},
    {songName: "Again", filepath: "assets/7.mp3", coverPath: "assets/again.png"},
    {songName: "Golden Hour", filepath: "assets/8.mp3", coverPath: "assets/golden hour.png"},
    {songName: "Unravel", filepath: "assets/9.mp3", coverPath: "assets/unravel.png"},
    {songName: "New Genesis", filepath: "assets/10.mp3", coverPath: "assets/new genesis.png"},
    {songName: "Bink's Sake", filepath: "assets/11.mp3", coverPath: "assets/binks brew for trevor.png"},
    {songName: "Hoist The Colours", filepath: "assets/12.mp3", coverPath: "assets/hoist the colours.png"},
    {songName: "Mockingbird", filepath: "assets/13.mp3", coverPath: "assets/mockingbird.png"},
    {songName: "Bones", filepath: "assets/14.mp3", coverPath: "assets/bones.png"},
    {songName: "Just You And I", filepath: "assets/15.mp3", coverPath: "assets/just you and i.png"},
    {songName: "Me And My Broken Heart", filepath: "assets/16.mp3", coverPath: "assets/me and my broken heart.png"}
]

// Handle play/pause click

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value= progress;
    
    let currentMinutes = Math.floor(audioElement.currentTime / 60);
    let currentSeconds = Math.floor(audioElement.currentTime % 60);

    // Add leading zeros to the minutes and seconds for formatting
    currentMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
    currentSeconds = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds;

    // Set the live duration text in the liveDuration element
    songTime.textContent = currentMinutes + ':' + currentSeconds;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime= myProgressBar.value * audioElement.duration/100;
})

Array.from(document.getElementsByClassName('song')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = parseInt(e.target.id);
        e.target.classList.remove('clickBar');
        e.target.classList.add('clickBar');
        audioElement.src= `assets/${index}.mp3`;
        masterSongName.innerText= songs[index].songName;
        document.getElementById('coverImage').src = songs[index].coverPath;
        audioElement.currentTime= 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(index>=16){
        index= 0;
    }
    else{
        index+= 1;
    }
    audioElement.src= `assets/${index}.mp3`;
    masterSongName.innerText= songs[index].songName;
    document.getElementById('coverImage').src = songs[index].coverPath;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

document.getElementById('prev').addEventListener('click', ()=>{
    if(index<=0){
        index= 16;
    }
    else{
        index-= 1;
    }
    audioElement.src= `assets/${index}.mp3`;
    masterSongName.innerText= songs[index].songName;
    document.getElementById('coverImage').src = songs[index].coverPath;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

// Event listener for the spacebar key press
document.addEventListener('keydown', (event) => {
    // Check if the pressed key is the spacebar
    if(event.code === 'Space'){
      // Check if the audio is currently playing
      if(!audioElement.paused && audioElement.currentTime > 0){
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
      } 
      else{
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
      }
    };

    if(event.code === 'ArrowRight'){
        if(index>=16){
            index= 0;
        }
        else{
            index+= 1;
        }
        audioElement.src= `assets/${index}.mp3`;
        masterSongName.innerText= songs[index].songName;
        document.getElementById('coverImage').src = songs[index].coverPath;
        audioElement.currentTime= 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    };

    if(event.code === 'ArrowLeft'){
        if(index<=0){
            index= 16;
        }
        else{
            index-= 1;
        }
        audioElement.src= `assets/${index}.mp3`;
        masterSongName.innerText= songs[index].songName;
        document.getElementById('coverImage').src = songs[index].coverPath;
        audioElement.currentTime= 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    }
  });

  // Event listener for the audio ended event
audioElement.addEventListener('ended', () => {
    // Trigger the logic to play the next song (same as clicking the "Next" button)
    if (index >= 16) {
      index = 0;
    } else {
      index += 1;
    }
    audioElement.src = songs[index].filepath;
    masterSongName.innerText = songs[index].songName;
    document.getElementById('coverImage').src = songs[index].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
  });