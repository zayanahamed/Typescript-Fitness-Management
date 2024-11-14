"use strict";
var _a, _b;
var Gender;
(function (Gender) {
    Gender["Female"] = "Female";
    Gender["Male"] = "Male";
    Gender["Unspecified"] = "Unspecified";
})(Gender || (Gender = {}));
var FitnessProgram;
(function (FitnessProgram) {
    FitnessProgram["FatLoss"] = "fat loss";
    FitnessProgram["SeniorFitness"] = "senior fitness";
    FitnessProgram["MuscleGain"] = "muscle gain";
    FitnessProgram["PrePostnatalFitness"] = "pre/postnatal fitness";
    FitnessProgram["ContestPreparation"] = "contest preparation";
    FitnessProgram["OverallFitness"] = "overall fitness";
})(FitnessProgram || (FitnessProgram = {}));
// Client database
const clients = [];
// Add client
function addClient(newClient) {
    if (clients.some(client => client.clientID === newClient.clientID)) {
        console.error("Client ID must be unique!");
        return;
    }
    clients.push(newClient);
    console.log("Client added successfully!");
    displayClientsInUI();
}
// Display client
function displayClientsInUI() {
    const clientList = document.getElementById("clientList");
    if (clientList) {
        clientList.innerHTML = "";
        clients.forEach(client => {
            const clientDiv = document.createElement("div");
            clientDiv.className = "client-entry";
            clientDiv.innerHTML = `
                <span>${client.clientID}: ${client.name} (${client.fitnessProgram}) - VIP: ${client.isVIP ? "Yes" : "No"}</span>
                <button class="delete-btn" data-client-id="${client.clientID}">Delete</button>
            `;
            clientList.appendChild(clientDiv);
        });
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target;
                const clientID = target.getAttribute("data-client-id");
                if (clientID) {
                    deleteClient(clientID);
                }
            });
        });
    }
}
// search client
function searchClientByID(clientID) {
    return clients.find(client => client.clientID === clientID);
}
// Delete client
function deleteClient(clientID) {
    const index = clients.findIndex(client => client.clientID === clientID);
    if (index !== -1) {
        if (confirm(`Are you sure you want to delete client ${clientID}?`)) {
            clients.splice(index, 1);
            console.log(`Client ${clientID} deleted successfully!`);
            displayClientsInUI();
        }
    }
    else {
        console.error("Client not found!");
    }
}
// form submition
(_a = document.getElementById("clientForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", event => {
    event.preventDefault();
    const newClient = {
        clientID: document.getElementById("clientID").value,
        name: document.getElementById("name").value,
        DOB: new Date(document.getElementById("DOB").value),
        gender: Gender[document.getElementById("gender").value],
        fitnessProgram: FitnessProgram[document.getElementById("fitnessProgram").value],
        contactInfo: document.getElementById("contactInfo").value,
        joinedDate: new Date(document.getElementById("joinedDate").value),
        endingDate: new Date(document.getElementById("endingDate").value),
        specialHealthNotes: document.getElementById("specialHealthNotes").value,
        isVIP: document.getElementById("isVIP").checked,
    };
    addClient(newClient);
});
(_b = document.getElementById("searchForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", event => {
    event.preventDefault();
    const searchID = document.getElementById("searchID").value;
    const client = searchClientByID(searchID);
    const searchResult = document.getElementById("searchResult");
    if (searchResult) {
        searchResult.innerHTML = client
            ? `<p>Found: ${client.name}, Program: ${client.fitnessProgram}, VIP: ${client.isVIP ? "Yes" : "No"}</p>`
            : "<p>Client not found.</p>";
    }
});
// sample data
function initializeData() {
    clients.push({
        clientID: "1",
        name: "Test User",
        DOB: new Date(1999, 1, 15),
        gender: Gender.Male,
        fitnessProgram: FitnessProgram.MuscleGain,
        contactInfo: "testuser@gmail.com",
        joinedDate: new Date(2024, 0, 10),
        endingDate: new Date(2025, 0, 10),
        specialHealthNotes: "abcd",
        isVIP: true
    });
    displayClientsInUI();
}
initializeData();
