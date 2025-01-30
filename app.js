const taskTitle = document.getAnimations("taskTitle");
const list = JSON.parse(localStorage.getItem("list")) || [];
const forml = document.querySelector("form");
let termine = document.getElementById("terminé");
document.getElementById("ajouter").addEventListener("click", AddTache);
termine.addEventListener("click", terminé);
const taskList = document.getElementById("crud");


function AddTache() {    
    forml.classList.remove("d-none");

}

function terminé() {
    forml.classList.add("d-none");
    let titre = document.getElementById("taskTitle").value.trim();
    let description = document.getElementById("taskDescription").value.trim();
    let Priorité = document.getElementById("taskPriority").value.trim();
 
    if (titre && description && Priorité) {
        const data = { titre, description, Priorité };
        list.push(data);
        
        localStorage.setItem("notes", JSON.stringify(list));
        document.getElementById('form').reset();
        
    } else {
        console.log("Please fill in all fields.");
    }
    window.location.href="index.html";
}


function AfficheTache() {
    console.log("afficher");
    
    const data = JSON.parse(localStorage.getItem("notes"));
  

    if (data) {
        
        data.forEach((dt, index) => {
            const task =innerHTML = `
            <div class="bg-white row d-flex justify-content-between align-items-center">
            <div class="col-6">
            <h3>${dt.titre}</h3>
            <p>${dt.description}</p>
            <p>${dt.Priorité}</p>
            </div>
            <div class="col-6">
            <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
            <button class="btn btn-warning"  onclick="editTask(${index})">Edit</button>
            </div>
            
            </div>
            `;
            taskList.insertAdjacentHTML("beforeend",task);
        });
    }
}
window.onload = AfficheTache;

