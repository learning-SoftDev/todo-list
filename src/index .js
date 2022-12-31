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
  const submitProject = document.querySelector('#projectForm');
  submitProject.addEventListener('submit', processProjectInput);
};

//Cancel button - hide project form
const hideProjectForm = () => {
  const projectForm = document.querySelector('#projectForm');
  const projectInput = document.querySelector('#projectInput');
  //reset value
  projectInput.value = '';
  projectForm.classList.add('hidden');
};

//Cancel button - hide add-task-form
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

//-------------------------------------------------------------------------------------------------------
//Get project list of objects from local storage or start with empty
let projectList = JSON.parse(localStorage.getItem('myProjectList')) || [];

const processProjectInput = (e) => {
  let projectName = document.getElementById('projectInput').value;
  const newProject = new CreateProject(projectName);
  projectList.push(newProject);

  saveToLocalStorage();
  hideProjectForm();
  e.preventDefault();
};

//Create project constructor
function CreateProject(projectName) {
  this.projectName = projectName;
}

//save projectList and last id data on local storage
function saveToLocalStorage() {
  localStorage.setItem('myProjectList', JSON.stringify(projectList));
}

eventListeners();
