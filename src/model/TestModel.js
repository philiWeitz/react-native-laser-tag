
import { Record } from 'immutable';

const TestModel = Record({
  message: '',
});

TestModel.build = (data) => new TestModel(data);

export default TestModel;
