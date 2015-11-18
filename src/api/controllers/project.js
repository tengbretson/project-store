import ProjectStore from '../../stores/project-store';
import Actions from '../../actions/project-actions';

export function getProjects(req, res) {
  const projects = ProjectStore.getAll();
  res.json(projects);
}

export async function getProject(req, res) {
  const id = req.swagger.params.id.value;
  try {
    const project = await ProjectStore.get({id});
    res.set('Content-Type', 'application/json')
      .status(200)
      .json(project.toJS());
  } catch ({message}) {
    res.set('Content-Type', 'application/json')
      .status(400)
      .json({message});
  }
}

export async function createProject(req, res) {
  const {apiPath} = req.swagger;
  const properties = req.swagger.params.properties.value;
  try {
    const {id} = await Actions.createProject(properties);
    res.set('Location', `${apiPath}/${id}`)
      .set('Content-Type', 'application/json')
      .status(201)
      .end();
  } catch ({message}) {
    res.set('Content-Type', 'application/json')
      .status(400)
      .json({message});
  }
}

export async function updateProject(req, res) {
  const properties = req.swagger.params.properties.value;
  const id = req.swagger.params.id.value;
  try {
    await Actions.updateProject({id, ...properties});
    res.set('Content-Type', 'application/json')
      .status(204)
      .end();
  } catch ({message}) {
    res.set('Content-Type', 'application/json')
      .status(400)
      .json({message});
  }
}

export async function deleteProject(req, res) {
  const id = req.swagger.params.id.value;
  try {
    await Actions.deleteProject({id});
    res.set('Content-Type', 'application/json')
      .status(204)
      .end();
  } catch ({message}) {
    res.set('Content-Type', 'application/json')
      .status(404)
      .json({message});
  }
}
