let levelData_elevator = [];

let elevatorCostMultiplier = 1.20;
let elevatorStatMultiplier = 1.30;
let elevatorCostMultiplier11 = 1.20;
let elevatorStatMultiplier11 = 1.25;
let elevatorCostMultiplier21 = 1.17;
let elevatorStatMultiplier21 = 1.20;
let elevatorCostMultiplier41 = 1.15;
let elevatorStatMultiplier41 = 1.15;
let elevatorCostMultiplier101 = 1.13;
let elevatorStatMultiplier101 = 1.11;
let elevatorCostMultiplier2501 = 1.15;
let elevatorStatMultiplier2501 = 1.13;
let elevatorCostMultiplier3001 = 1.18;
let elevatorStatMultiplier3001 = 1.15;
let elevatorCostMultiplier4001 = 1.20;
let elevatorStatMultiplier4001 = 1.1667;
let elevatorCostMultiplier5001 = 1.225;
let elevatorStatMultiplier5001 = 1.1875;

function generateLevels_elevator() {
    let currentLevel = parseInt(document.getElementById('elevatorLevelInput').value);
    let currentCost = parseFloat(document.getElementById('elevatorCostInput').value);
    let currentSpeed = parseFloat(document.getElementById('speedInput').value);
    let currentCapacity = parseFloat(document.getElementById('elevatorCapacityInput').value);
    let currentLoadingPerSecond = parseFloat(document.getElementById('elevatorLoadingInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    let lastLevel = {
        "Level": currentLevel - 1,
        "Cost": currentCost,
        "Speed": currentSpeed,
        "Capacity": currentCapacity,
        "LoadingPerSecond": currentLoadingPerSecond,
        "BigUpdate": 0,
        "SuperCashReward": 0
    };

    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = {};

        newLevel["Level"] = lastLevel["Level"] + 1;

        // Determine the correct multiplier based on the level
        let currentCostMultiplier;
        let currentStatMultiplier;
        if (currentLevel < 11) {
            currentCostMultiplier = elevatorCostMultiplier;
            currentStatMultiplier = elevatorStatMultiplier;
        } else if (currentLevel < 21) {
            currentCostMultiplier = elevatorCostMultiplier11;
            currentStatMultiplier = elevatorStatMultiplier11;
        } else if (currentLevel < 41) {
            currentCostMultiplier = elevatorCostMultiplier21;
            currentStatMultiplier = elevatorStatMultiplier21;
        } else if (currentLevel < 101) {
            currentCostMultiplier = elevatorCostMultiplier41;
            currentStatMultiplier = elevatorStatMultiplier41;
        } else if (currentLevel < 2501) {
            currentCostMultiplier = elevatorCostMultiplier101;
            currentStatMultiplier = elevatorStatMultiplier101;
        } else if (currentLevel < 3001) {
            currentCostMultiplier = elevatorCostMultiplier2501;
            currentStatMultiplier = elevatorStatMultiplier2501;
        } else if (currentLevel < 4001) {
            currentCostMultiplier = elevatorCostMultiplier3001;
            currentStatMultiplier = elevatorStatMultiplier3001;
        } else if (currentLevel < 5001) {
            currentCostMultiplier = elevatorCostMultiplier4001;
            currentStatMultiplier = elevatorStatMultiplier4001;
        } else {
            currentCostMultiplier = elevatorCostMultiplier5001;
            currentStatMultiplier = elevatorStatMultiplier5001;
        }

        // Increment cost, capacity, and loading per second based on the current level
        newLevel["Cost"] = lastLevel["Cost"] * currentCostMultiplier;
        // Increment speed by 2 milliseconds (0.002) for each level
        newLevel["Speed"] = lastLevel["Speed"] + 0.002;
        newLevel["Capacity"] = lastLevel["Capacity"] * currentStatMultiplier;
        newLevel["LoadingPerSecond"] = lastLevel["LoadingPerSecond"] * currentStatMultiplier;

        // Apply big update for specific levels if needed
        if (newLevel["Level"] === 20 || newLevel["Level"] === 50 || newLevel["Level"] === 100 || newLevel["Level"] === 200 || newLevel["Level"] === 400 || newLevel["Level"] === 600 || newLevel["Level"] === 800 || newLevel["Level"] === 850 || newLevel["Level"] === 950 || newLevel["Level"] === 1050 || newLevel["Level"] === 1150 || newLevel["Level"] === 1250 || newLevel["Level"] === 1350 || newLevel["Level"] === 1450 || newLevel["Level"] === 1550 || newLevel["Level"] === 1600 || newLevel["Level"] === 1700 || newLevel["Level"] === 1800 || newLevel["Level"] === 1900 || newLevel["Level"] === 2000 || newLevel["Level"] === 2100 || newLevel["Level"] === 2200 || newLevel["Level"] === 2300 || newLevel["Level"] === 2400 || newLevel["Level"] === 2500 || newLevel["Level"] === 2600 || newLevel["Level"] === 2700 || newLevel["Level"] === 2800 || newLevel["Level"] === 2900 || newLevel["Level"] === 3000 || newLevel["Level"] === 3200 || newLevel["Level"] === 3400 || newLevel["Level"] === 3500 || newLevel["Level"] === 3700 || newLevel["Level"] === 3900 || newLevel["Level"] === 4000 || newLevel["Level"] === 4200 || newLevel["Level"] === 4400 || newLevel["Level"] === 4500 || newLevel["Level"] === 4600 || newLevel["Level"] === 4800 || newLevel["Level"] === 5000 || newLevel["Level"] === 5200 || newLevel["Level"] === 5400 || newLevel["Level"] === 5500) {
            newLevel["BigUpdate"] = 1;
            newLevel["SuperCashReward"] = 15;
        } else {
            newLevel["BigUpdate"] = 0;
            newLevel["SuperCashReward"] = 0;
        }

        // Update capacity and loading per second according to big update
        if (newLevel["Level"] === 50 || newLevel["Level"] === 200 || newLevel["Level"] === 600 || newLevel["Level"] === 850 || newLevel["Level"] === 950 || newLevel["Level"] === 1050 || newLevel["Level"] === 1150 || newLevel["Level"] === 1250 || newLevel["Level"] === 1350 || newLevel["Level"] === 1450 || newLevel["Level"] === 1550 || newLevel["Level"] === 1500 || newLevel["Level"] === 1600 || newLevel["Level"] === 1700 || newLevel["Level"] === 1800 || newLevel["Level"] === 1900 || newLevel["Level"] === 2000 || newLevel["Level"] === 2100 || newLevel["Level"] === 2200 || newLevel["Level"] === 2300 || newLevel["Level"] === 2400) {
            newLevel["CapacityPerWorker"] *= 2;
            newLevel["LoadingPerSecond"] *= 2;
        } else if (newLevel["Level"] === 100) {
            newLevel["CapacityPerWorker"] *= 1.25;
            newLevel["LoadingPerSecond"] *= 1.25;
        } else if (newLevel["Level"] === 800) {
            newLevel["CapacityPerWorker"] *= 1.5;
            newLevel["LoadingPerSecond"] *= 1.5;
        } else if (newLevel["Level"] === 2000 || newLevel["Level"] === 2100 || newLevel["Level"] === 2200 || newLevel["Level"] === 2300 || newLevel["Level"] === 2400) {
            newLevel["SuperCashReward"] = 400;
        } else if (newLevel["Level"] === 2500 || newLevel["Level"] === 2600 || newLevel["Level"] === 2700 || newLevel["Level"] === 2800 || newLevel["Level"] === 2900) {
            newLevel["CapacityPerWorker"] *= 3;
            newLevel["LoadingPerSecond"] *= 3;
            newLevel["SuperCashReward"] = 500;
        } else if (newLevel["Level"] === 3000 || newLevel["Level"] === 3500 || newLevel["Level"] === 4000 || newLevel["Level"] === 4500 || newLevel["Level"] === 5000 || newLevel["Level"] === 5500) {
            newLevel["CapacityPerWorker"] *= 5;
            newLevel["LoadingPerSecond"] *= 5;
            newLevel["SuperCashReward"] = 500;
        } else if (newLevel["Level"] === 3200 || newLevel["Level"] === 3400 || newLevel["Level"] === 3700 || newLevel["Level"] === 3900) {
            newLevel["CapacityPerWorker"] *= 4;
            newLevel["LoadingPerSecond"] *= 4;
            newLevel["SuperCashReward"] = 300;
        } else if (newLevel["Level"] === 4200 || newLevel["Level"] === 4400 || newLevel["Level"] === 4600 || newLevel["Level"] === 4800 || newLevel["Level"] === 5200 || newLevel["Level"] === 5400) {
            newLevel["CapacityPerWorker"] *= 6;
            newLevel["LoadingPerSecond"] *= 6;
            newLevel["SuperCashReward"] = 200;
        }

        // Push the new level data
        levelData_elevator.push(newLevel);
        lastLevel = newLevel;
    }

    // Display the generated levels
    displayLevels_elevator();
}

function displayLevels_elevator() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData_elevator, null, 4);
}

function copyJsonElevator() {
    let filename = `level_data_elevator.json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData_elevator, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
