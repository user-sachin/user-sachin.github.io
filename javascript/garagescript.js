let allVehicles = [];
let garageVehicles = [];

let faultList = ["engine", "a/c", "brake", "tyre", "clutch"];
let faultListPrice = [100, 50, 60, 35, 80];

let faultListPriceArray = []
for (let i = 0; i < faultList.length; i++) {
    let faultListPriceObject = {
        part: faultList[i],
        price: faultListPrice[i]
    }
    faultListPriceArray.push(faultListPriceObject);
}

let serviceFee = 25;

let faultCount = 0;

function hideAllVehicles() {
    let divViewVehicles = document.getElementById("divViewVehicles");
    while (divViewVehicles.firstChild) {
        divViewVehicles.removeChild(divViewVehicles.firstChild);
    }
    document.getElementById("viewAllVeichles").disabled = false;
}

function displayGarageVeichles(vehicleBeingPassed) {
    hideAllVehicles();
    hideAddVehicleFields();
    if (garageVehicles.length > 0) {
        let vehiclesList = document.createElement("SELECT");
        vehiclesList.setAttribute("id", "vehiclesList");
        divViewVehicles.appendChild(vehiclesList);

        divViewVehicles.appendChild(document.createElement("br"));
        
        let removeVeichleFromGarageButton = document.createElement("button");
        removeVeichleFromGarageButton.setAttribute("id", "removeVeichleFromGarageButton");
        removeVeichleFromGarageButton.setAttribute("class", "bottomButtons");        
        let removeVeichleFromGarageButtonText = document.createTextNode("Check out from garage");
        removeVeichleFromGarageButton.appendChild(removeVeichleFromGarageButtonText);
        removeVeichleFromGarageButton.setAttribute("onclick", "confirmRemoveCarFromGarage()");
        divViewVehicles.appendChild(removeVeichleFromGarageButton);

        let viewVeichleCostButton = document.createElement("button");
        viewVeichleCostButton.setAttribute("id", "viewVeichleCostButton");
        viewVeichleCostButton.setAttribute("class", "bottomButtons");        
        let viewVeichleCostButtonText = document.createTextNode("View costs");
        viewVeichleCostButton.appendChild(viewVeichleCostButtonText);
        viewVeichleCostButton.setAttribute("onclick", "viewVeichleCost()");
        divViewVehicles.appendChild(viewVeichleCostButton);

        let clearGarageButton = document.createElement("button");
        clearGarageButton.setAttribute("id", "clearGarageButton");
        clearGarageButton.setAttribute("class", "bottomButtons");        
        let clearGarageButtonText = document.createTextNode("Clear garage");
        clearGarageButton.appendChild(clearGarageButtonText);
        clearGarageButton.setAttribute("onclick", "clearGarageConfirmation()");
        divViewVehicles.appendChild(clearGarageButton);
    }
    else {

        let vehicleRow = document.createElement("label");
        vehicleRow.setAttribute("id", "vehicleRow");
        vehicleRow.setAttribute("class", "vehicleRow");
        let vehicleRowText = document.createTextNode("No veichles in garage");
        vehicleRow.appendChild(vehicleRowText);
        divViewVehicles.appendChild(vehicleRow);
        divViewVehicles.appendChild(document.createElement("br"));        
    }
    for (let i = 0; i < garageVehicles.length; i++) {
        let vehicleOption = document.createElement("option");
        vehicleOption.setAttribute("value", garageVehicles[i].registration);
        let vehicleOptionText = document.createTextNode(garageVehicles[i].registration + " (" + garageVehicles[i].type + ")");
        vehicleOption.appendChild(vehicleOptionText);
        document.getElementById("vehiclesList").appendChild(vehicleOption);

    }
    if (vehicleBeingPassed != null || vehicleBeingPassed != "") {
        selectVehicle(vehicleBeingPassed)
    }
    let hideVeichlesButton = document.createElement("button");
    hideVeichlesButton.setAttribute("id", "hideVeichlesButton");
    hideVeichlesButton.setAttribute("class", "bottomButtons");  
    hideVeichlesButton.setAttribute("style", "background-color: #4CAF50; display: in-line;"); 
      
    let hideVeichlesButtonText = document.createTextNode("Hide");
    hideVeichlesButton.appendChild(hideVeichlesButtonText);
    hideVeichlesButton.setAttribute("onclick", "hideAllVehicles()");
    divViewVehicles.appendChild(hideVeichlesButton);
}

