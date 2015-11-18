import SimulationStore from '../../stores/simulation-store';
import Actions from '../../actions/simulation-actions';

export async function createSimulation(req, res) {
  const project = req.swagger.params.id.value;
  try {
    const {id} = await Actions.createSimulation({project});
    res.set('Location', `/simulation/${id}`)
      .set('Content-Type', 'application/json')
      .status(201)
      .end();
  } catch ({message}) {
    res.set('Content-Type', 'application/json')
      .status(404)
      .json({message});
  }
}

export async function getSimulation(req, res) {
  const id = req.swagger.params.id.value;
  try {
    const simulation = await SimulationStore.get({id});
    res.set('Content-Type', 'application/json')
      .status(200)
      .json(simulation.toJS());
  } catch ({message}) {
    res.set('Content-Type', 'application/json')
      .status(404)
      .json({message});
  }
}

export async function getSimulations(req, res) {
  const project = req.swagger.params.id.value;
  try {
    const simulations = await SimulationStore.getAll({project});
    res.set('Content-Type', 'application/json')
      .status(200)
      .json(simulations.toJS());
  } catch ({message}) {
    res.set('Content-Type', 'application/json')
      .status(404)
      .json({message});
  }
}

export async function updateSimulation(req, res) {
  const properties = req.swagger.params.properties.value;
  const id = req.swagger.params.id.value;
  try {
    await Actions.updateSimulation({id, ...properties});
    res.set('Content-Type', 'application/json')
      .status(204)
      .end();
  } catch ({message}) {
    res.set('Content-Type', 'application/json')
      .status(404)
      .json({message});
  }
}

export async function deleteSimulation(req, res) {
  const id = req.swagger.params.id.value;
  try {
    await Actions.deleteSimulation({id});
    res.set('Content-Type', 'application/json')
      .status(204)
      .end();
  } catch ({message}) {
    res.set('Content-Type', 'application/json')
      .status(404)
      .json({message});
  }
}
