export const SNIPE_COMMAND = {
    name: 'snipe',
    description: 'Log a snipe for points! Up to five targets in one command.',
    options: [
        {
            name: 'target1',
            description: 'The target to snipe.',
            type: 6, // USER type
            required: true,
        },
        {
            name: 'target2',
            description: 'The target to snipe.',
            type: 6, // USER type
            required: false,
        },
        {
            name: 'target3',
            description: 'The target to snipe.',
            type: 6, // USER type
            required: false,
        },
        {
            name: 'target4',
            description: 'The target to snipe.',
            type: 6, // USER type
            required: false,
        },
        {
            name: 'target5',
            description: 'The target to snipe.',
            type: 6, // USER type
            required: false,
        }
    ],
};

export const STATS_COMMAND = {
    name: 'stats',
    description: 'View snipe stats.',
    options: [
        {
            name: 'user',
            description: 'The user to view stats for.',
            type: 6, // USER type
            required: false,
        }
    ],
};

export const PING_COMMAND = {
    name: 'ping',
    description: 'Ping the bot to check if it is online.',
    options: [],
};

export const LEADERBOARD_COMMAND = {
    name: 'leaderboard',
    description: "View Leaderboard. ",
    options: [],
};