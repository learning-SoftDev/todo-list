//Cancel button - hide project form
export const DOMManipulator = () => {
  const hideProjectForm = () => {
    const projectForm = document.querySelector('#projectForm');
    const projectInput = document.querySelector('#projectInput');
    const projectValidation = document.querySelector('.projectValidation');
    //reset value
    projectInput.value = '';
    projectForm.classList.add('hidden');
    projectValidation.classList.add('hidden');
  };
};
