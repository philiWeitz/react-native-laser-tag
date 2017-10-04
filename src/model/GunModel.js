
import { Record } from 'immutable';

const GunModel = Record({
  name: '',
});

GunModel.build = (data) => new GunModel(data);

export default GunModel;
