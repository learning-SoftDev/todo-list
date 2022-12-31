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

  // //Submit - add button
  // const submitProject = document.querySelector('#projectForm');
  // submitProject.addEventListener('submit', processProjectInput);

  // displayProject(projectList);
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

eventListeners();

//On load, get items from local storage then add the submit event handler to the form. Note to put displayProjects in every change to reflect changes in DOM
window.addEventListener('load', () => {
  projectList = JSON.parse(localStorage.getItem('projectList')) || [];
  const newProjectForm = document.querySelector('#projectForm');

  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Add the new project into the project list then save to local storage
    let projectName = document.getElementById('projectInput').value;
    const newProject = new CreateProject(projectName);
    projectList.push(newProject);
    saveToLocalStorage();

    // Reset the form
    e.target.reset();

    // Hide the new project pop up then refresh/reload the project list
    hideProjectForm();
    displayProjects();
  });
  displayProjects();
});

//Create project constructor
function CreateProject(projectName) {
  this.projectName = projectName;
}

//Save projectList on local storage
function saveToLocalStorage() {
  localStorage.setItem('projectList', JSON.stringify(projectList));
}

// create a span icon of google material icons
const createSpanIcon = (name) => {
  const icon = document.createElement('span');
  icon.classList.add('material-icons-round');
  icon.textContent = name;
  return icon;
};

function displayProjects() {
  const todoList = document.querySelector('#projectCompleteList');
  todoList.innerHTML = '';
  projectList.forEach((proj) => {
    const projectCompleteList = document.querySelector('#projectCompleteList');

    //adding elements
    const container = document.createElement('div');
    const menuIcon = createSpanIcon('menu');
    const projectName = document.createElement('input');
    projectName.setAttribute('readonly', '');
    const editIcon = createSpanIcon('edit');
    const deleteIcon = createSpanIcon('delete');

    //adding classlist of elements above
    container.classList.add('tile');
    projectName.classList.add('projectName');
    projectName.value = proj.projectName;

    //appending
    container.appendChild(menuIcon);
    container.appendChild(projectName);
    container.appendChild(editIcon);
    container.appendChild(deleteIcon);
    projectCompleteList.appendChild(container);

    //delete icon logic
    deleteIcon.addEventListener('click', () => {
      projectList = projectList.filter((t) => t.projectName !== proj.projectName);
      saveToLocalStorage();
      displayProjects();
    });

    //edit icon logic
    editIcon.addEventListener('click', (e) => {});

    //tile change logic
    tileChange();
  });
}