function filterFunction(input) {
    input = String(input).trim().toLocaleUpperCase();
    let removeFaultList = document.getElementById("vehiclesList");
    while (removeFaultList.firstChild) {
        removeFaultList.removeChild(removeFaultList.firstChild);
    }
    for (i = 0; i < allVehicles.length; i++) {
        let reg = allVehicles[i].registration;
        let type = allVehicles[i].type;
        if (reg.indexOf(input) !== -1) {
            let vehicleOption = document.createElement("option");
            vehicleOption.setAttribute("value", reg);
            let vehicleOptionText = document.createTextNode(reg + " (" + type + ")");
            vehicleOption.appendChild(vehicleOptionText);
            removeFaultList.appendChild(vehicleOption);
        }
        else {
        }
    }
    if (input === "") {
        displayAllVeichles();
    }
}

function displayAllVeichles(vehicleBeingPassed) {
    hideAllVehicles();
    hideAddVehicleFields();

    if (allVehicles.length > 0) {
        let searchBox = document.createElement("input");
        searchBox.setAttribute("id", "searchBox");
        searchBox.setAttribute("placeholder", "Search reg/type");
        searchBox.addEventListener("input", function () {
            let input = document.getElementById("searchBox").value;
            filterFunction(input);
        });

        divViewVehicles.appendChild(searchBox);

        let vehiclesList = document.createElement("SELECT");
        vehiclesList.setAttribute("id", "vehiclesList");
        divViewVehicles.appendChild(vehiclesList);

        divViewVehicles.appendChild(document.createElement("br"));
        

        let removeVeichleFromMainButton = document.createElement("button");
        removeVeichleFromMainButton.setAttribute("id", "removeVeichleFromMainButton");
        removeVeichleFromMainButton.setAttribute("class", "bottomButtons");        
        let removeVeichleFromMainButtonText = document.createTextNode("Remove from main list");
        removeVeichleFromMainButton.appendChild(removeVeichleFromMainButtonText);
        removeVeichleFromMainButton.setAttribute("onclick", "confirmRemoveCarFromMain()");
        divViewVehicles.appendChild(removeVeichleFromMainButton);

        let viewVeichleCostButton = document.createElement("button");
        viewVeichleCostButton.setAttribute("id", "viewVeichleCostButton");
        viewVeichleCostButton.setAttribute("class", "bottomButtons");        
        let viewVeichleCostButtonText = document.createTextNode("View costs");
        viewVeichleCostButton.appendChild(viewVeichleCostButtonText);
        viewVeichleCostButton.setAttribute("onclick", "viewVeichleCost()");
        divViewVehicles.appendChild(viewVeichleCostButton);

        let addVeichleToGarageButton = document.createElement("button");
        addVeichleToGarageButton.setAttribute("id", "viewVeichleCostButton");
        addVeichleToGarageButton.setAttribute("class", "bottomButtons");        
        let addVeichleToGarageButtonText = document.createTextNode("Add to garage");
        addVeichleToGarageButton.appendChild(addVeichleToGarageButtonText);
        addVeichleToGarageButton.setAttribute("onclick", "checkIfAlreadyInGarage()");
        divViewVehicles.appendChild(addVeichleToGarageButton);

        let clearAllButton = document.createElement("button");
        clearAllButton.setAttribute("id", "clearAllButton");
        clearAllButton.setAttribute("class", "bottomButtons");        
        let clearAllButtonText = document.createTextNode("Clear all");
        clearAllButton.appendChild(clearAllButtonText);
        clearAllButton.setAttribute("onclick", "clearAllConfirmation()");
        divViewVehicles.appendChild(clearAllButton);
    }
    else {

        let vehicleRow = document.createElement("label");
        vehicleRow.setAttribute("id", "vehicleRow");
        vehicleRow.setAttribute("class", "vehicleRow");
        let vehicleRowText = document.createTextNode("No veichles");
        vehicleRow.appendChild(vehicleRowText);
        divViewVehicles.appendChild(vehicleRow);
    }
    for (let i = 0; i < allVehicles.length; i++) {
        let vehicleOption = document.createElement("option");
        vehicleOption.setAttribute("value", allVehicles[i].registration);
        let vehicleOptionText = document.createTextNode(allVehicles[i].registration + " (" + allVehicles[i].type + ")");
        vehicleOption.appendChild(vehicleOptionText);
        document.getElementById("vehiclesList").appendChild(vehicleOption);
    }
    if (vehicleBeingPassed != null || vehicleBeingPassed != "") {
        selectVehicle(vehicleBeingPassed)
    }
    divViewVehicles.appendChild(document.createElement("br"));
    
    let hideVeichlesButton = document.createElement("button");
    hideVeichlesButton.setAttribute("id", "hideVeichlesButton");
    hideVeichlesButton.setAttribute("class", "bottomButtons");            
    let hideVeichlesButtonText = document.createTextNode("Hide");
    hideVeichlesButton.appendChild(hideVeichlesButtonText);
    hideVeichlesButton.setAttribute("onclick", "hideAllVehicles()");
    divViewVehicles.appendChild(hideVeichlesButton);
}

