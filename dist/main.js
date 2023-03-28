(()=>{"use strict";var e={d:(t,a)=>{for(var d in a)e.o(a,d)&&!e.o(t,d)&&Object.defineProperty(t,d,{enumerable:!0,get:a[d]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{P:()=>g});const t=()=>{const e=document.querySelector("#projectForm"),t=document.querySelector("#projectInput"),a=document.querySelector(".projectValidation");t.value="",e.classList.add("hidden"),a.classList.add("hidden")},a=function(e){this.projectName=e,this.lastSelected=!0};document.querySelector(".projectCancelBtn").addEventListener("click",t);const d=document.querySelector("#addProject"),l=document.querySelector("#projectForm"),s=document.querySelector("#projectInput");d.addEventListener("click",(()=>{l.classList.remove("hidden"),s.focus()}));const i=(()=>{const e=()=>{const e=document.querySelector("#taskForm"),t=document.querySelector("#listInput"),a=document.querySelector("#listInputDetail"),d=document.querySelector("#listInputDate"),l=document.querySelector(".taskValidation");t.value="",a.value="",d.value="",e.classList.add("hidden"),l.classList.add("hidden"),document.querySelector(".list-todo").appendChild(e),g()};document.querySelector(".listCancelBtn").addEventListener("click",e);const t=document.querySelector("#addList"),a=document.querySelector("#taskForm"),d=document.querySelector(".listSubmitBtn"),l=document.querySelector("#editConfirm");return t.addEventListener("click",(()=>{a.classList.remove("hidden"),d.classList.remove("hidden"),l.classList.add("hidden")})),{hideListForm:e,CreateTask:function(e,t,a,d="No Due Date"){this.taskName=e,this.projectName=t,this.details=a,this.dueDate=d,this.completed=!1,this.important=!1}}})();document.querySelector("#checkbox").addEventListener("change",(()=>document.body.classList.toggle("light"))),document.querySelector(".hiddenMenu").addEventListener("click",(()=>{document.querySelector(".leftPanel").classList.toggle("hidden")}));let c="",r="",o="";window.addEventListener("load",(()=>{o=JSON.parse(localStorage.getItem("projectList"))||[],document.querySelector("#projectForm").addEventListener("submit",(e=>{e.preventDefault();const d=document.getElementById("projectInput").value,l=document.querySelector(".projectValidation");if(o.filter((e=>e.projectName===d)).length>0)return void l.classList.remove("hidden");const s=new a(d);o.push(s),n(),e.target.reset(),t(),m(),document.querySelector("#projectCompleteList").lastChild.querySelector(".tile").click()})),c=!0,m()}));const n=()=>{localStorage.setItem("projectList",JSON.stringify(o)),localStorage.setItem("taskList",JSON.stringify(p))},u=e=>{const t=document.createElement("span");return t.classList.add("material-icons-round"),t.textContent=e,t},m=()=>{document.querySelector("#projectCompleteList").innerHTML="",o.forEach((e=>{const t=document.querySelector("#projectCompleteList"),a=document.createElement("div"),d=document.createElement("div"),l=u("menu"),s=document.createElement("input");s.setAttribute("readonly",""),s.setAttribute("spellcheck",!1),s.setAttribute("maxlength",12);const i=u("edit"),c=u("delete");d.classList.add("tile"),e.lastSelected&&d.classList.add("lastSelected"),s.classList.add("projectName"),c.classList.add("projDelIcon"),s.value=e.projectName,i.setAttribute("title","Edit"),c.setAttribute("title","Delete"),d.appendChild(l),d.appendChild(s),d.appendChild(i),d.appendChild(c),a.appendChild(d),t.appendChild(a),c.addEventListener("click",(()=>{o=o.filter((t=>t.projectName!==e.projectName)),p=p.filter((t=>t.projectName!==e.projectName)),n(),m(),document.getElementById("allTasks").click()})),i.addEventListener("click",(()=>{projectNameEdit=d.querySelector(".projectName"),projectNameEdit.classList.toggle("projectNameEdit"),originalProjName=projectNameEdit.value,projectNameEdit.removeAttribute("readonly"),projectNameEdit.focus(),projectNameEdit.addEventListener("keypress",r,!1),projectNameEdit.addEventListener("blur",r,!1)}));const r=t=>{if("blur"===t.type||"Enter"===t.key){if(originalProjName===t.target.value)projectNameEdit.classList.toggle("projectNameEdit");else if(JSON.parse(localStorage.getItem("projectList")).filter((e=>e.projectName===t.target.value)).length>0){const e=document.createElement("div");return e.classList.add("editProjectValidation"),e.classList.add("validation"),e.textContent="Duplicate project name not allowed. Reverting back.",a.appendChild(e),projectNameEdit.setAttribute("readonly",!0),projectNameEdit.classList.toggle("projectNameEdit"),void(projectNameEdit.value=originalProjName)}projectNameEdit.setAttribute("readonly",!0),document.activeElement.blur(),taskListEdit=p,taskListEdit.forEach((e=>{e.projectName===originalProjName&&(e.projectName=t.target.value)})),o.forEach((e=>{e.lastSelected=!1})),e.projectName=t.target.value,e.lastSelected=!0,n(),m(),document.querySelector(".lastSelected").click()}}})),(()=>{const e=document.querySelectorAll(".tile"),t=document.querySelector("#addList"),a=document.querySelector(".title");e.forEach((d=>d.addEventListener("click",(d=>{JSON.stringify(d.target.classList).includes("projDelIcon")||(e.forEach((e=>{e.classList.remove("selected")})),d.target.closest(".tile").classList.add("selected"),c=JSON.stringify(d.target.closest(".tile").classList).includes("homeTiles"),c?(t.classList.add("hidden"),r=d.target.closest(".tile").querySelector("div").textContent,a.innerHTML=r):(t.classList.remove("hidden"),r=d.target.closest(".tile").querySelector("input").value,a.innerHTML=r),null!==document.querySelector(".editProjectValidation")&&document.querySelector(".editProjectValidation").remove(),i.hideListForm(),g())}))))})()};let p="",L=!1,h="",v="";var y,S;window.addEventListener("load",(()=>{p=JSON.parse(localStorage.getItem("taskList"))||[],document.querySelector("#taskForm").addEventListener("submit",(e=>{e.preventDefault();const t=document.getElementById("listInput").value;let a=document.querySelector(".selected input");a=null===a?v:a.value;const d=document.querySelector(".taskValidation");if(t===h);else if(JSON.parse(localStorage.getItem("taskList")).filter((e=>e.taskName+e.projectName===t+a)).length>0)return void d.classList.remove("hidden");if(!L){let e=document.getElementById("listInputDetail").value;""===e&&(e="No details");let d=document.getElementById("listInputDate").value;""===d&&(d="No Due Date");const l=new i.CreateTask(t,a,e,d);p.push(l)}n(),e.target.reset(),i.hideListForm(),g()})),r="All Tasks",g()})),y=document.getElementById("listInput"),S=document.querySelector(".listSubmitBtn"),y.addEventListener("input",(e=>{""!==e.target.value?(S.disabled=!1,S.classList.remove("disabled")):(S.classList.add("disabled"),S.disabled=!0)}));const g=()=>{function e(e,t){let a=new Date(e);return a.setDate(e.getDate()+t),a}function t(e){let t=e.getDate();t<10&&(t="0"+t);let a=e.getMonth()+1;return a<10&&(a="0"+a),`${e.getFullYear()}-${a}-${t}`}p=JSON.parse(localStorage.getItem("taskList"))||[];let a="";a=p,0===p.length&&c?document.querySelector(".noTask").classList.remove("hidden"):document.querySelector(".noTask").classList.add("hidden"),document.querySelector(".list-todo").insertBefore(document.querySelector("#taskForm"),document.querySelector("#addList"));let d=new Date;if("Important"===r)a=p.filter((e=>e.important));else if("All Tasks"===r);else if("Today"===r)a=p.filter((e=>t(d)===e.dueDate));else if("Next 7 Days"===r){const l=t(e(d,1)),s=t(e(d,7)),i=Date.parse(l),c=Date.parse(s);a=p.filter((e=>Date.parse(e.dueDate)<=c&&Date.parse(e.dueDate)>=i))}else a=p.filter((e=>e.projectName===r));document.querySelector("#taskCompleteList > ul").innerHTML="",a.forEach((e=>{const t=document.createElement("li"),a=document.createElement("div"),d=document.createElement("div"),l=document.createElement("div"),s=document.createElement("div"),i=document.createElement("div"),r=document.createElement("div"),o=document.createElement("div"),m=document.createElement("div"),y=u("star_outline"),S=u("star"),E=u("edit"),j=u("delete");a.classList.add("unchecked"),d.classList.add("list-details"),l.classList.add("taskTitle"),s.classList.add("taskDetails"),i.classList.add("date"),r.classList.add("list-right"),o.classList.add("list-right-icons"),m.classList.add("starContainer"),y.classList.add("star-outline"),S.classList.add("important"),y.setAttribute("title","Mark as Important"),e.important?y.classList.add("listHidden"):S.classList.add("listHidden"),e.completed&&(a.classList.toggle("checked"),d.classList.toggle("lineThrough"),d.classList.toggle("fade")),j.classList.add("delIcon"),l.textContent=c?e.projectName+" > "+e.taskName:l.textContent=e.taskName,s.textContent=e.details,i.textContent=e.dueDate,E.setAttribute("title","Edit"),j.setAttribute("title","Delete"),document.querySelector("ul").appendChild(t),t.appendChild(a),t.appendChild(d),d.appendChild(l),d.appendChild(s),t.appendChild(r),r.appendChild(i),r.appendChild(o),o.appendChild(m),m.appendChild(y),m.appendChild(S),o.appendChild(E),o.appendChild(j),j.addEventListener("click",(()=>{p=p.filter((t=>t.taskName+t.projectName!==e.taskName+e.projectName)),n(),g()})),a.addEventListener("click",(()=>{!0===e.completed?e.completed=!1:e.completed=!0,n(),g()})),m.addEventListener("click",(()=>{!0===e.important?e.important=!1:e.important=!0,n(),g()})),E.addEventListener("click",(()=>{L=!0;const a=document.createElement("div");a.classList.add("containerEdit"),t.querySelector(".unchecked").classList.add("hidden"),t.querySelector(".list-details").classList.add("hidden"),t.querySelector(".list-right").classList.add("hidden"),t.insertBefore(a,t.querySelector(".unchecked")),a.appendChild(document.getElementById("taskForm")),document.getElementById("taskForm").classList.remove("hidden");let d=document.querySelector("#listInput"),l=document.querySelector("#listInputDetail"),s=document.querySelector("#listInputDate");d.value=e.taskName,l.value=e.details,s.value=e.dueDate,document.querySelector("#editConfirm").classList.remove("hidden"),document.querySelector(".listSubmitBtn").classList.add("hidden");const i=document.querySelector("#taskForm > .inputField");for(const t of i.children)t.addEventListener("change",(()=>{e.taskName=d.value,e.details=l.value,e.dueDate=s.value||"No Due Date"}));h=e.taskName,v=e.projectName}))})),L=!1,h=""}})();