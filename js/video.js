var video = document.getElementById('video')
var playBtn = document.querySelector('.play-pause')
var timeBar = document.querySelector('.time-bar')
var volume = document.querySelector('.volume-slider')
var speed = document.querySelector('.speed-slider')
var back = document.querySelector('.back')
var forward = document.querySelector('.forward')
var player = document.querySelector('.player')
var buttons = document.querySelector('.buttons')

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
    UpdateBar(x, 'white', volume);
});

speed.addEventListener('input', function(){
    let x= speed.value;
    switch (x) {
        case '0':
            
            video.playbackRate = 0.5;
            break;
        case '25':
            video.playbackRate = 0.75;
            break;
        case '50':
            video.playbackRate = 1;
            break;
        case '75':
            video.playbackRate = 1.5;
            break;
        case '100':
            video.playbackRate = 2;
            break;
    }
    UpdateBar(x, 'white', speed);
});

video.addEventListener('timeupdate', function(){
    var progress = video.currentTime / video.duration;
    UpdateBar(progress * 100, 'rgb(67, 134, 134)', timeBar);
})

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
  } 
  else if (this.mozRequestFullScreen) { 
    this.mozRequestFullScreen();
  } 
  else if (this.webkitRequestFullscreen) { 
    this.webkitRequestFullscreen();
  } 
  else if (this.msRequestFullscreen) { 
    this.msRequestFullscreen();
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
