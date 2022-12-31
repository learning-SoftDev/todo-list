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
const tileChange = () => {
  const tile = document.querySelectorAll('.tile');

  tile.forEach((item) =>
    item.addEventListener('click', (e) => {
      for (i of tile) {
        i.classList.remove('selected');
      }
      e.target.closest('.tile').classList.add('selected');
    })
  );
};

tileChange();

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

  displayProject(projectList);
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
  addProject(projectName);
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

//display the list of all projects in the left panel
const displayProject = (array) => {
  array.forEach((project) => {
    addProjectDOM(project.projectName);
  });
};

// create a span icon of google material icons
const createSpanIcon = (name) => {
  const icon = document.createElement('span');
  icon.classList.add('material-icons-round');
  icon.textContent = name;
  return icon;
};

//create a project and add it to the list of projects in html
const addProjectDOM = (textInput) => {
  const project = document.querySelector('.project');
  const form = document.querySelector('#projectForm');

  const container = document.createElement('div');
  container.classList.add('tile');
  project.insertBefore(container, form);

  //menu three lines icon
  const menuIcon = createSpanIcon('menu');
  menuIcon.setAttribute('data-drag', '');
  container.appendChild(menuIcon);

  //name and number status
  const projectInfo = document.createElement('div');
  projectInfo.classList.add('projectInfo');
  container.appendChild(projectInfo);

  const projectName = document.createElement('div');
  projectName.classList.add('projectName');
  projectName.textContent = textInput;

  projectInfo.appendChild(projectName);

  //three dots on the right section
  const editdiv = document.createElement('div');
  editdiv.classList.add('editContainer');
  editdiv.setAttribute('data-dropdown', '');
  container.appendChild(editdiv);

  //call function to create a span icon
  const editIcon = createSpanIcon('more_vert');
  editIcon.setAttribute('data-dropdown-button', '');
  editdiv.appendChild(editIcon);

  //tile change logic
  tileChange();
};

eventListeners();
