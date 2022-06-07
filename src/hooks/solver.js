import { useState, useReducer } from 'react';

export const termKeys = [
    "baseMilesPerHour",
    "hoursPerTravelingDay",
    "conditionsMultiplier",
    "milesPerDay",
    "daysTraveled",
    "goldCostPerDay",
    "totalTripCost",
    "milesTraveled",
    "milesPerHex",
    "hexesTraveled"
];

export const editableKeys = [
    "baseMilesPerHour",
    "hoursPerTravelingDay",
    "daysTraveled",
    "milesTraveled",
    "milesPerHex"
];

export const solvableKeys = [
    "baseMilesPerHour",
    "daysTraveled",
    "milesTraveled",
];

export const mainRelationKeys = [
    'milesPerDay',
    'daysTraveled',
    'milesTraveled'
];

export const derivedKeys = [
    "totalTripCost",
    "hexesTraveled"
];

export const speedKeys = [
    "baseMilesPerHour",
    "hoursPerTravelingDay",
    "conditionsMultiplier",
    "milesPerDay"
];

function createEqualityConstraints(lvars, valueMap, filterFn) {
    return Object.entries(valueMap).filter(filterFn).map(([key, value]) => {
        return window.logic.eq(lvars[key], value);
    });
}

function solveSpeed(inputs, solveForKey) {
    const constraints = []
    const {
        lvar,
        mul,
        and,
        run,
    } = window.logic;
    const lvars = {
        baseMilesPerHour: lvar('baseMilesPerHour'),
        hoursPerTravelingDay: lvar('hoursPerTravelingDay'),
        conditionsMultiplier: lvar('conditionsMultiplier'),
        baseMilesPerDay: lvar('baseMilesPerDay'),
        milesPerDay: lvar('milesPerDay'),
    };

    const speedFilter = ([key, value]) => (
        !(solveForKey != 'baseMilesPerHour' && key == 'milesPerDay') &&
        speedKeys.includes(key) &&
        key != solveForKey
    );
    constraints.push(...createEqualityConstraints(lvars, inputs, speedFilter));

    if (solveForKey == 'baseMilesPerHour') {
        constraints.push(mul(lvars.baseMilesPerDay, lvars.conditionsMultiplier, lvars.milesPerDay));
        constraints.push(mul(lvars.baseMilesPerHour, lvars.hoursPerTravelingDay, lvars.baseMilesPerDay));
    } else {
        constraints.push(mul(lvars.baseMilesPerHour, lvars.hoursPerTravelingDay, lvars.baseMilesPerDay));
        constraints.push(mul(lvars.baseMilesPerDay, lvars.conditionsMultiplier, lvars.milesPerDay));
    }

    const goal = and(...constraints);
    const solution = run(Object.values(lvars), goal)[0];

    // console.log('speed solution', speedInputs, solution);
    return solution;

    return Object.fromEntries(
        Object.keys(lvars).map((key, index) => [key, solution[key]])
    );
}

function solveForInputs(inputs, solveForKey) {
    const mainConstraints = []
    const constraints = []
    const {
        lvar,
        mul,
        and,
        run,
    } = window.logic;

    let speedOutputs;

    const lvars = {
        baseMilesPerHour: lvar('baseMilesPerHour'),
        hoursPerTravelingDay: lvar('hoursPerTravelingDay'),
        conditionsMultiplier: lvar('conditionsMultiplier'),
        baseMilesPerDay: lvar('baseMilesPerDay'),
        milesPerDay: lvar('milesPerDay'),
        daysTraveled: lvar('daysTraveled'),
        goldCostPerDay: lvar('goldCostPerDay'),
        totalTripCost: lvar('totalTripCost'),
        milesTraveled: lvar('milesTraveled'),
        milesPerHex: lvar('milesPerHex'),
        hexesTraveled: lvar('hexesTraveled'),
    };

    if (solveForKey != 'baseMilesPerHour') {
        // run speed first
        speedOutputs = solveSpeed(inputs, solveForKey);
        inputs = {
            ...inputs,
            ...speedOutputs
        };
        // console.log('speed outputs', speedOutputs);
    }

    // main relation
    const mainFilter = ([key, value]) => {
        if (solveForKey == 'baseMilesPerHour' && key == 'milesPerDay') {
            return false;
        }
        return mainRelationKeys.includes(key) && key != solveForKey;
    }

    mainConstraints.push(...createEqualityConstraints(lvars, inputs, mainFilter));
    mainConstraints.push(mul(lvars.milesPerDay, lvars.daysTraveled, lvars.milesTraveled));
    const mainGoal = and(...mainConstraints);
    const mainSolutions = run([
        lvars.milesPerDay,
        lvars.daysTraveled,
        lvars.milesTraveled
    ], mainGoal);
    const mainSolution = mainSolutions[0];
    // console.log('main solution', mainSolutions, mainSolution);

    inputs = {
        ...inputs,
        ...mainSolution
    }

    if (solveForKey == 'baseMilesPerHour') {
        // run speed first
        speedOutputs = solveSpeed(inputs, solveForKey);
        inputs = {
            ...inputs,
            ...speedOutputs
        };
        // console.log('speed outputs 2', speedOutputs);
    }

    // bind inputs to lvars
    const derivedFilter = ([key, value]) => {
        return !derivedKeys.includes(key);
    };
    constraints.push(...createEqualityConstraints(lvars, inputs, derivedFilter));

    // time relations
    constraints.push(mul(lvars.daysTraveled, lvars.goldCostPerDay, lvars.totalTripCost));

    // hexes relation
    constraints.push(mul(lvars.milesPerHex, lvars.hexesTraveled, lvars.milesTraveled));

    // create and solve goal
    const goal = and(...constraints);
    const solution = run(Object.values(lvars), goal)[0];

    // console.log('final output', 'inputs', inputs, 'solveForKey', solveForKey, 'solution', solution);

    if (solution != undefined) {
        return solution;
    } else {
        return inputs;
    }
}

function inputsReducer(state, action) {
    return {
        ...state,
        [action.key]: action.value
    };

}

export default function useSolver(defaultInputs, defaultSolveForKey) {
    const [inputs, dispatch] = useReducer(inputsReducer, defaultInputs);
    const [solveForKey, setSolveForKey] = useState(defaultSolveForKey);
    const outputs = solveForInputs(inputs, solveForKey);

    function setInput(key, value) {
        const parsed = parseFloat(value);
        if (!isNaN(parsed) && inputs[key] != parsed) {
            dispatch({
                key: key,
                value: parsed
            });
        }
    }

    function solveForInput(key) {
        for (const key in outputs) {
            setInput(key, outputs[key]);        
        }
        setSolveForKey(key)
    }

    return [outputs, solveForKey, setInput, solveForInput];
}