function clearAllConfirmation() {
    if (confirm("Remove all from main and garage") == true) {
        allVehicles = [];
        garageVehicles = [];
    } else {
    }
    displayAllVeichles();
}

function clearGarageConfirmation() {
    if (confirm("Remove all from garage") == true) {
        garageVehicles = [];
    } else {
    }
    displayGarageVeichles();
}

function selectVehicle(vehicleBeingPassed) {
    for (let i = 0; i < allVehicles.length; i++) {
        if (vehicleBeingPassed === allVehicles[i].registration) {
            var mySelect = document.getElementById('vehiclesList');
            mySelect.selectedIndex = i;
        }
    }
}

function viewVeichleCost(vehicleRegistration = document.getElementById("vehiclesList").options[vehiclesList.selectedIndex].value) {
    let totalCost = 0;
    let faultListForVehicle = [];
    for (let i = 0; i < allVehicles.length; i++) {
        if (allVehicles[i].registration === vehicleRegistration) {
            faultListForVehicle = allVehicles[i].faults;
        }
    }
    if (faultListForVehicle.length > 0) {
        let faultParts = "";
        for (let i = 0; i < faultListForVehicle.length; i++) {
            let price = 0;

            for (let j = 0; j < faultListPriceArray.length; j++) {
                if (faultListForVehicle[i] === faultListPriceArray[j].part) {
                    price = +faultListPriceArray[j].price;
                    totalCost = +totalCost + price;
                }
            }
            faultParts = faultParts + "\n" + faultListForVehicle[i] + " " + "\u00A3" + price;
        }

        totalCost = totalCost + serviceFee;
        alert("Vehicle " + vehicleRegistration + " has " + faultListForVehicle.length + " fault(s):\n" + faultParts + "\nTotal cost: " + "\u00A3" + totalCost + " (inc " + "\u00A3" + serviceFee + " service fee)");
    }
    else {
        alert("Vehicle " + vehicleRegistration + " has no faults");
    }
}

function removeVeichleFromMain(vehicleRegistration) {
    for (let i = 0; i < allVehicles.length; i++) {
        if (allVehicles[i].registration === vehicleRegistration) {
            allVehicles.splice(i, 1);
            hideAllVehicles();
            displayAllVeichles();
        }
    }
}

function removeVeichleFromGarage(vehicleRegistration) {
    for (let i = 0; i < garageVehicles.length; i++) {
        if (garageVehicles[i].registration === vehicleRegistration) {
            garageVehicles.splice(i, 1);
            hideAllVehicles();
            displayAllVeichles();
        }
    }
}

