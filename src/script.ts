interface Client {
    clientID: string;
    name: string;
    DOB: Date;
    gender: "Female" | "Male" ;
    fitnessProgram: "fat loss" | "senior fitness" | "muscle gain" | "pre/postnatal fitness" | "contest preparation" | "overall fitness";
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
    if (clients.some(client => client.clientID === newClient.clientID)) {
        console.error("Client ID must be unique!");
        return;
    }
    clients.push(newClient);
    console.log("Client added successfully!");
    displayClientsInUI();
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
        gender: (document.getElementById("gender") as HTMLSelectElement).value as Client["gender"],
        fitnessProgram: (document.getElementById("fitnessProgram") as HTMLSelectElement).value as Client["fitnessProgram"],
        contactInfo: (document.getElementById("contactInfo") as HTMLInputElement).value,
        joinedDate: new Date((document.getElementById("joinedDate") as HTMLInputElement).value),
        endingDate: new Date((document.getElementById("endingDate") as HTMLInputElement).value),
        specialHealthNotes: (document.getElementById("specialHealthNotes") as HTMLTextAreaElement).value,
        isVIP: (document.getElementById("isVIP") as HTMLInputElement).checked,
    };

    addClient(newClient);
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


// sample data
function initializeData(): void {
    clients.push({
        clientID: "1",
        name: "Test User",
        DOB: new Date(1999, 1, 15),
        gender: "Male",
        fitnessProgram: "muscle gain",
        contactInfo: "testuser@gmail.com",
        joinedDate: new Date(2024, 0, 10),
        endingDate: new Date(2025, 0, 10),
        specialHealthNotes: "abcd",
        isVIP: true
    });
    displayClientsInUI();
}

initializeData();
