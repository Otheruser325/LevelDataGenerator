let levelData_warehouse = [];

let multipliersWarehouse = {
    cost: {
        0: 1.20, 11: 1.20, 21: 1.17, 41: 1.15, 101: 1.13, 
        2501: 1.15, 3001: 1.18, 4001: 1.20, 5001: 1.225
    },
    stat: {
        0: 1.30, 11: 1.25, 21: 1.20, 41: 1.15, 101: 1.11, 
        2501: 1.13, 3001: 1.15, 4001: 1.1667, 5001: 1.1875
    }
};

let specialLevelsWarehouse = {
    bigUpdate: [20, 50, 100, 200, 400, 600, 800, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3200, 3400, 3500, 3700, 3900, 4000, 4200, 4400, 4500, 4600, 4800, 5000, 5200, 5400, 5500],
    doubleStat: [50, 200, 400, 600, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400],
    specialMultipliers: {
        100: 1.25, 800: 1.5, 2500: 3, 2600: 3, 
        2700: 3, 2800: 3, 2900: 3, 3000: 5, 
        3500: 5, 4000: 5, 4500: 5, 5000: 5, 
        5500: 5, 3200: 4, 3400: 4, 3700: 4, 3900: 4,
        4200: 6, 4400: 6, 4600: 6, 4800: 6, 5200: 6, 5400: 6
    },
    specialRewards: {
        20: 15, 50: 15, 100: 15, 200: 15, 400: 15, 20: 15, 600: 15,
        800: 15, 850: 15, 950: 15, 1050: 15, 1150: 15, 20: 15, 1250: 15,
        1350: 15, 1450: 15, 1550: 15, 1600: 15, 1700: 15, 1800: 15, 1900: 15,
        2000: 400, 2100: 400, 2200: 400, 2300: 400, 2400: 400,
        2500: 500, 2600: 500, 2700: 500, 2800: 500, 2900: 500,
        3000: 500, 3500: 500, 4000: 500, 4500: 500, 5000: 500, 5500: 500,
        3200: 300, 3400: 300, 3700: 300, 3900: 300
    }
};

function getMultiplier(level, type) {
    let keys = Object.keys(multipliersWarehouse[type]).map(k => parseInt(k));
    for (let i = keys.length - 1; i >= 0; i--) {
        if (level >= keys[i]) {
            return multipliersWarehouse[type][keys[i]];
        }
    }
    return 1; // Default multiplier if not found
}

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

        // Determine the correct multipliers based on the level
        let currentCostMultiplier = getMultiplier(newLevel["Level"], "cost");
        let currentStatMultiplier = getMultiplier(newLevel["Level"], "stat");

        // Calculate the new values
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

        // Apply special multipliers and rewards if needed
        if (specialLevelsWarehouse.doubleStat.includes(newLevel["Level"])) {
            newLevel["CapacityPerWorker"] *= 2;
            newLevel["LoadingPerSecond"] *= 2;
        } else if (specialLevelsWarehouse.specialMultipliers[newLevel["Level"]]) {
            newLevel["CapacityPerWorker"] *= specialLevelsWarehouse.specialMultipliers[newLevel["Level"]];
            newLevel["LoadingPerSecond"] *= specialLevelsWarehouse.specialMultipliers[newLevel["Level"]];
        }

        newLevel["BigUpdate"] = specialLevelsWarehouse.bigUpdate.includes(newLevel["Level"]) ? 1 : 0;
        newLevel["SuperCashReward"] = specialLevelsWarehouse.specialRewards[newLevel["Level"]] || 0;
        
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
