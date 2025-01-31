const taskTitle = document.getElementById("taskTitle");
const list = JSON.parse(localStorage.getItem("notes")) || [];
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
    window.location.href = "index.html";
}

function AfficheTache() {
    taskList.innerHTML = ""; // Réinitialiser l'affichage pour éviter les doublons
    
    const data = JSON.parse(localStorage.getItem("notes"));

    if (data) {
        data.forEach((dt, index) => {
            const task = `
                <div class="bg-white row d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
                    <div class="col-6">
                        <h3>${dt.titre}</h3>
                        <p>Description: ${dt.description}</p>
                        <p>Priorité: ${dt.Priorité}</p>
                    </div>
                    <div class="col-6 text-end">
                        <button class="btn btn-danger me-2" onclick="deleteTask(${index})">Supprimer</button>
                        <button class="btn btn-warning" onclick="editTask(${index})">Modifier</button>
                    </div>
                </div>
            `;
            taskList.insertAdjacentHTML("beforeend", task);
        });
    }
}

function deleteTask(index) {
    const data = JSON.parse(localStorage.getItem("notes"));
    data.splice(index, 1); // Supprimer la tâche
    localStorage.setItem("notes", JSON.stringify(data));
    AfficheTache(); // Réafficher la liste après suppression
}

function editTask(index) {
    const data = JSON.parse(localStorage.getItem("notes"));

    // Pré-remplir les champs du formulaire avec les données de la tâche sélectionnée
    document.getElementById("taskTitle").value = data[index].titre;
    document.getElementById("taskDescription").value = data[index].description;
    document.getElementById("taskPriority").value = data[index].Priorité;

    // Afficher le formulaire
    forml.classList.remove("d-none");

    // Ajouter un événement temporaire pour sauvegarder la modification
    termine.removeEventListener("click", terminé); // Retirer tout ancien événement
    termine.addEventListener("click", function updateTask() {
        // Récupérer les valeurs mises à jour
        let titre = document.getElementById("taskTitle").value.trim();
        let description = document.getElementById("taskDescription").value.trim();
        let Priorité = document.getElementById("taskPriority").value.trim();

        // Vérifier si tous les champs sont remplis
        if (titre && description && Priorité) {
            // Mettre à jour la tâche existante
            data[index] = { titre, description, Priorité };
            localStorage.setItem("notes", JSON.stringify(data));

            // Réinitialiser le formulaire et réafficher les tâches
            document.getElementById("form").reset();
            AfficheTache();
        } else {
            console.log("Veuillez remplir tous les champs.");
        }

        // Masquer le formulaire
        forml.classList.add("d-none");

        // Nettoyer l'événement pour éviter des conflits
        termine.removeEventListener("click", updateTask);
        termine.addEventListener("click", terminé);
    });
}


window.onload = AfficheTache;
