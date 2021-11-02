var video = document.getElementById('video')
var playBtn = document.querySelector('.play-pause')
var timeBar = document.querySelector('.time-bar')
var volume = document.querySelector('.volume-slider')
var speed = document.querySelector('.speed-slider')
var back = document.querySelector('.back')
var forward = document.querySelector('.forward')
var player = document.querySelector('.player')
var buttons = document.querySelector('.buttons')
var speedControl = document.querySelector('.speed-control')
var volumeControl = document.querySelector('.volume-control')
var volumeTemp = 100;

playBtn.addEventListener('click', function(){
    if(video.paused){
        playBtn.innerHTML= "<i class=" + " \" fas fa-pause\" " + "></i>";
        video.play();
    }
    else{
        playBtn.innerHTML= "<i class=" + " \" fas fa-play\" " + "></i>";
        video.pause();
    }
});

timeBar.addEventListener('input', function(){
    let x= timeBar.value;
    UpdateBar(x, 'rgb(67, 134, 134)', timeBar);
    video.currentTime= video.duration * x / 100; 
});

volume.addEventListener('input', function(){
    let x= volume.value;
    video.volume = x / 100;
    volumeTemp = x;
    UpdateBar(x, 'white', volume);
    if(video.volume === 0) volumeControl.innerHTML= '<i class="fas fa-volume-mute"></i>';
    else volumeControl.innerHTML= '<i class="fas fa-volume-up"></i>';
});

speed.addEventListener('input', function(){
    let x= speed.value;
    switch (x) {
        case '0':
            speedControl.innerHTML= '<i class="fas fa-hourglass-start"></i>';
            video.playbackRate = 0.5;
            break;
        case '25':
            speedControl.innerHTML= '<i class="fas fa-hourglass-half"></i>';
            video.playbackRate = 0.75;
            break;
        case '50':
            speedControl.innerHTML= '<i class="fas fa-hourglass-half"></i>';
            video.playbackRate = 1;
            break;
        case '75':
            speedControl.innerHTML= '<i class="fas fa-hourglass-half"></i>';
            video.playbackRate = 1.5;
            break;
        case '100':
            speedControl.innerHTML= '<i class="fas fa-hourglass-end"></i>';
            video.playbackRate = 2;
            break;
    }
    UpdateBar(x, 'white', speed);
});

video.addEventListener('timeupdate', function(){
    var progress = video.currentTime / video.duration;
    UpdateBar(progress * 100, 'rgb(67, 134, 134)', timeBar);
})

video.onended = function(){
    playBtn.innerHTML = '<i class="fas fa-play">';
};

function UpdateBar(x, barColor, bar){
    let color = ('linear-gradient(90deg,' + barColor + ' ' + x + '%, rgb(155, 155, 155) ' + x + '%)')
    bar.style.background = color;
}

back.addEventListener('click', function(){
    video.currentTime-=10;
})

forward.addEventListener('click', function(){
    video.currentTime+=10;
})

player.addEventListener('dblclick', function(){
  if (this.requestFullscreen) {
    this.requestFullscreen();
    screen.orientation.lock('landscape');
  } 
  else if (this.mozRequestFullScreen) { 
    this.mozRequestFullScreen();
    screen.orientation.lock('landscape');
  } 
  else if (this.webkitRequestFullscreen) { 
    this.webkitRequestFullscreen();
    screen.orientation.lock('landscape');
  } 
  else if (this.msRequestFullscreen) { 
    this.msRequestFullscreen();
    screen.orientation.lock('landscape');
  }
})

let hidden= true;

player.addEventListener('mousemove', function(){
    if(hidden){
        buttons.style.display='grid';
        hidden= false;
        setTimeout(() => {
            buttons.style.display='none';
            hidden= true;
        }, 7000);
    }
})

volumeControl.addEventListener('click', function(){
    switch (volumeControl.innerHTML) {
        case '<i class="fas fa-volume-up" aria-hidden="true"></i>':
            volumeControl.innerHTML= '<i class="fas fa-volume-mute"></i>';
            video.volume = 0;
            volume.value = 0;
            UpdateBar(volume.value, 'white', volume);
            break;

        case '<i class="fas fa-volume-mute" aria-hidden="true"></i>':
            volumeControl.innerHTML= '<i class="fas fa-volume-up"></i>';
            if(video.volume === 0) {
                video.volume = 0.1;
                volume.value = 10;
            }
            else {
                video.volume = volumeTemp / 100;
                volume.value = volumeTemp;
            }
            UpdateBar(volume.value, 'white', volume);
            break;
    }
});
