const projectFunc = (() => {
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

  //Create project constructor
  function CreateProject(projectName) {
    this.projectName = projectName;
    this.lastSelected = true; // to select newly created project
  }

  return { hideProjectForm, CreateProject };
})();

//Cancel button
const projectCancelBtn = document.querySelector('.projectCancelBtn');
projectCancelBtn.addEventListener('click', projectFunc.hideProjectForm);

//Adding of project
const addProject = document.querySelector('#addProject');
const projectForm = document.querySelector('#projectForm');
const projectInput = document.querySelector('#projectInput');
addProject.addEventListener('click', () => {
  projectForm.classList.remove('hidden');
  projectInput.focus();
});

export { projectFunc };
