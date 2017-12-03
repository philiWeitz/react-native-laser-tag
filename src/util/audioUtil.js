// @flow

import Sound from 'react-native-sound';

Sound.setCategory('Playback', true);

function playSoundEffect(audio) {
  return new Promise((resolve, reject) => {
    const sound = new Sound(audio,Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error(`failed to load the sound file ${audio}`, error);
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

  async playAk47GunShot() : Promise<any> {
    return playSoundEffect("ak47_shot");
  },

  async playShotgunShot() : Promise<any> {
    return playSoundEffect("shotgun_shot");
  },

  async playReload() : Promise<any> {
    return playSoundEffect("reload");
  },

  async playHit() : Promise<any> {
    return playSoundEffect("hit");
  },

};

export default AudioUtil;
