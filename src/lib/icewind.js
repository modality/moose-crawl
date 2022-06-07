// format:
// name, description, bonus, cost per day

// format:
// name, description, bonus, cost per day

export const defaultConditions = [
    {
        id: 1,
        name: 'On foot, without snowshoes',
        bonus: -2,
    },
	{
        id: 2,
        name: 'Traveling by dogsled',
        bonus: 2,
        description: 'Six dogs per sled, with 2 sleds for a party of four',
        cost: 2
    },
	{
        id: 3,
        name: 'Traveling by axebeak',
        bonus: 1,
        description: 'One axebeak per person',
        cost: 1
    },
    {
        id: 4,
        name: 'Traveling on paths between Ten-Towns',
        bonus: 2,
    },
	{
        id: 5,
        name: 'Traveling in mountains',
        bonus: -2,
    },
	{
        id: 6,
        name: 'On ice, without crampons',
        bonus: -1,
    },
	{
        id: 7,
        name: 'Blizzards',
        bonus: -1,
    },
	{
        id: 8,
        name: 'Extreme cold',
        bonus: -1,
    },
	{
        id: 9,
        name: 'Exceptionally treacherous terrain',
        bonus: -2,
    },
	{
        id: 10,
        name: 'Traveler is overburdened',
        bonus: -2,
    },
	{
        id: 11,
        name: 'Exhaustion',
        description: 'If a party travels for more than 8 hours per day, the next day travel with exhaustion',
        bonus: -1
    },
    {
        id: 12,
        name: 'High on Sunshine',
        bonus: 1,
        cost: 1,
    },
    {
        id: 13,
        name: 'Suffering from Sunshine withdrawal',
        bonus: -1
    }
];