// @flow

import Sound from 'react-native-sound';

Sound.setCategory('Playback', true);

const reload = require('../../media/reload.mp3');
const gunShot = require('../../media/gunshot.mp3');

function playSoundEffect(audioFile) {
  return new Promise((resolve, reject) => {
    const sound = new Sound(audioFile, (error) => {
      if (error) {
        console.error(`failed to load the sound file ${audioFile}`, error);
        reject();
      }
      sound.play(() => {
        sound.release();
        resolve();
      });
    });
  });
}

const AudioUtil = {

  async playGunShot() {
    await playSoundEffect(gunShot);
    return playSoundEffect(reload);
  },

};

export default AudioUtil;

