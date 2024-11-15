enum Gender {
    Female = "Female",
    Male = "Male",
    Unspecified = "Unspecified",
}

enum FitnessProgram {
    FatLoss = "fat loss",
    SeniorFitness = "senior fitness",
    MuscleGain = "muscle gain",
    PrePostnatalFitness = "pre/postnatal fitness",
    ContestPreparation = "contest preparation",
    OverallFitness = "overall fitness",
}

console.log("Hello, TypeScript!");

interface Client {
    clientID: string;
    name: string;
    DOB: Date;
    gender: Gender;
    fitnessProgram: FitnessProgram;
    contactInfo: string;
    joinedDate: Date;
    endingDate: Date;
    specialHealthNotes?: string;
    isVIP: boolean;
}

// Client database
const clients: Client[] = [];

// Add client
function addClient(newClient: Client): void {
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
function displayClientsInUI(): void {
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
                const target = event.target as HTMLButtonElement;
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

                const target = event.target as HTMLButtonElement;
                const clientID = target.getAttribute("data-client-id");
                if (clientID) {
                    const client = searchClientByID(clientID);
                    if (client) {
                        //get client data
                        (document.getElementById("clientID") as HTMLInputElement).value = client.clientID;
                        (document.getElementById("name") as HTMLInputElement).value = client.name;
                        (document.getElementById("DOB") as HTMLInputElement).value = client.DOB.toISOString().split("T")[0];
                        (document.getElementById("gender") as HTMLSelectElement).value = client.gender;
                        (document.getElementById("fitnessProgram") as HTMLSelectElement).value = client.fitnessProgram;
                        (document.getElementById("contactInfo") as HTMLInputElement).value = client.contactInfo;
                        (document.getElementById("joinedDate") as HTMLInputElement).value = client.joinedDate.toISOString().split("T")[0];
                        (document.getElementById("endingDate") as HTMLInputElement).value = client.endingDate.toISOString().split("T")[0];
                        (document.getElementById("specialHealthNotes") as HTMLTextAreaElement).value = client.specialHealthNotes || "";
                        (document.getElementById("isVIP") as HTMLInputElement).checked = client.isVIP;

                        // Switch buttons
                        (document.getElementById("addClientButton") as HTMLButtonElement).style.display = "none";
                        (document.getElementById("updateClientButton") as HTMLButtonElement).style.display = "inline-block";
                    }
                }
            });
        });
    }
}

// search client
function searchClientByID(clientID: string): Client | undefined {
    return clients.find(client => client.clientID === clientID);
}

// Delete client
function deleteClient(clientID: string): void {
    const index = clients.findIndex(client => client.clientID === clientID);
    if (index !== -1) {
        if (confirm(`Are you sure you want to delete client ${clientID}?`)) {
            clients.splice(index, 1);
            console.log(`Client ${clientID} deleted successfully!`);
            displayClientsInUI();
            displayVIPClientsInUI();

        }
    } else {
        console.error("Client not found!");
    }
}

// form submition
document.getElementById("clientForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const newClient: Client = {
        clientID: (document.getElementById("clientID") as HTMLInputElement).value,
        name: (document.getElementById("name") as HTMLInputElement).value,
        DOB: new Date((document.getElementById("DOB") as HTMLInputElement).value),
        gender: Gender[(document.getElementById("gender") as HTMLSelectElement).value as keyof typeof Gender],
        fitnessProgram: FitnessProgram[(document.getElementById("fitnessProgram") as HTMLSelectElement).value as keyof typeof FitnessProgram] || FitnessProgram.OverallFitness,
        contactInfo: (document.getElementById("contactInfo") as HTMLInputElement).value,
        joinedDate: new Date((document.getElementById("joinedDate") as HTMLInputElement).value),
        endingDate: new Date((document.getElementById("endingDate") as HTMLInputElement).value),
        specialHealthNotes: (document.getElementById("specialHealthNotes") as HTMLTextAreaElement).value,
        isVIP: (document.getElementById("isVIP") as HTMLInputElement).checked,
    };

    addClient(newClient);

    // Reset the form after submission
    const form = document.getElementById("clientForm") as HTMLFormElement;
    if (form) {
        form.reset();
    }
});


