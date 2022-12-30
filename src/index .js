//Adding of project
const addProject = document.querySelector('#addProject')
const projectForm = document.querySelector('#projectForm')

addProject.addEventListener('click', function () {
  projectForm.classList.remove('hidden')
})

//Adding of task
const addList = document.querySelector('#addList')
const listForm = document.querySelector('#listForm')

addList.addEventListener('click', function () {
  listForm.classList.remove('hidden')
})
