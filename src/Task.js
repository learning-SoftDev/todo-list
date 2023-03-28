import { refreshDisplayTasks } from './index.js';

const taskFunc = (() => {
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

  //Event listeners
  const listCancelBtn = document.querySelector('.listCancelBtn');
  listCancelBtn.addEventListener('click', hideListForm);

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

  //Create task constructor
  function CreateTask(taskName, projectName, details, dueDate = 'No Due Date') {
    this.taskName = taskName;
    this.projectName = projectName;
    this.details = details;
    this.dueDate = dueDate;
    this.completed = false;
    this.important = false;
  }

  return { hideListForm, CreateTask };
})();

export { taskFunc };
