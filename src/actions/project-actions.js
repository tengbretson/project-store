import Dispatcher from '../dispatcher';
import {ActionTypes} from '../constants';

export default {
  updateProject(properties) {
    return new Promise((resolve, reject) => Dispatcher.dispatch({
      task: {resolve, reject},
      type: ActionTypes.UPDATE_PROJECT,
      properties
    }));
  },
  createProject(properties) {
    return new Promise((resolve, reject) => Dispatcher.dispatch({
      task: {resolve, reject},
      type: ActionTypes.CREATE_PROJECT,
      properties
    }));
  },
  deleteProject(properties) {
    return new Promise((resolve, reject) => Dispatcher.dispatch({
      task: {resolve, reject},
      type: ActionTypes.DELETE_PROJECT,
      properties
    }));
  }
};
