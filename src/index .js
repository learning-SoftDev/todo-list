//Adding of project
const addProject = document.querySelector('#addProject');
const projectForm = document.querySelector('#projectForm');
addProject.addEventListener('click', () => projectForm.classList.remove('hidden'));

//Adding of task
const addList = document.querySelector('#addList');
const taskForm = document.querySelector('#taskForm');
const submitBtn = document.querySelector('.listSubmitBtn');
const editConfirm = document.querySelector('#editConfirm');
addList.addEventListener('click', () => {
  taskForm.classList.remove('hidden');
  submitBtn.classList.remove('hidden');
  editConfirm.classList.add('hidden');
});

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
  const addList = document.querySelector('#addList');
  const title = document.querySelector('.title');

  tile.forEach((item) =>
    item.addEventListener('click', (e) => {
      for (i of tile) {
        i.classList.remove('selected');
      }
      //add selected class
      e.target.closest('.tile').classList.add('selected');

      //add task visibility logic
      const addListHide = JSON.stringify(e.target.closest('.tile').classList).includes('homeTiles');
      if (addListHide) {
        addList.classList.add('hidden');
        title.innerHTML = e.target.closest('.tile').textContent;
      } else {
        addList.classList.remove('hidden');
        title.innerHTML = e.target.closest('.tile').querySelector('input').value;
      }

      //hide the task form when going to another project
      hideListForm();
    })
  );
};

//Event listeners
const eventListeners = () => {
  //Cancel button
  const projectCancelBtn = document.querySelector('.projectCancelBtn');
  projectCancelBtn.addEventListener('click', hideProjectForm);

  const listCancelBtn = document.querySelector('.listCancelBtn');
  listCancelBtn.addEventListener('click', hideListForm);

  // const editCancelBtn = document.querySelector('#editCancelButton');
  // editCancelBtn.addEventListener('click', hideEditForm);
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
  const taskForm = document.querySelector('#taskForm');
  const listInput = document.querySelector('#listInput');
  const listInputDetail = document.querySelector('#listInputDetail');
  const dateInput = document.querySelector('#listInputDate');
  const taskValidation = document.querySelector('.taskValidation');

  //reset values

  listInput.value = '';
  listInputDetail.value = '';
  dateInput.value = '';

  taskForm.classList.add('hidden');
  taskValidation.classList.add('hidden');
  document.querySelector('.list-todo').appendChild(taskForm);
  refreshDisplayTasks();
};

eventListeners();

//On load, get items from local storage then add the submit event handler to the form. Note to put refreshDisplayProjects in every change to reflect changes in DOM
window.addEventListener('load', () => {
  projectList = JSON.parse(localStorage.getItem('projectList')) || [];
  const newProjectForm = document.querySelector('#projectForm');

  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Add the new project into the project list then save to local storage
    const projectName = document.getElementById('projectInput').value;
    const newProject = new CreateProject(projectName);
    projectList.push(newProject);
    saveToLocalStorage();

    // Reset the form
    e.target.reset();

    // Hide the new project pop up then refresh/reload the project list
    hideProjectForm();
    refreshDisplayProjects();
  });
  refreshDisplayProjects();
});

//Create project constructor
function CreateProject(projectName) {
  this.projectName = projectName;
}

//Save projectList on local storage
const saveToLocalStorage = () => {
  localStorage.setItem('projectList', JSON.stringify(projectList));
  localStorage.setItem('taskList', JSON.stringify(taskList));
};

// create a span icon of google material icons
const createSpanIcon = (name) => {
  const icon = document.createElement('span');
  icon.classList.add('material-icons-round');
  icon.textContent = name;
  return icon;
};