function displayAddFields() {
    hideAllVehicles();

    var mainButtonElements = document.getElementsByClassName("mainButtons");
    for (var i = 1; i < mainButtonElements.length; i++) {
        mainButtonElements[i].setAttribute("style", "background-color: grey;");
    }

    document.getElementById("addVeichle").disabled = true;
    document.getElementById("viewAllVeichles").disabled = true;
    document.getElementById("viewGarageVeichles").disabled = true;
    document.getElementById("openCommandLine").disabled = true;

    let divAddVehicle = document.getElementById("divAddVehicle");

    let registrationLabel = document.createElement("label");
    registrationLabel.setAttribute("id", "registrationLabel");
    //registrationLabel.setAttribute("style", "background-color: #4CAF50; display: in-line;"); 
    registrationLabel.setAttribute("class", "addVehicleLabel");
    let registrationLabelText = document.createTextNode("Registration: ");
    registrationLabel.appendChild(registrationLabelText);
    divAddVehicle.appendChild(registrationLabel);
        
    let registrationField = document.createElement("input");
    registrationField.setAttribute("id", "registrationField");
    registrationField.setAttribute("class", "addVehicleField");    
    registrationField.setAttribute("type", "text");
    divAddVehicle.appendChild(registrationField);

    divAddVehicle.appendChild(document.createElement("br"));

    let typeLabel = document.createElement("label");
    typeLabel.setAttribute("id", "typeLabel");
    typeLabel.setAttribute("class", "addVehicleLabel");
    let typeLabelText = document.createTextNode("Type: ");
    typeLabel.appendChild(typeLabelText);
    divAddVehicle.appendChild(typeLabel);

    let typeField = document.createElement("input");
    typeField.setAttribute("id", "typeField");
    typeField.setAttribute("class", "addVehicleField");    
    typeField.setAttribute("type", "text");
    divAddVehicle.appendChild(typeField);

    divAddVehicle.appendChild(document.createElement("br"));    

    let modelLabel = document.createElement("label");
    modelLabel.setAttribute("id", "modelLabel");
    modelLabel.setAttribute("class", "addVehicleLabel");
    let modelLabelText = document.createTextNode("Model: ");
    modelLabel.appendChild(modelLabelText);
    divAddVehicle.appendChild(modelLabel);

    let modelField = document.createElement("input");
    modelField.setAttribute("id", "modelField");
    modelField.setAttribute("class", "addVehicleField");    
    modelField.setAttribute("type", "text");
    divAddVehicle.appendChild(modelField);

    divAddVehicle.appendChild(document.createElement("br"));

    let mileageLabel = document.createElement("label");
    mileageLabel.setAttribute("id", "mileageLabel");
    mileageLabel.setAttribute("class", "addVehicleLabel");
    let mileageLabelText = document.createTextNode("Mileage: ");
    mileageLabel.appendChild(mileageLabelText);
    divAddVehicle.appendChild(mileageLabel);

    let mileageField = document.createElement("input");
    mileageField.setAttribute("id", "mileageField");
    mileageField.setAttribute("class", "addVehicleField");    
    mileageField.setAttribute("type", "number");
    divAddVehicle.appendChild(mileageField);

    divAddVehicle.appendChild(document.createElement("br"));

    let addFaultButton = document.createElement("button");
    addFaultButton.setAttribute("id", "addFaultButton");
    addFaultButton.setAttribute("class", "bottomButtons");        
    let addFaultButtonText = document.createTextNode("Add fault");
    addFaultButton.appendChild(addFaultButtonText);
    addFaultButton.setAttribute("onclick", "addFault()");
    divAddVehicle.appendChild(addFaultButton);

    let submitVeichleButton = document.createElement("button");
    submitVeichleButton.setAttribute("id", "submitVeichleButton");
    submitVeichleButton.setAttribute("class", "bottomButtons");        
    let submitVeichleButtonText = document.createTextNode("Submit veichle");
    submitVeichleButton.appendChild(submitVeichleButtonText);
    submitVeichleButton.setAttribute("onclick", "getStringVariables()");
    divAddVehicle.appendChild(submitVeichleButton);

    let cancelVeichleButton = document.createElement("button");
    cancelVeichleButton.setAttribute("id", "cancelVeichleButton");
    cancelVeichleButton.setAttribute("class", "bottomButtons");        
    let cancelVeichleButtonText = document.createTextNode("Cancel");
    cancelVeichleButton.appendChild(cancelVeichleButtonText);
    cancelVeichleButton.setAttribute("onclick", "hideAddVehicleFields()");
    divAddVehicle.appendChild(cancelVeichleButton);

    faultCount = 0;
}

function addFault() {
    
    
    let faultListId = "faultList" + faultCount;
    let vehiclesList = document.createElement("SELECT");
    vehiclesList.setAttribute("id", faultListId);
    vehiclesList.setAttribute("class", "faultList");
    divAddVehicle.appendChild(vehiclesList);
    for (let i = 0; i < faultListPriceArray.length; i++) {
        let faultOption = document.createElement("option");
        faultOption.setAttribute("value", faultListPriceArray[i].part);
        let faultOptionText = document.createTextNode(faultListPriceArray[i].part);
        faultOption.appendChild(faultOptionText);
        document.getElementById(faultListId).appendChild(faultOption);
    }
    let faultListIdButton = faultListId + "Button";

    let removeFaultButton = document.createElement("button");
    removeFaultButton.setAttribute("id", faultListIdButton);
    let removeFaultButtonText = document.createTextNode("Remove");
    removeFaultButton.appendChild(removeFaultButtonText);
    removeFaultButton.addEventListener("click", function () {
        removeFault(faultListId, faultListIdButton);
    });
    divAddVehicle.appendChild(removeFaultButton);

    faultCount++;
}

