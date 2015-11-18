import {EventEmitter} from 'events';
import {List} from 'immutable';
import Dispatcher from '../dispatcher';
import {ActionTypes} from '../constants';
import {Simulation} from '../types';
import db from '../database';

const CHANGE_EVENT = 'change';

class SimulationStore extends EventEmitter {
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
    return db.table('Simulations')
      .first().where({id})
      .then(simulation => {
        if (!simulation) throw new Error(`No simulation found with id: ${id}`);
        else return new Simulation(simulation);
      });
  }
  getAll({project}) {
    return db.table('Simulations')
      .where({project})
      .then(simulations => new List(
        simulations.map(simulation => new Simulation(simulation))
      ));
  }
}

const store = new SimulationStore;

store.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.CREATE_SIMULATION: {
      const {task, properties} = action;
      const {project} = properties;
      db.table('Simulations').insert({...properties,
        source() {
          this.table('Projects').select('source').where({id: project});
        }
      }).then(([id]) => {
        if (!id) {
          task.reject(new Error(`Could not add project: ${properties}`));
        } else {
          task.resolve({id});
          store.emitChange();
        }
      }, task.reject);
      break;
    }
    case ActionTypes.UPDATE_SIMULATION: {
      const {task, properties} = action;
      const {id} = properties;
      db.table('Simulations').where({id}).update(properties).then(res => {
        if (!res) {
          task.reject(new Error(`Error could not update simulation ${id}`));
        } else {
          task.resolve();
          store.emitChange();
        }
      }, task.reject);
      break;
    }
    case ActionTypes.DELETE_SIMULATION: {
      const {task, properties} = action;
      const {id} = properties;
      db.table('Simulations').where({id}).delete().then(res => {
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
