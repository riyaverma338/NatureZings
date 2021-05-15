const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const replay = document.querySelector(".replay");
    const outline = document.querySelector('.moving-outline circle');
    const video= document.querySelector('.vid-container video');
    

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //timeDisplay(just h3)
    const timeDisplay = document.querySelector('.time-display');

    const timeSelect = document.querySelectorAll(".time-select button");

    //get the length of the outline
    const outlineLength = outline.getTotalLength();

    //Duration
    let fakeDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
        )}`;

      sounds.forEach(sound => {
        sound.addEventListener("click", function() {
          song.src = this.getAttribute("data-sound");
          video.src = this.getAttribute("data-video");
          checkPlaying(song);
        });
      });
      

    //play sound
    play.addEventListener("click", function() {
        checkPlaying(song);
      });

      replay.addEventListener("click", function() {
        restartSong(song);
        
      });

      const restartSong = song =>{
        let currentTime = song.currentTime;
        song.currentTime = 0;
        console.log("ciao")
    
    }
    
    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
          fakeDuration = this.getAttribute("data-time");
          timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
            fakeDuration % 60
          )}`;
        });
      });

      //function to play and stop sound
      const checkPlaying = song => {
        if (song.paused) {
          song.play();
          video.play();
          play.src = "./pause.svg";
          
        } else {
          song.pause();
          video.pause();
          play.src = "./play.svg";
        }
      };

      song.ontimeupdate = function() {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        timeDisplay.textContent = `${minutes}:${seconds}`;
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
      
        if (currentTime >= fakeDuration) {
          song.pause();
          song.currentTime = 0;
          play.src = "./play.svg";
          video.pause();
        }
      };

};

app();
