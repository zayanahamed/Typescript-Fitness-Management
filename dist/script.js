"use strict";
var _a, _b, _c;
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
console.log("Hello, TypeScript!");
// Client database
const clients = [];
// Add client
function addClient(newClient) {
    const feedbackMessage = document.getElementById("feedbackMessage");
    if (clients.some(client => client.clientID === newClient.clientID)) {
        if (feedbackMessage) {
            feedbackMessage.style.color = "red";
            feedbackMessage.textContent = "Error: Client ID must be unique!";
        }
        return;
    }
    clients.push(newClient);
    if (feedbackMessage) {
        feedbackMessage.style.color = "green";
        feedbackMessage.textContent = "Client added successfully!";
    }
    displayClientsInUI();
    displayVIPClientsInUI();
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
                <button class="edit-btn" data-client-id="${client.clientID}">Edit</button>
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
        const editButtons = document.querySelectorAll(".edit-btn");
        editButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                // log the event
                console.log("Hi");
                const target = event.target;
                const clientID = target.getAttribute("data-client-id");
                if (clientID) {
                    const client = searchClientByID(clientID);
                    if (client) {
                        //get client data
                        document.getElementById("clientID").value = client.clientID;
                        document.getElementById("name").value = client.name;
                        document.getElementById("DOB").value = client.DOB.toISOString().split("T")[0];
                        document.getElementById("gender").value = client.gender;
                        document.getElementById("fitnessProgram").value = client.fitnessProgram;
                        document.getElementById("contactInfo").value = client.contactInfo;
                        document.getElementById("joinedDate").value = client.joinedDate.toISOString().split("T")[0];
                        document.getElementById("endingDate").value = client.endingDate.toISOString().split("T")[0];
                        document.getElementById("specialHealthNotes").value = client.specialHealthNotes || "";
                        document.getElementById("isVIP").checked = client.isVIP;
                        // Switch buttons
                        document.getElementById("addClientButton").style.display = "none";
                        document.getElementById("updateClientButton").style.display = "inline-block";
                    }
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
            displayVIPClientsInUI();
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
        fitnessProgram: FitnessProgram[document.getElementById("fitnessProgram").value] || FitnessProgram.OverallFitness,
        contactInfo: document.getElementById("contactInfo").value,
        joinedDate: new Date(document.getElementById("joinedDate").value),
        endingDate: new Date(document.getElementById("endingDate").value),
        specialHealthNotes: document.getElementById("specialHealthNotes").value,
        isVIP: document.getElementById("isVIP").checked,
    };
    addClient(newClient);
    // Reset the form after submission
    const form = document.getElementById("clientForm");
    if (form) {
        form.reset();
    }
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
function updateClient(updatedClient) {
    const index = clients.findIndex(client => client.clientID === updatedClient.clientID);
    if (index !== -1) {
        clients[index] = updatedClient;
        console.log(`Client ${updatedClient.clientID} updated successfully!`);
        displayClientsInUI();
        displayVIPClientsInUI();
    }
    else {
        console.error("Client not found!");
    }
}
const editButtons = document.querySelectorAll(".edit-btn");
editButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        // log the event
        console.log("Hi");
        const target = event.target;
        const clientID = target.getAttribute("data-client-id");
        if (clientID) {
            const client = searchClientByID(clientID);
            if (client) {
                //get client data
                document.getElementById("clientID").value = client.clientID;
                document.getElementById("name").value = client.name;
                document.getElementById("DOB").value = client.DOB.toISOString().split("T")[0];
                document.getElementById("gender").value = client.gender;
                document.getElementById("fitnessProgram").value = client.fitnessProgram;
                document.getElementById("contactInfo").value = client.contactInfo;
                document.getElementById("joinedDate").value = client.joinedDate.toISOString().split("T")[0];
                document.getElementById("endingDate").value = client.endingDate.toISOString().split("T")[0];
                document.getElementById("specialHealthNotes").value = client.specialHealthNotes || "";
                document.getElementById("isVIP").checked = client.isVIP;
                // Switch buttons
                document.getElementById("addClientButton").style.display = "none";
                document.getElementById("updateClientButton").style.display = "inline-block";
            }
        }
    });
});
(_c = document.getElementById("updateClientButton")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    const updatedClient = {
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
    updateClient(updatedClient);
    // Reset form
    document.getElementById("clientForm").reset();
    document.getElementById("addClientButton").style.display = "inline-block";
    document.getElementById("updateClientButton").style.display = "none";
});
function displayVIPClientsInUI() {
    const vipClientList = document.getElementById("vipClientList");
    if (vipClientList) {
        vipClientList.innerHTML = "";
        clients
            .filter(client => client.isVIP)
            .forEach(client => {
            const clientDiv = document.createElement("div");
            clientDiv.className = "vip-client-entry";
            clientDiv.innerHTML = `
                    <span>${client.clientID}: ${client.name} (${client.fitnessProgram})</span>
                `;
            vipClientList.appendChild(clientDiv);
        });
    }
}
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
