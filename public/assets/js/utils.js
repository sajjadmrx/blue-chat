const song = {
  id: 1,
  src: '/sounds/1.mp3',
};


class util {

  play() {
    const audio = document.getElementById('audio');
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

  }




}

export default new util();