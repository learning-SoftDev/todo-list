//Adding of project
const addProject = document.querySelector('#addProject');
const projectForm = document.querySelector('#projectForm');

addProject.addEventListener('click', () => projectForm.classList.remove('hidden'));

//Adding of task
const addList = document.querySelector('#addList');
const listForm = document.querySelector('#listForm');

addList.addEventListener('click', () => listForm.classList.remove('hidden'));

//Dark and Light Mode
const checkbox = document.querySelector('#checkbox');

checkbox.addEventListener('change', () => document.body.classList.toggle('light'));

//Hide menu
const hiddenMenu = document.querySelector('.hiddenMenu');
hiddenMenu.addEventListener('click', () => {
  const leftPanel = document.querySelector('.leftPanel');
  leftPanel.classList.toggle('hidden');
});

//Sidebar click logic
const tile = document.querySelectorAll('.tile');

tile.forEach((item) =>
  item.addEventListener('click', (e) => {
    for (i of tile) {
      i.classList.remove('selected');
    }
    e.target.closest('.tile').classList.add('selected');
  })
);

//Event listeners
const eventListeners = () => {
  //Cancel button
  const projectCancelBtn = document.querySelector('.projectCancelBtn');
  projectCancelBtn.addEventListener('click', hideProjectForm);
  const listCancelBtn = document.querySelector('.listCancelBtn');
  listCancelBtn.addEventListener('click', hideListForm);

  //Submit - add button
  const submitProject = document.getElementById('projectForm');
  submitProject.addEventListener('submit', processProjectInput);
};

//hide project form
const hideProjectForm = () => {
  const projectForm = document.querySelector('#projectForm');
  const projectInput = document.querySelector('#projectInput');
  //reset value
  projectInput.value = '';
  projectForm.classList.add('hidden');
};

//hide add-task-form
const hideListForm = () => {
  const listForm = document.querySelector('#listForm');
  const listInput = document.querySelector('#listInput');
  const listInputDetail = document.querySelector('#listInputDetail');
  const dateInput = document.querySelector('#listInputDate');

  //reset values
  listInput.value = '';
  listInputDetail.value = '';
  dateInput.value = '';
  listForm.classList.add('hidden');
};

//get project list of objects from locak storage or start with empty
let defaultProjectList = [];
let projectList = localStorage.getItem('myProjectList');
projectList = JSON.parse(projectList || JSON.stringify(defaultProjectList));

const processProjectInput = (e) => {
  let projectName = document.getElementById('projectInput').value;
  let dataProject = findNextDataset();
  const newProject = CreateProject(dataProject, projectName);

  projectList.push(newProject);
  console.log('test');
  saveToLocalStorage();

  e.preventDefault();
};

//save projectList and last id data on local storage
function saveToLocalStorage() {
  localStorage.setItem('myProjectList', JSON.stringify(projectList));
}

//find next data-set
const findNextDataset = () => {
  const allprojects = document.querySelectorAll('[data-project]');
  return allprojects.length;
};

eventListeners();
