import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const currentTimeKey = "videoplayer-current-time";


const onUpdate = function (data) {
  const saveTimeValue = JSON.stringify(data);
  localStorage.setItem(currentTimeKey, saveTimeValue);

};

player.on('timeupdate', throttle(onUpdate, 1000));

const playUpdateVideo = function() {
  const savedTime = JSON.parse(localStorage.getItem(currentTimeKey));
  if (savedTime === null) {
    return;
  }
  const playTimeValue = savedTime.seconds;
  if (playTimeValue) {
    player.setCurrentTime(playTimeValue)
      .then(function (seconds) {})
      .catch(function (error) {
        switch (error.name) {
          case 'Error':
            break;
          default:
            break;
        }
      });
  }
};
playUpdateVideo();
