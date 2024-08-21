let levelData_elevator = [];

let multipliersElevator = {
    cost: {
        0: 1.20, 11: 1.20, 21: 1.17, 41: 1.15, 101: 1.13, 
        2501: 1.15, 3001: 1.18, 4001: 1.20, 5001: 1.225
    },
    stat: {
        0: 1.30, 11: 1.25, 21: 1.20, 41: 1.15, 101: 1.11, 
        2501: 1.13, 3001: 1.15, 4001: 1.1667, 5001: 1.1875
    }
};

let specialLevelsElevator = {
    bigUpdate: [10, 40, 80, 150, 300, 500, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3200, 3400, 3500, 3700, 3900, 4000, 4200, 4400, 4500, 4600, 4800, 5000, 5200, 5400, 5500],
    doubleStat: [10, 40, 150, 300, 500, 1000, 1100, 1200, 1300, 1400, 1500, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400],
    specialMultipliers: {
        80: 1.25, 800: 1.5, 900: 2.25, 1600: 3,
        2500: 3, 2600: 3, 2700: 3, 2800: 3, 2900: 3,
        3000: 5, 3500: 5, 4000: 5, 4500: 5, 5000: 5, 5500: 5,
        3200: 4, 3400: 4, 3700: 4, 3900: 4,
        4200: 6, 4400: 6, 4600: 6, 4800: 6, 5200: 6, 5400: 6
    },
    specialRewards: {
        2000: 400, 2100: 400, 2200: 400, 2300: 400, 2400: 400,
        2500: 500, 2600: 500, 2700: 500, 2800: 500, 2900: 500,
        3000: 500, 3500: 500, 4000: 500, 4500: 500, 5000: 500, 5500: 500,
        3200: 300, 3400: 300, 3700: 300, 3900: 300
    }
};

function getMultiplier(level, type) {
    let keys = Object.keys(multipliersElevator[type]).map(k => parseInt(k));
    for (let i = keys.length - 1; i >= 0; i--) {
        if (level >= keys[i]) {
            return multipliersElevator[type][keys[i]];
        }
    }
    return 1; // Default multiplier if not found
}

function calculateSpeedIncrement(level) {
    if (level <= 20) {
        return (level % 2 === 0) ? 0.02 : 0.01;
    } else if (level > 2400) {
        return 0.002;
    } else if (level > 799) {
        return (level % 10 === 0) ? 0.01 : 0;
    } else if (level > 299) {
        return (level % 4 === 0) ? 0.01 : 0;
    } else if (level > 199) {
        return (level % 3 === 0) ? 0.01 : 0;
    } else if (level > 99) {
        return (level % 2 === 0) ? 0.01 : 0;
    } else {
        return (level % 2 === 0) ? 0.01 : 0;
    }
}

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

        // Determine the correct multipliers based on the level
        let currentCostMultiplier = getMultiplier(newLevel["Level"], "cost");
        let currentStatMultiplier = getMultiplier(newLevel["Level"], "stat");

        // Calculate the new values
        newLevel["Cost"] = lastLevel["Cost"] * currentCostMultiplier;
        newLevel["Speed"] = lastLevel["Speed"] + calculateSpeedIncrement(newLevel["Level"]);
        newLevel["Capacity"] = lastLevel["Capacity"] * currentStatMultiplier;
        newLevel["LoadingPerSecond"] = lastLevel["LoadingPerSecond"] * currentStatMultiplier;

        // Apply special multipliers and rewards if needed
        if (specialLevelsElevator.doubleStat.includes(newLevel["Level"])) {
            newLevel["Capacity"] *= 2;
            newLevel["LoadingPerSecond"] *= 2;
        } else if (specialLevelsElevator.specialMultipliers[newLevel["Level"]]) {
            newLevel["Capacity"] *= specialLevelsElevator.specialMultipliers[newLevel["Level"]];
            newLevel["LoadingPerSecond"] *= specialLevelsElevator.specialMultipliers[newLevel["Level"]];
        }

        newLevel["BigUpdate"] = specialLevelsElevator.bigUpdate.includes(newLevel["Level"]) ? 1 : 0;
        newLevel["SuperCashReward"] = specialLevelsElevator.specialRewards[newLevel["Level"]] || 0;

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
