// @flow

import Sound from 'react-native-sound';

const reload = require('../../media/reload.mp3');
const gunShot = require('../../media/gunshot.mp3');
const dying = require('../../media/dying.mp3');

Sound.setCategory('Playback', true);

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

  async playGunShot() : Promise<any> {
    return playSoundEffect(gunShot);
  },

  async playReload() : Promise<any> {
    return playSoundEffect(reload);
  },

  async playDying() : Promise<any> {
    return playSoundEffect(dying);
  },

};

export default AudioUtil;
