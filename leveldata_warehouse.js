let levelData_warehouse = [];

let warehouseCostMultiplier = 1.20;
let warehouseStatMultiplier = 1.30;
let warehouseCostMultiplier11 = 1.20;
let warehouseStatMultiplier11 = 1.25;
let warehouseCostMultiplier21 = 1.17;
let warehouseStatMultiplier21 = 1.20;
let warehouseCostMultiplier41 = 1.15;
let warehouseStatMultiplier41 = 1.15;
let warehouseCostMultiplier101 = 1.13;
let warehouseStatMultiplier101 = 1.11;
let warehouseCostMultiplier2501 = 1.15;
let warehouseStatMultiplier2501 = 1.13;
let warehouseCostMultiplier3001 = 1.18;
let warehouseStatMultiplier3001 = 1.15;
let warehouseCostMultiplier4001 = 1.20;
let warehouseStatMultiplier4001 = 1.1667;
let warehouseCostMultiplier5001 = 1.225;
let warehouseStatMultiplier5001 = 1.1875;

if (!window.workerSpeedIncrementWarehouseLevel) {
    var workerSpeedIncrementWarehouseLevel = {
        1: 2,
        20: 2,
        21: 2,
        100: 2,
        101: 2,
        400: 2,
        401: 2,
        535: 3,
        800: 3,
        801: 3,
        1535: 4,
        1600: 4,
        1601: 4,
        2000: 4,
        2001: 4,
        2400: 4,
        2401: 4,
        2409: 5,
        2600: 5,
        2601: 5,
        2800: 5,
        2801: 5,
        3000: 5,
        3001: 5,
        3200: 5,
        3201: 5,
        3400: 5,
        3401: 5,
        3500: 5,
        3501: 5,
        3600: 5,
        3601: 5,
        3800: 5,
        3801: 5,
        3871: 6,
        4000: 6,
        4001: 6
    };
}

if (!window.workerCountIncrementWarehouseLevel) {
    var workerCountIncrementWarehouseLevel = {
        1: 1,
        20: 2,
        21: 2,
        100: 3,
        101: 3,
        400: 4,
        401: 4,
        800: 5,
        801: 5,
        2000: 5,
        2001: 5,
        2400: 5,
        2401: 5,
        2600: 6,
        2601: 6,
        2800: 6,
        2801: 6,
        3000: 6,
        3001: 6,
        3200: 6,
        3201: 6,
        3400: 6,
        3401: 6,
        3500: 6,
        3501: 6,
        3600: 6,
        3601: 6,
        3800: 6,
        3801: 6,
        4000: 6,
        4001: 6
    };
}

function generateLevels_warehouse() {
    let currentLevel = parseInt(document.getElementById('warehouseLevelInput').value);
    let currentCost = parseFloat(document.getElementById('warehouseCostInput').value);
    let currentCapacity = parseFloat(document.getElementById('warehouseCapacityInput').value);
    let currentLoadingPerSecond = parseFloat(document.getElementById('warehouseLoadingInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    let lastLevel = {
        "Level": currentLevel - 1,
        "Cost": currentCost,
        "NumberOfWorkers": 1,
        "CapacityPerWorker": currentCapacity,
        "WorkerWalkingSpeedPerSecond": 2,
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
            currentCostMultiplier = warehouseCostMultiplier;
            currentStatMultiplier = warehouseStatMultiplier;
        } else if (currentLevel < 21) {
            currentCostMultiplier = warehouseCostMultiplier11;
            currentStatMultiplier = warehouseStatMultiplier11;
        } else if (currentLevel < 41) {
            currentCostMultiplier = warehouseCostMultiplier21;
            currentStatMultiplier = warehouseStatMultiplier21;
        } else if (currentLevel < 101) {
            currentCostMultiplier = warehouseCostMultiplier41;
            currentStatMultiplier = warehouseStatMultiplier41;
        } else if (currentLevel < 2501) {
            currentCostMultiplier = warehouseCostMultiplier101;
            currentStatMultiplier = warehouseStatMultiplier101;
        } else if (currentLevel < 3001) {
            currentCostMultiplier = warehouseCostMultiplier2501;
            currentStatMultiplier = warehouseStatMultiplier2501;
        } else if (currentLevel < 4001) {
            currentCostMultiplier = warehouseCostMultiplier3001;
            currentStatMultiplier = warehouseStatMultiplier3001;
        } else if (currentLevel < 5001) {
            currentCostMultiplier = warehouseCostMultiplier4001;
            currentStatMultiplier = warehouseStatMultiplier4001;
        } else {
            currentCostMultiplier = warehouseCostMultiplier5001;
            currentStatMultiplier = warehouseStatMultiplier5001;
        }

        // Increment cost, capacity, and loading per second based on the current level
        newLevel["Cost"] = lastLevel["Cost"] * currentCostMultiplier;
        if (workerCountIncrementWarehouseLevel[newLevel["Level"]]) {
            newLevel["NumberOfWorkers"] = workerCountIncrementWarehouseLevel[newLevel["Level"]];
        } else {
            newLevel["NumberOfWorkers"] = lastLevel["NumberOfWorkers"];
        }
        newLevel["CapacityPerWorker"] = lastLevel["CapacityPerWorker"] * currentStatMultiplier;
        if (workerSpeedIncrementWarehouseLevel[newLevel["Level"]]) {
            newLevel["WorkerWalkingSpeedPerSecond"] = workerSpeedIncrementWarehouseLevel[newLevel["Level"]];
        } else {
            newLevel["WorkerWalkingSpeedPerSecond"] = lastLevel["WorkerWalkingSpeedPerSecond"];
        }
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
        levelData_warehouse.push(newLevel);
        lastLevel = newLevel;
    }

    // Display the generated levels
    displayLevels_warehouse();
}

function displayLevels_warehouse() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData_warehouse, null, 4);
}

function copyJsonWarehouse() {
    let filename = `level_data_warehouse.json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData_warehouse, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
