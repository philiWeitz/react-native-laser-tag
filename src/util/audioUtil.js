// @flow

import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const reload = require('../../media/reload.mp3');
const gunShot = require('../../media/gunshot.mp3');

function playSoundEffect(audioFile) {
  return new Promise((resolve, reject) => {
    const sound = new Sound(audioFile, (error) => {
      if (error) {
        console.log(`failed to load the sound file ${audioFile}`, error);
        return reject();
      }
      sound.play(() => {
        sound.release();
        return resolve();
      });
    });
  });
}

const AudioUtil = {

  async playGunShot() {
    await playSoundEffect(gunShot);
    return await playSoundEffect(reload);
  },

};

export default AudioUtil;

