import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import {ActionTypes} from '../constants';
import {Project} from '../types';
import db from '../database';

const CHANGE_EVENT = 'change';
const NOT_FOUND = 'The requested project could not be found';

class ProjectStore extends EventEmitter {
  constructor() {
    super();
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  get({id}) {
    return db.table('Projects')
      .first().where({id})
      .then(project => {
        if (!project) throw new Error(`No project found with id: ${id}`);
        else return new Project(project);
      });
  }
  getAll() {
    return [];
  }
}

const store = new ProjectStore;

store.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.UPDATE_PROJECT: {
      const {task, properties} = action;
      const {id} = properties;
      db.table('Projects').where({id}).update(properties).then(res => {
        if (!res) {
          task.reject(new Error(`Error could not update project ${id}`));
        } else {
          task.resolve();
          store.emitChange();
        }
      }, task.reject);
      break;
    }
    case ActionTypes.CREATE_PROJECT: {
      const {task, properties} = action;
      db.table('Projects').insert(properties).then(([id]) => {
        if (!id) {
          task.reject(new Error(`Could not add project: ${properties}`));
        } else {
          task.resolve({id});
          store.emitChange();
        }
      }, task.reject);
      break;
    }
    case ActionTypes.DELETE_PROJECT: {
      const {task, properties} = action;
      const {id} = properties;
      db.table('Projects').where({id}).delete().then(res => {
        if (!res) {
          task.reject(new Error(`Could not delete project ${id}`))
        } else {
          task.resolve();
          store.emitChange();
        }
      }, task.reject);
      break;
    }
  }
});

export default store;
