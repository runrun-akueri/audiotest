const app = () => {
  const playBtn = document.querySelector('.playertimerbtn');
  const song = document.querySelector('.song');
  const player = document.querySelector('.player');
  const sounds = document.querySelectorAll('.soundList-item');
  
  let currentTime = song.currentTime;
  let currentDuration = 0;
  let leftDuration = currentDuration - currentTime;
  let minutes = Math.floor(leftDuration / 60);
  let seconds = Math.floor(leftDuration % 60);

//時間取得
  const audio = document.getElementsByTagName("audio")[0]
  audio.addEventListener("timeupdate", (e) => {
  const current = Math.floor(audio.currentTime)
  const duration = Math.round(audio.duration)
  if (!isNaN(duration)) {
    document.getElementById('current').innerHTML = current
    document.getElementById('duration').innerHTML = duration
    const percent = Math.round((audio.currentTime/audio.duration)*1000)/10
//シークバー　background-imageのbackgroundSize幅を変更して表現
    document.getElementById('seekbar').style.backgroundSize = percent + '%'
  }
})

//シークバークリックした位置からの再生時間取得
  document.getElementById('seekbar').addEventListener("click", (e) => {
  const duration = Math.round(audio.duration)
  if(!isNaN(duration)){
    const mouse = e.pageX
    const element = document.getElementById('seekbar')
    const rect = element.getBoundingClientRect()
    const position = rect.left + window.pageXOffset
    const offset = mouse - position
    const width = rect.right - rect.left
    audio.currentTime = Math.round(duration * (offset / width))
  }
})

  //取得した時間データが秒なので、mm:ss形式に直す関数
  function playTime (t) {
  let hms = ''
  const h = t / 3600 | 0
  const m = t % 3600 / 60 | 0
  const s = t % 60
  const z2 = (v) => {
    const s = '00' + v
    return s.substr(s.length - 2, 2)
  }
  if(h != 0){
    hms = h + ':' + z2(m) + ':' + z2(s)
  }else if(m != 0){
    hms = z2(m) + ':' + z2(s)
  }else{
    hms = '00:' + z2(s)
  }
  return hms
}

  audio.addEventListener("timeupdate", (e) => {
  const current = Math.floor(audio.currentTime)
  const duration = Math.round(audio.duration)
  if (!isNaN(duration)) {
    document.getElementById('current').innerHTML = playTime(current)
    document.getElementById('duration').innerHTML = playTime(duration)
  }
})
//

  window.addEventListener('DOMContentLoaded', () => {
    setDefaultPlayer();
  });

  const setDefaultPlayer = () => {
    
    updatePlayerByTimeUpdate();
    mapCheckPlayingEvent();
    mapClickEventToSoundBtn();
  };
//再生中かどうか判断する関数
  const mapCheckPlayingEvent = () => {
    playBtn.addEventListener('click', () => {
      checkPlaying(song);
      checkSongEnding();
    });
  }

  const checkPlaying = () => {
    if (song.paused) {
      song.play();
      playBtn.src = 'svg/stop.svg';
    } else {
      song.pause();
      playBtn.src = 'svg/play.svg';
    }
  };

  const checkSongEnding = () => {
    if (currentTime > currentDuration) {
      song.pause();
      song.currentTime = 0;
     
    }
  };

//曲選択の関数
  const mapClickEventToSoundBtn = () => {
    sounds.forEach(sound => {
      sound.addEventListener('click', function() {
        const imageUrl = this.getAttribute('data-image');
        const title = this.querySelector('.soundList-title').innerText;
        const description = this.querySelector('.soundList-description').innerText;
        const songData = this.getAttribute('data-sound');;
        setPlayerSong(songData, imageUrl);
        setPlayerText(title, description, currentDuration);
        
      });
    });
  };

//再生中のサムネ表示関数
  const setPlayerSong = (songData, imageUrl) => {
    song.src = songData;
    player.style.backgroundImage = `url(${imageUrl})`;
    
  }
//再生中のタイトルを表示させる関数
  const setPlayerText = (title, description) => {
    const playerTitle = document.querySelector('.title-headline');
    const playerDescription = document.querySelector('.title-description');

    playerTitle.innerText = title;
    playerDescription.innerText = description;
  };
//必要 何か調べる。
  const updatePlayerByTimeUpdate = () => {
    song.addEventListener('timeupdate', () => {
      const currentSrc = song.getAttribute('src');
      let lastSrc;

      if (currentSrc === lastSrc || lastSrc === undefined) {
        lastSrc = currentSrc;
      } else { 
        lastSrc = undefined;
      }
    });
  }   
    //音量スライダー 
    var myAudio = new Audio('');
    var volume = document.getElementById('hoge');

    hoge.addEventListener('change', function () {
      var volumeValue = (hoge.value.length == 1) ? '0.0' + hoge.value : '0.' +
        hoge.value;
      myAudio.hoge = volumeValue;
      song.volume = volumeValue;
    }, false);
}
app();

//曲選択時に再生ボタンが切り替わるように
  function test(){
  const foo = document.getElementById('test');
  foo.setAttribute('src', 'svg/stop.svg');
  return;
  }
