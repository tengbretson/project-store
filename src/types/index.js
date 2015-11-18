import {Record} from 'immutable';

export const Project = Record({id: null, name: '', source: ''}, 'Project');

export class Simulation extends Record({
  id: null, project: null, source: '', annotation: '', simulated_on: null
}) {
  constructor(props) {
    super({...props,
      simulated_on: new Date(props.simulated_on)
    })
  }
}
