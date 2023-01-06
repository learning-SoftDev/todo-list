//Adding of project
const addProject = document.querySelector('#addProject');
const projectForm = document.querySelector('#projectForm');
const projectInput = document.querySelector('#projectInput');
addProject.addEventListener('click', () => {
  projectForm.classList.remove('hidden');
  projectInput.focus();
});

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
      if (JSON.stringify(e.target.classList).includes('projDelIcon')) return;
      // remove current selection
      for (i of tile) {
        i.classList.remove('selected');
      }
      //add selected class
      e.target.closest('.tile').classList.add('selected');

      //add task visibility logic
      isHomeTile = JSON.stringify(e.target.closest('.tile').classList).includes('homeTiles');

      if (isHomeTile) {
        addList.classList.add('hidden');
        currentTile = e.target.closest('.tile').querySelector('div').textContent;
        title.innerHTML = currentTile;
      } else {
        addList.classList.remove('hidden');
        currentTile = e.target.closest('.tile').querySelector('input').value;
        title.innerHTML = currentTile;
      }

      // delete validation message if exist
      if (document.querySelector('.editProjectValidation') !== null)
        document.querySelector('.editProjectValidation').remove();

      //hide the task form when going to another project
      hideListForm();
      refreshDisplayTasks();
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
};

//Cancel button - hide project form
const hideProjectForm = () => {
  const projectForm = document.querySelector('#projectForm');
  const projectInput = document.querySelector('#projectInput');
  const projectValidation = document.querySelector('.projectValidation');
  //reset value
  projectInput.value = '';
  projectForm.classList.add('hidden');
  projectValidation.classList.add('hidden');
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

    const projectName = document.getElementById('projectInput').value;
    const projectValidation = document.querySelector('.projectValidation');

    // Validation if duplicate project names exist.
    if (projectList.filter((t) => t.projectName === projectName).length > 0) {
      projectValidation.classList.remove('hidden');
      return;
    }

    // Add the new project into the project list then save to local storage
    const newProject = new CreateProject(projectName);
    projectList.push(newProject);
    saveToLocalStorage();

    // Reset the form
    e.target.reset();

    // Hide the new project pop up then refresh/reload the project list
    hideProjectForm();
    refreshDisplayProjects();
    document.querySelector('#projectCompleteList').lastChild.querySelector('.tile').click();
  });
  isHomeTile = true;
  refreshDisplayProjects();
});

//Create project constructor
function CreateProject(projectName) {
  this.projectName = projectName;
  this.lastSelected = true;
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
    const mainContainer = document.createElement('div');
    const container = document.createElement('div');
    const menuIcon = createSpanIcon('menu');
    const projectName = document.createElement('input');
    projectName.setAttribute('readonly', '');
    projectName.setAttribute('spellcheck', false);
    projectName.setAttribute('maxlength', 12);
    const editIcon = createSpanIcon('edit');
    const deleteIcon = createSpanIcon('delete');

    //adding classlist of elements above
    container.classList.add('tile');
    if (proj.lastSelected) container.classList.add('lastSelected');
    projectName.classList.add('projectName');
    deleteIcon.classList.add('projDelIcon');
    projectName.value = proj.projectName;

    //appending to DOM
    container.appendChild(menuIcon);
    container.appendChild(projectName);
    container.appendChild(editIcon);
    container.appendChild(deleteIcon);
    mainContainer.appendChild(container);
    projectCompleteList.appendChild(mainContainer);

    //delete icon logic
    deleteIcon.addEventListener('click', () => {
      projectList = projectList.filter((t) => t.projectName !== proj.projectName);
      taskList = taskList.filter((t) => t.projectName !== proj.projectName);
      saveToLocalStorage();
      refreshDisplayProjects();
      // const listFirstChild = document.querySelector('#projectCompleteList').firstChild;
      // if (listFirstChild !== null) listFirstChild.querySelector('.tile').click();
      document.getElementById('allTasks').click();
    });

    //edit icon logic
    editIcon.addEventListener('click', () => {
      projectNameEdit = container.querySelector('.projectName');
      projectNameEdit.classList.toggle('projectNameEdit');
      originalProjName = projectNameEdit.value;
      projectNameEdit.removeAttribute('readonly');
      projectNameEdit.focus();
      projectNameEdit.addEventListener('keypress', updateProject, false);
      projectNameEdit.addEventListener('blur', updateProject, false);
    });

    const updateProject = (e) => {
      // If event is blur or enter key, then check if the original project name matches the event target value, if yes then proceed.
      // This is to exclude the unchanged content in edit form from the validation of project name duplicate.
      if (e.type === 'blur' || e.key === 'Enter') {
        if (originalProjName === e.target.value) {
          projectNameEdit.classList.toggle('projectNameEdit');
        } else if (
          // validation of duplicate project name
          JSON.parse(localStorage.getItem('projectList')).filter(
            (t) => t.projectName === e.target.value
          ).length > 0
        ) {
          // input validation as element
          const validationEdit = document.createElement('div');
          validationEdit.classList.add('editProjectValidation');
          validationEdit.classList.add('validation');
          validationEdit.textContent = 'Duplicate project name not allowed. Reverting back.';
          mainContainer.appendChild(validationEdit);
          projectNameEdit.setAttribute('readonly', true);
          projectNameEdit.classList.toggle('projectNameEdit');
          projectNameEdit.value = originalProjName;
          return;
        }
        projectNameEdit.setAttribute('readonly', true);

        // blur upon pressing enter
        document.activeElement.blur();

        // edit the projectname on each task that is affected on the edit event
        taskListEdit = taskList;
        taskListEdit.forEach((item) => {
          if (item.projectName === originalProjName) item.projectName = e.target.value;
        });

        // set all elements into last selected false to avoid multiple last selected class
        projectList.forEach((item) => {
          item.lastSelected = false;
        });

        // set values
        proj.projectName = e.target.value;
        proj.lastSelected = true;

        saveToLocalStorage();
        refreshDisplayProjects();

        document.querySelector('.lastSelected').click();
      }
    };
  });
  //tile change logic
  tileChange();
};

