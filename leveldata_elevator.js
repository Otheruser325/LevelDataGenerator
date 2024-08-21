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

// Speed increment logic based on level ranges
function calculateSpeedIncrement(level) {
    // Levels 1 to 20: Increment speed by 0.01 for each level
    if (level <= 20) {
        return 0.01 * (level - 1);
    } 
    
    // Levels above 2400: Increment speed by 0.002
    else if (level > 2400) {
        return 0.002;
    } 
    
    // Levels 800 to 2400: Increment speed by 0.01 every 10 levels, otherwise 0
    else if (level > 799) {
        return (level % 10 === 0) ? 0.01 : 0;
    } 
    
    // Levels 300 to 799: Increment speed by 0.01 every 4 levels, otherwise 0
    else if (level > 299) {
        return (level % 4 === 0) ? 0.01 : 0;
    } 
    
    // Levels 200 to 299: Increment speed by 0.01 every 3 levels, otherwise 0
    else if (level > 199) {
        return (level % 3 === 0) ? 0.01 : 0;
    } 
    
    // Levels 100 to 199: Increment speed by 0.01 every 2 levels, otherwise 0
    else if (level > 99) {
        return (level % 2 === 0) ? 0.01 : 0;
    } 
    
    // Levels 21 to 99: Increment speed by 0.01 every 2 levels, otherwise 0
    else {
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

        // Determine the speed increment logic
        let incrementFactor = 0.01;  // Base increment for speed
        if (newLevel["Level"] > 2400) {
            incrementFactor = 0.002;  // Decrease increment for higher levels
        }
        
        // Calculate the new speed
        newLevel["Speed"] = lastLevel["Speed"] + calculateSpeedIncrement(newLevel["Level"]);

        newLevel["Capacity"] = lastLevel["Capacity"] * currentStatMultiplier;
        newLevel["LoadingPerSecond"] = lastLevel["LoadingPerSecond"] * currentStatMultiplier;

        // Apply big update for specific levels if needed
        if ([20, 50, 100, 200, 400, 600, 800, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3200, 3400, 3500, 3700, 3900, 4000, 4200, 4400, 4500, 4600, 4800, 5000, 5200, 5400, 5500].includes(newLevel["Level"])) {
            newLevel["BigUpdate"] = 1;
            newLevel["SuperCashReward"] = 15;
        } else {
            newLevel["BigUpdate"] = 0;
            newLevel["SuperCashReward"] = 0;
        }

        // Update capacity and loading per second according to big update
        if ([50, 200, 600, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400].includes(newLevel["Level"])) {
            newLevel["Capacity"] = newLevel["Capacity"] * 2;
            newLevel["LoadingPerSecond"] = newLevel["LoadingPerSecond"] * 2;
        } else if (newLevel["Level"] === 100) {
            newLevel["Capacity"] = newLevel["Capacity"] * 1.25;
            newLevel["LoadingPerSecond"] = newLevel["LoadingPerSecond"] * 1.25;
        } else if (newLevel["Level"] === 800) {
            newLevel["Capacity"] = newLevel["Capacity"] * 1.5;
            newLevel["LoadingPerSecond"] = newLevel["LoadingPerSecond"] * 1.5;
        } else if ([2000, 2100, 2200, 2300, 2400].includes(newLevel["Level"])) {
            newLevel["SuperCashReward"] = 400;
        } else if ([2500, 2600, 2700, 2800, 2900].includes(newLevel["Level"])) {
            newLevel["Capacity"] = newLevel["Capacity"] * 3;
            newLevel["LoadingPerSecond"] = newLevel["LoadingPerSecond"] * 3;
            newLevel["SuperCashReward"] = 500;
        } else if ([3000, 3500, 4000, 4500, 5000, 5500].includes(newLevel["Level"])) {
            newLevel["Capacity"] = newLevel["Capacity"] * 5;
            newLevel["LoadingPerSecond"] = newLevel["LoadingPerSecond"] * 5;
            newLevel["SuperCashReward"] = 500;
        } else if ([3200, 3400, 3700, 3900].includes(newLevel["Level"])) {
            newLevel["Capacity"] = newLevel["Capacity"] * 4;
            newLevel["LoadingPerSecond"] = newLevel["LoadingPerSecond"] * 4;
            newLevel["SuperCashReward"] = 300;
        } else if ([4200, 4400, 4600, 4800, 5200, 5400].includes(newLevel["Level"])) {
            newLevel["Capacity"] = newLevel["Capacity"] * 6;
            newLevel["LoadingPerSecond"] = newLevel["LoadingPerSecond"] * 6;
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
