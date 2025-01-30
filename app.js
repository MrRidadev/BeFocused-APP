const taskTitle = document.getAnimations("taskTitle");
const list = [];
const forml = document.querySelector("form");
let termine = document.getElementById("terminé");
document.getElementById("ajouter").addEventListener("click", AddTache);
termine.addEventListener("click", terminé);
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
        deleteinput();
    } else {
        console.log("Please fill in all fields.");
    }
}

