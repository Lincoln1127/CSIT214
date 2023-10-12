const request = indexedDB.open("developersDB", 2);
let db;

request.onupgradeneeded = function (event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("developers", {keyPath: "developerID"});
    objectStore.createIndex("homepageURL", "homepageURL", {unique: false});
    objectStore.createIndex("location", "location", {unique: false});
};

request.onsuccess = function (event) {
    db = event.target.result;
    flushTable()
}


function close() {
    const dialog = document.getElementById("dialog");
    dialog.close();
}

$(document).ready(function () {
    const addBtn = document.getElementById("addBtn");
    const dialog = document.getElementById("dialog");
    const closeBtn = document.getElementById("closeBtn");
    const submitBtn = document.getElementById("submitBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const deleteAllBtn = document.getElementById("delete-all-button");
    const deleteLastBtn = document.getElementById("delete-last-button");

    addBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    closeBtn.addEventListener("click", () => {
        dialog.close();
    });
    submitBtn.addEventListener("click", () => {
        const developerID = document.getElementById("id").value;
        const homepageURL = document.getElementById("url").value;  // Changed from "id" to "url"
        const location = document.getElementById("location").value;
    
        const transaction = db.transaction(["developers"], "readwrite");
        const objectStore = transaction.objectStore("developers");
        const request = objectStore.get(developerID);
        request.onsuccess = function (event) {
            const result = event.target.result;
            if (result) {
                alert("The developerID is already in the database");
            } else {
                const addRequest = objectStore.add({
                    developerID: developerID,
                    homepageURL: homepageURL,
                    location: location
                });
                addRequest.onsuccess = function (event) {
                    alert("Successfully added");
                    document.getElementById("id").value = "";
                    document.getElementById("url").value = "";
                    document.getElementById("location").value = "";
                    flushTable();
                    dialog.close();
                };
                addRequest.onerror = function (event) {
                    alert("Failed to add");
                };
            }
        };
    });
    

    deleteBtn.addEventListener("click", () => {
        deleteDeveloper()
    })
    deleteLastBtn.addEventListener("click", () => {
        deleteLastDeveloper()
    })
    deleteAllBtn.addEventListener("click", () => {
        deleteAllDeveloper()
    })

})

function addDeveloper(developerID, homepageURL, location) {
    const table = document.getElementById("developer-table");
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerText = developerID;
    cell2.innerText = homepageURL;
    cell3.innerText = location;
}

function flushTable() {
    const table = document.getElementById("developer-table");
    const rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    db.transaction(["developers"], "readonly").objectStore("developers").openCursor().onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            addDeveloper(cursor.value.developerID, cursor.value.homepageURL, cursor.value.location);
            cursor.continue();
        }
    }
}

function deleteLastDeveloper() {
    const table = document.getElementById("developer-table");
    const rowCount = table.rows.length;
    if (rowCount > 1) {
        const developerID = table.rows[rowCount - 1].cells[0].innerText;
        const transaction = db.transaction(["developers"], "readwrite");
        const objectStore = transaction.objectStore("developers");
        const request = objectStore.delete(developerID);
        request.onsuccess = function (event) {
            flushTable()
        }
    }

}

function deleteAllDeveloper() {
    const table = document.getElementById("developer-table");
    const rowCount = table.rows.length;
    if (rowCount > 1) {
        const transaction = db.transaction(["developers"], "readwrite");
        const objectStore = transaction.objectStore("developers");
        const request = objectStore.clear();
        request.onsuccess = function (event) {
            flushTable()
        }
    }
}

function deleteDeveloper() {
    console.log("deleteDeveloper")
    const developerID = document.getElementById("delete-id").value;
    const transaction = db.transaction(["developers"], "readwrite");
    const objectStore = transaction.objectStore("developers");
    const request = objectStore.delete(developerID);
    request.onsuccess = function (event) {
        flushTable()
    }
}