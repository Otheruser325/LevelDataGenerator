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
        const bigUpdateLevels = [10, 40, 80, 150, 300, 500, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3200, 3400, 3500, 3700, 3900, 4000, 4200, 4400, 4500, 4600, 4800, 5000, 5200, 5400, 5500];
        
        if (bigUpdateLevels.includes(newLevel["Level"])) {
            newLevel["BigUpdate"] = 1;
            newLevel["SuperCashReward"] = 15;
        } else {
            newLevel["BigUpdate"] = 0;
            newLevel["SuperCashReward"] = 0;
        }

        // Update capacity and loading per second according to big update
        const doubleCapacityLevels = [10, 40, 150, 300, 500, 1000, 600, 1100, 1200, 1300, 1400, 1500, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400];
        const otherMultiplierLevels = {
            80: 1.25,
            800: 1.5,
            900: 2.25,
            1600: 3,
            2500: 3,
            2600: 3,
            2700: 3,
            2800: 3,
            2900: 3,
            3000: 5,
            3500: 5,
            4000: 5,
            4500: 5,
            5000: 5,
            5500: 5,
            3200: 4,
            3400: 4,
            3700: 4,
            3900: 4,
            4200: 6,
            4400: 6,
            4600: 6,
            4800: 6,
            5200: 6,
            5400: 6
        };

        if (doubleCapacityLevels.includes(newLevel["Level"])) {
            newLevel["Capacity"] *= 2;
            newLevel["LoadingPerSecond"] *= 2;
        } else if (otherMultiplierLevels[newLevel["Level"]]) {
            const multiplier = otherMultiplierLevels[newLevel["Level"]];
            newLevel["Capacity"] *= multiplier;
            newLevel["LoadingPerSecond"] *= multiplier;
            newLevel["SuperCashReward"] = 300 * multiplier;
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