const refreshDisplayProjects = () => {
  const todoList = document.querySelector('#projectCompleteList');
  todoList.innerHTML = '';
  projectList.forEach((proj) => {
    const projectCompleteList = document.querySelector('#projectCompleteList');

    //adding elements
    const container = document.createElement('div');
    const menuIcon = createSpanIcon('menu');
    const projectName = document.createElement('input');
    projectName.setAttribute('readonly', '');
    projectName.setAttribute('spellcheck', false);
    const editIcon = createSpanIcon('edit');
    const deleteIcon = createSpanIcon('delete');

    //adding classlist of elements above
    container.classList.add('tile');
    projectName.classList.add('projectName');
    projectName.value = proj.projectName;

    //appending to DOM
    container.appendChild(menuIcon);
    container.appendChild(projectName);
    container.appendChild(editIcon);
    container.appendChild(deleteIcon);
    projectCompleteList.appendChild(container);

    //delete icon logic
    deleteIcon.addEventListener('click', () => {
      projectList = projectList.filter((t) => t.projectName !== proj.projectName);
      saveToLocalStorage();
      refreshDisplayProjects();
    });

    //edit icon logic
    editIcon.addEventListener('click', (e) => {
      const projectInput = container.querySelector('.projectName');
      projectInput.removeAttribute('readonly');
      projectInput.focus();
      projectInput.addEventListener('blur', (e) => {
        projectInput.setAttribute('readonly', true);
        proj.projectName = e.target.value;
        saveToLocalStorage();
        refreshDisplayProjects();
      });
    });

    //tile change logic
    tileChange();
  });
};

// Creating tasks
//On load, get items from local storage then add the submit event handler to the form. Note to put refreshDisplayProjects in every change to reflect changes in DOM
window.addEventListener('load', () => {
  taskList = JSON.parse(localStorage.getItem('taskList')) || [];
  const newtaskForm = document.querySelector('#taskForm');

  newtaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = document.getElementById('listInput').value;
    const taskValidation = document.querySelector('.taskValidation');

    // Validation if duplicate task names exist. Compare current local storage task names to listInput element value
    if (taskName === editTitleCurrrent) {
    } else if (
      JSON.parse(localStorage.getItem('taskList')).filter((t) => t.taskName === taskName).length > 0
    ) {
      taskValidation.classList.remove('hidden');
      return;
    }

    // If not edit mode, then proceed with pushing the new task into the list
    if (!editMode) {
      // Push details of new task into the taskList
      let details = document.getElementById('listInputDetail').value;
      details === '' ? (details = 'No details') : details;
      let dueDate = document.getElementById('listInputDate').value;
      dueDate === '' ? (dueDate = 'No Due Date') : dueDate;
      const projectName = document.querySelector('.selected input').value;
      const newtask = new CreateTask(taskName, projectName, details, dueDate);
      taskList.push(newtask);
    }
    // Add the new task into the task list then save to local storage
    saveToLocalStorage();

    // Reset the form
    e.target.reset();

    // // Hide the new task pop up then refresh/reload the task list
    hideListForm();

    refreshDisplayTasks();
  });
  refreshDisplayTasks();
});

const editButton = () => {};

//Validation of add button if task name field is empty
const validationSubmit = (taskName, submitButton) => {
  taskName.addEventListener('input', (e) => {
    if (e.target.value !== '') {
      submitButton.disabled = false;
      submitButton.classList.remove('disabled');
    } else {
      submitButton.classList.add('disabled');
      submitButton.disabled = true;
    }
  });
};
validationSubmit(document.getElementById('listInput'), document.querySelector('.listSubmitBtn'));

//Create task constructor
function CreateTask(taskName, projectName, details, dueDate = 'No Due Date') {
  this.taskName = taskName;
  this.projectName = projectName;
  this.details = details;
  this.dueDate = dueDate;
  this.completed = false;
  this.important = false;
}