// Creating tasks
//On load, get items from local storage then add the submit event handler to the form. Note to put refreshDisplayProjects in every change to reflect changes in DOM
window.addEventListener('load', () => {
  taskList = JSON.parse(localStorage.getItem('taskList')) || [];
  const newtaskForm = document.querySelector('#taskForm');

  newtaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = document.getElementById('listInput').value;
    let projectName = document.querySelector('.selected input');
    projectName === null ? (projectName = editProjNameCurrrent) : (projectName = projectName.value);

    const taskValidation = document.querySelector('.taskValidation');

    // Validation if duplicate task names exist. Compare current local storage task names to listInput element value
    if (taskName === editTitleCurrrent) {
    } else if (
      JSON.parse(localStorage.getItem('taskList')).filter(
        (t) => t.taskName + t.projectName === taskName + projectName
      ).length > 0
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
  currentTile = 'All Tasks';
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

function addDaysToDate(date, daysToAdd) {
  let newDate = new Date(date);
  newDate.setDate(date.getDate() + daysToAdd);

  return newDate;
}

function getFormattedDate(date) {
  let day = date.getDate();
  day < 10 ? (day = '0' + day) : day;
  let month = date.getMonth() + 1;
  month < 10 ? (month = '0' + month) : month;
  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

const refreshDisplayTasks = () => {
  // Set a temporary list for the changing of views in the sidebar
  taskList = JSON.parse(localStorage.getItem('taskList')) || [];
  taskListTemp = taskList;
  // prevent from rearrangement of add and form itself
  document
    .querySelector('.list-todo')
    .insertBefore(document.querySelector('#taskForm'), document.querySelector('#addList'));

  let todaysDate = new Date();

  if (currentTile === 'Important') {
    taskListTemp = taskList.filter((t) => t.important);
  } else if (currentTile === 'All Tasks') {
    taskListTemp;
  } else if (currentTile === 'Today') {
    taskListTemp = taskList.filter((t) => getFormattedDate(todaysDate) === t.dueDate);
  } else if (currentTile === 'Next 7 Days') {
    const dateFrom = getFormattedDate(addDaysToDate(todaysDate, 1));
    const dateTo = getFormattedDate(addDaysToDate(todaysDate, 7));

    const from = Date.parse(dateFrom);
    const to = Date.parse(dateTo);

    taskListTemp = taskList.filter(
      (t) => Date.parse(t.dueDate) <= to && Date.parse(t.dueDate) >= from
    );
  } else {
    taskListTemp = taskList.filter((t) => t.projectName === currentTile);
  }

  // clearing of contents of the container to reinsert task list
  const todoList = document.querySelector('#taskCompleteList > ul');
  todoList.innerHTML = '';
  taskListTemp.forEach((task) => {
    //adding elements
    const li = document.createElement('li');
    const unchecked = document.createElement('div');
    const listDetails = document.createElement('div');
    const taskTitle = document.createElement('div');
    const taskDetails = document.createElement('div');
    // const projDiv = document.createElement('div');
    const dateDiv = document.createElement('div');
    const listRight = document.createElement('div');
    const listRightIcons = document.createElement('div');
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
    // projDiv.classList.add('date');
    listRight.classList.add('list-right');
    listRightIcons.classList.add('list-right-icons');
    starContainer.classList.add('starContainer');
    starOutline.classList.add('star-outline');
    star.classList.add('important');
    task.important ? starOutline.classList.add('listHidden') : star.classList.add('listHidden');
    if (task.completed) {
      unchecked.classList.toggle('checked');
      listDetails.classList.toggle('lineThrough');
      listDetails.classList.toggle('fade');
    }
    deleteIcon.classList.add('delIcon');

    //assigning values
    isHomeTile
      ? (taskTitle.textContent = task.projectName + ' > ' + task.taskName)
      : (taskTitle.textContent = task.taskName);

    taskDetails.textContent = task.details;
    dateDiv.textContent = task.dueDate;
    // projDiv.textContent = task.projectName;

    //appending to DOM
    const ul = document.querySelector('ul');
    ul.appendChild(li);
    li.appendChild(unchecked);
    li.appendChild(listDetails);
    listDetails.appendChild(taskTitle);
    listDetails.appendChild(taskDetails);
    li.appendChild(listRight);
    // if (isHomeTile) {
    //   listRight.appendChild(projDiv);
    // }
    listRight.appendChild(dateDiv);
    listRight.appendChild(listRightIcons);
    listRightIcons.appendChild(starContainer);
    starContainer.appendChild(starOutline);
    starContainer.appendChild(star);
    listRightIcons.appendChild(editIcon);
    listRightIcons.appendChild(deleteIcon);

    //delete icon logic
    deleteIcon.addEventListener('click', () => {
      taskList = taskList.filter(
        (t) => t.taskName + t.projectName !== task.taskName + task.projectName
      );
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
      editProjNameCurrrent = task.projectName;
    });
  });
  editMode = false;
  editTitleCurrrent = '';
};
