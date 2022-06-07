// format:
// name, description, bonus, cost per day

export const defaultConditions = [
    {
        id: 0,
        name: 'Empty condition',
    },
    {
        id: 1,
        name: 'Full traveling group is mounted',
        bonus: 3, 
        cost: 1
    },
	{
        id: 2,
        name: 'Travel by river current',
        description: 'Only available on rivers, of course, and does not stack with mounts or land vehicles',
        bonus: 3, 
    },
	{
        id: 3,
        name: 'Water vehicle without current',
        bonus: 2,
    },
	{
        id: 4,
        name: 'Party is traveling by wagon or equivalent vehicle',
        description: 'Party must forgo the speed bonus of individual mounts to use this - probably confers other advantages such as storage space',
        bonus: 2,
        cost: 1,
    },
	{
        id: 5,
        name: 'Well-maintained roads',
        bonus: 1,
    },
	{
        id: 6,
        name: 'Active detrimental weather (mild)',
        description: 'Strong winds and/or precipitation, smoke in the air',
        bonus: -1,
    },
	{
        id: 7,
        name: 'Active detrimental weather (severe)',
        description: 'Gale winds, snow or sand storm, thick smoke',
        bonus: -2,
    },
	{
        id: 8,
        name: 'Loose or soft terrain',
        description: 'Mud, snow, loose dirt or gravel, sand',
        bonus: -1,
    },
	{
        id: 9,
        name: 'Treacherous terrain',
        description: '(deep swampy mud, large dunes of sand, snowdrifts)',
        bonus: -2,
    },
	{
        id: 10,
        name: 'Traveler is overburdened',
        bonus: -2,
    },
	{
        id: 11,
        name: 'Dense foliage',
        bonus: -1
    },
	{
        id: 12,
        name: 'Steep inclines',
        bonus: -1,
    },
	{
        id: 13,
        name: 'Exhaustion',
        description: 'If a party travels for 3 time segments without resting, -1 for each additional segment traveled.',
        bonus: -1
    }
];