function removeFault(faultListId, faultListIdButton) {
    let removeFaultList = document.getElementById(faultListId);
    removeFaultList.parentNode.removeChild(removeFaultList);
    let removeFaultListButton = document.getElementById(faultListIdButton);
    removeFaultListButton.parentNode.removeChild(removeFaultListButton);

    var lineBreakElements = document.getElementsByClassName("lineBreaks");
    for (var i = 0; i < lineBreakElements.length; i++) {
        removeFaultListButton.parentNode.removeChild(lineBreakElements[i]);
    }
}

function hideAddVehicleFields() {
    let divAddVehicle = document.getElementById("divAddVehicle");
    //document.getElementById("divAddVehicle").innerHTML = "";
    while (divAddVehicle.firstChild) {
        divAddVehicle.removeChild(divAddVehicle.firstChild);
    }
    document.getElementById("addVeichle").disabled = false;
    document.getElementById("viewAllVeichles").disabled = false;
    document.getElementById("viewGarageVeichles").disabled = false;
    document.getElementById("openCommandLine").disabled = false;


    var mainButtonElements = document.getElementsByClassName("mainButtons");
    for (var i = 1; i < mainButtonElements.length; i++) {
        mainButtonElements[i].setAttribute("style", "background-color: #4CAF50;");
    }
}

function confirmRemoveCarFromMain(vehicleRegistration = document.getElementById("vehiclesList").options[vehiclesList.selectedIndex].value) {
    if (confirm("Remove vehicle " + vehicleRegistration.toUpperCase() + " from main list (and garage)") == true) {
        removeVeichleFromMain(vehicleRegistration.toUpperCase());
        removeVeichleFromGarage(vehicleRegistration.toUpperCase());

    } else {
    }
}

function confirmRemoveCarFromGarage(vehicleRegistration = document.getElementById("vehiclesList").options[vehiclesList.selectedIndex].value) {
    if (confirm("Remove vehicle " + vehicleRegistration.toUpperCase() + " from garage") == true) {
        removeVeichleFromGarage(vehicleRegistration.toUpperCase());
    } else {
    }
}

function checkIfAlreadyInGarage() {
    let inGarage = false;
    let vehicleRegistration = document.getElementById("vehiclesList").options[vehiclesList.selectedIndex].value;
    for (let i = 0; i < garageVehicles.length; i++) {
        if (garageVehicles[i].registration === vehicleRegistration) {
            inGarage = true;
        }
    }
    if (inGarage) {
        alert(vehicleRegistration + " already in your garage");
    }
    else {
        addVeichleToGarage(vehicleRegistration);
    }
}

let commands = ["check in ", "check out ", "create car ", "remove car ", "output ", "add part "]

function openCommandHelp(){
    var commandText = alert('e.g. -> create car REG123, ford, fordModel1, 20000, faults: tyre, brake\ne.g. -> check in reg123\ne.g. -> check out reg123\ne.g. -> output reg123\ne.g. -> add part clutch, 200');    
}

function openCommandLine() {
    var commandText = prompt('Enter command text here');
    if (commandText != null) {
        if (commandText.startsWith(commands[0])) {
            let inputRegistration = commandText.slice(commands[0].length);
            addToGarageFromCommanLine(inputRegistration);
        }
        else if (commandText.startsWith(commands[1])) {
            let inputRegistration = commandText.slice(commands[1].length);
            confirmRemoveCarFromGarage(inputRegistration);
        }
        else if (commandText.startsWith(commands[2])) {
            let inputRegistration = commandText.slice(commands[2].length);
            addToMainFromCommanLine(inputRegistration);
        }
        else if (commandText.startsWith(commands[3])) {
            let inputRegistration = commandText.slice(commands[2].length);
            confirmRemoveCarFromMain(inputRegistration);
        }
        else if (commandText.startsWith(commands[4])) {
            let inputRegistration = commandText.slice(commands[4].length);
            if(inputRegistration === "Garage"){
                viewVeichleCost(inputRegistration);                
            }
        }
        else if (commandText.startsWith(commands[5])) {
            let partPrice = commandText.slice(commands[5].length);
            //partPrice.replace(/ /g, '');
            var partAndPrice = partPrice.split(',');
            addPartFromCommanLine(partAndPrice[0], partAndPrice[1]);
        }
        else{
            openCommandHelp();
        }
    }
}