const refreshDisplayTasks = () => {
  // prevent from rearrangement of add and form itself
  taskList = JSON.parse(localStorage.getItem('taskList')) || [];
  document
    .querySelector('.list-todo')
    .insertBefore(document.querySelector('#taskForm'), document.querySelector('#addList'));
  const todoList = document.querySelector('#taskCompleteList > ul');
  todoList.innerHTML = '';
  taskList.forEach((task) => {
    //adding elements
    const li = document.createElement('li');
    const unchecked = document.createElement('div');
    const listDetails = document.createElement('div');
    const taskTitle = document.createElement('div');
    const taskDetails = document.createElement('div');
    const dateDiv = document.createElement('div');
    const listRight = document.createElement('div');
    const starContainer = document.createElement('div');
    const starOutline = createSpanIcon('star_outline');
    const star = createSpanIcon('star');
    const editIcon = createSpanIcon('edit');
    const deleteIcon = createSpanIcon('delete');

    //adding classlist of elements above
    unchecked.classList.add('unchecked');
    listDetails.classList.add('list-details');
    taskTitle.classList.add('taskTitle');
    taskDetails.classList.add('taskDetails');
    dateDiv.classList.add('date');
    listRight.classList.add('list-right');
    starContainer.classList.add('.starContainer');
    starOutline.classList.add('star-outline');
    star.classList.add('important');
    task.important ? starOutline.classList.add('listHidden') : star.classList.add('listHidden');
    if (task.completed) {
      unchecked.classList.toggle('checked');
      listDetails.classList.toggle('lineThrough');
      listDetails.classList.toggle('fade');
    }

    //assigning values
    taskTitle.textContent = task.taskName;
    taskDetails.textContent = task.details;
    dateDiv.textContent = task.dueDate;

    //appending to DOM
    const ul = document.querySelector('ul');
    ul.appendChild(li);
    li.appendChild(unchecked);
    li.appendChild(listDetails);
    listDetails.appendChild(taskTitle);
    listDetails.appendChild(taskDetails);
    li.appendChild(listRight);
    listRight.appendChild(dateDiv);
    listRight.appendChild(starContainer);
    starContainer.appendChild(starOutline);
    starContainer.appendChild(star);
    listRight.appendChild(editIcon);
    listRight.appendChild(deleteIcon);

    //delete icon logic
    deleteIcon.addEventListener('click', () => {
      taskList = taskList.filter((t) => t.taskName !== task.taskName);
      saveToLocalStorage();
      refreshDisplayTasks();
    });

    //check icon logic
    unchecked.addEventListener('click', () => {
      task.completed === true ? (task.completed = false) : (task.completed = true);
      saveToLocalStorage();
      refreshDisplayTasks();
    });

    //star icon logic
    starContainer.addEventListener('click', () => {
      task.important === true ? (task.important = false) : (task.important = true);
      saveToLocalStorage();
      refreshDisplayTasks();
    });

    //edit icon logic
    editIcon.addEventListener('click', () => {
      // Create container element and hide the elements inside then append the edit form to the target task
      editMode = true;

      const containerEdit = document.createElement('div');
      containerEdit.classList.add('containerEdit');
      li.querySelector('.unchecked').classList.add('hidden');
      li.querySelector('.list-details').classList.add('hidden');
      li.querySelector('.list-right').classList.add('hidden');
      li.insertBefore(containerEdit, li.querySelector('.unchecked'));
      containerEdit.appendChild(document.getElementById('taskForm'));

      const taskForm = document.getElementById('taskForm');
      taskForm.classList.remove('hidden');

      //setting initial value of edit form based from the task current details
      let listInput = document.querySelector('#listInput');
      let listInputDetail = document.querySelector('#listInputDetail');
      let listInputDate = document.querySelector('#listInputDate');
      listInput.value = task.taskName;
      listInputDetail.value = task.details;
      listInputDate.value = task.dueDate;

      //Show the confirmation edit button then hide the add button for new tasks since this is editing
      const editConfirm = document.querySelector('#editConfirm');
      editConfirm.classList.remove('hidden');
      document.querySelector('.listSubmitBtn').classList.add('hidden');

      //When a field changed in the task form, then update the values of the variable taskList (without updating the local storage yet)
      const parentInput = document.querySelector('#taskForm > .inputField');
      for (const child of parentInput.children) {
        child.addEventListener('change', () => {
          task.taskName = listInput.value;
          task.details = listInputDetail.value;
          task.dueDate = listInputDate.value || 'No Due Date';
        });
      }
      editTitleCurrrent = task.taskName;
    });
  });
  editMode = false;
  editTitleCurrrent = '';
};