document.getElementById("searchForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const searchID = (document.getElementById("searchID") as HTMLInputElement).value;
    const client = searchClientByID(searchID);
    const searchResult = document.getElementById("searchResult");
    if (searchResult) {
        searchResult.innerHTML = client
            ? `<p>Found: ${client.name}, Program: ${client.fitnessProgram}, VIP: ${client.isVIP ? "Yes" : "No"}</p>`
            : "<p>Client not found.</p>";
    }
});

function updateClient(updatedClient: Client): void {
    const index = clients.findIndex(client => client.clientID === updatedClient.clientID);
    if (index !== -1) {
        clients[index] = updatedClient;
        console.log(`Client ${updatedClient.clientID} updated successfully!`);
        displayClientsInUI();
        displayVIPClientsInUI();
    } else {
        console.error("Client not found!");
    }
}


const editButtons = document.querySelectorAll(".edit-btn");
editButtons.forEach(button => {
    button.addEventListener("click", (event) => {

        // log the event
        console.log("Hi");

        const target = event.target as HTMLButtonElement;
        const clientID = target.getAttribute("data-client-id");
        if (clientID) {
            const client = searchClientByID(clientID);
            if (client) {
                //get client data
                (document.getElementById("clientID") as HTMLInputElement).value = client.clientID;
                (document.getElementById("name") as HTMLInputElement).value = client.name;
                (document.getElementById("DOB") as HTMLInputElement).value = client.DOB.toISOString().split("T")[0];
                (document.getElementById("gender") as HTMLSelectElement).value = client.gender;
                (document.getElementById("fitnessProgram") as HTMLSelectElement).value = client.fitnessProgram;
                (document.getElementById("contactInfo") as HTMLInputElement).value = client.contactInfo;
                (document.getElementById("joinedDate") as HTMLInputElement).value = client.joinedDate.toISOString().split("T")[0];
                (document.getElementById("endingDate") as HTMLInputElement).value = client.endingDate.toISOString().split("T")[0];
                (document.getElementById("specialHealthNotes") as HTMLTextAreaElement).value = client.specialHealthNotes || "";
                (document.getElementById("isVIP") as HTMLInputElement).checked = client.isVIP;

                // Switch buttons
                (document.getElementById("addClientButton") as HTMLButtonElement).style.display = "none";
                (document.getElementById("updateClientButton") as HTMLButtonElement).style.display = "inline-block";
            }
        }
    });
});

document.getElementById("updateClientButton")?.addEventListener("click", () => {
    const updatedClient: Client = {
        clientID: (document.getElementById("clientID") as HTMLInputElement).value,
        name: (document.getElementById("name") as HTMLInputElement).value,
        DOB: new Date((document.getElementById("DOB") as HTMLInputElement).value),
        gender: Gender[(document.getElementById("gender") as HTMLSelectElement).value as keyof typeof Gender],
        fitnessProgram: FitnessProgram[(document.getElementById("fitnessProgram") as HTMLSelectElement).value as keyof typeof FitnessProgram],
        contactInfo: (document.getElementById("contactInfo") as HTMLInputElement).value,
        joinedDate: new Date((document.getElementById("joinedDate") as HTMLInputElement).value),
        endingDate: new Date((document.getElementById("endingDate") as HTMLInputElement).value),
        specialHealthNotes: (document.getElementById("specialHealthNotes") as HTMLTextAreaElement).value,
        isVIP: (document.getElementById("isVIP") as HTMLInputElement).checked,
    };

    updateClient(updatedClient);

    // Reset form
    (document.getElementById("clientForm") as HTMLFormElement).reset();
    (document.getElementById("addClientButton") as HTMLButtonElement).style.display = "inline-block";
    (document.getElementById("updateClientButton") as HTMLButtonElement).style.display = "none";
});


function displayVIPClientsInUI(): void {
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
function initializeData(): void {
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