function addPartFromCommanLine(part, price) {
    if ((part === null || part === "") || (price === NaN || price === NaN || price === "")) {
        alert("Not valid input (e.g. \"add part lights,45\")");
    }
    else {
        let partExists = false;
        for (let i = 0; i < faultListPriceArray.length; i++) {
            if (faultListPriceArray[i].part == part) {
                partExists = true;
                alert(part + " already exists");
            }
        }
        if (!partExists) {
            let faultListPriceObject = {
                part: part,
                price: price.replace(/ /g, '')
            }
            faultListPriceArray.push(faultListPriceObject);
        }
    }
}

function checkIfRegIsFine(inputRegistration) {
    let canAdd = true;
    if ((/[^a-zA-Z0-9]/.test(inputRegistration)) || (inputRegistration.trim() === "")) {
        alert("Enter valid Registration");
        canAdd = false;
    }
    for (let i = 0; i < allVehicles.length; i++) {
        if (inputRegistration === allVehicles[i].registration) {
            alert("Veichle " + inputRegistration + " already exists");
            canAdd = false;
        }
    }
    return canAdd;
}

function addToMainFromCommanLine(inputCreateCar) {
    let arrayOfFaults = [];
    var createCarFields = inputCreateCar.split(',');
    let inputRegistration = createCarFields[0].trim().toUpperCase();
    let inputType = "";
    let inputModel = "";
    let inputMileage = 0;

    let keyFaults = "faults:"
    let keyType = "type:"
    let keyModel = "model:"
    let keyMileage = "mileage:"
    if (checkIfRegIsFine(inputRegistration)) {
        for (let i = 0; i < createCarFields.length; i++) {

            if (createCarFields[i].trim().startsWith(keyType)) {
                inputType = createCarFields[i].slice(keyType.length + 1).trim();
            }
            else if (createCarFields[i].trim().startsWith(keyModel)) {
                inputModel = createCarFields[i].slice(keyModel.length + 1).trim();
            }
            else if (createCarFields[i].trim().startsWith(keyMileage)) {
                inputMileage = parseInt(createCarFields[i].slice(keyMileage.length + 1).trim());
            }
            else if (createCarFields[i].trim().startsWith(keyFaults)) {
                alert(createCarFields.length - i);
                let firstFault = createCarFields[i].slice(keyFaults.length + 1).trim();
                arrayOfFaults.push(firstFault);
                if (i < createCarFields.length) {
                    for (let j = i + 1; j < createCarFields.length; j++) {
                        if (createCarFields[j].trim() != "") {
                            arrayOfFaults.push(createCarFields[j].trim());
                        }
                    }
                }
            }
        }
        addCar(inputRegistration, inputType, inputModel, inputMileage, arrayOfFaults);
    }
}

function addToGarageFromCommanLine(inputRegistration) {
    inputRegistration = inputRegistration.toUpperCase();
    let canAdd = true;
    if ((/[^a-zA-Z0-9]/.test(inputRegistration)) || (inputRegistration.trim() === "")) {
        alert("Enter valid Registration");
        canAdd = false;
    }
    if (canAdd) {
        addVeichleToGarage(inputRegistration);
    }
}

function getStringVariables() {
    let inputRegistration = document.getElementById("registrationField").value.toUpperCase();
    let inputType = document.getElementById("typeField").value;
    let inputModel = document.getElementById("modelField").value;
    let inputMileage = document.getElementById("mileageField").value;
    if (checkIfRegIsFine(inputRegistration)) {
        let faultList = [];
        let numberOfFaults = document.getElementsByClassName('faultList').length;
        //alert(numberOfFaults);
        for (let i = 0; i <= faultCount; i++) {
            let faultGetString = "faultList" + i;
            let faultPart = document.getElementById(faultGetString);
            if (faultPart !== null) {
                faultPart = document.getElementById(faultGetString).value;
                faultList.push(faultPart);
            }
        }
        addCar(inputRegistration, inputType, inputModel, inputMileage, faultList);
    }
}

function addCar(inputRegistration, inputType, inputModel, inputMileage, faultList) {
    let car = { registration: inputRegistration, type: inputType, model: inputModel, mileage: inputMileage, faults: faultList };
    console.log(car);
    allVehicles.push(car);
    hideAddVehicleFields();
    displayAllVeichles(inputRegistration);
}

function addVeichleToGarage(vehicleRegistration) {
    let doesVehicleExist = false;
    for (let i = 0; i < allVehicles.length; i++) {
        if (allVehicles[i].registration === vehicleRegistration) {
            doesVehicleExist = true;
            garageVehicles.push(allVehicles[i]);
        }
    }
    if (!doesVehicleExist) {
        alert(vehicleRegistration + " does not exist, please add it to main list");
    }
}