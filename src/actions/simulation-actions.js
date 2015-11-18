import Dispatcher from '../dispatcher';
import {ActionTypes} from '../constants';

export default {
  createSimulation(properties) {
    return new Promise((resolve, reject) => Dispatcher.dispatch({
      task: {resolve, reject},
      type: ActionTypes.CREATE_SIMULATION,
      properties
    }));
  },
  updateSimulation(properties) {
    return new Promise((resolve, reject) => Dispatcher.dispatch({
      task: {resolve, reject},
      type: ActionTypes.UPDATE_SIMULATION,
      properties
    }));
  },
  deleteSimulation(properties) {
    return new Promise((resolve, reject) => Dispatcher.dispatch({
      task: {resolve, reject},
      type: ActionTypes.DELETE_SIMULATION,
      properties
    }));
  }
};
