const ADMINISTRATOR = 0x00000008;
const USER_TYPE = 6;
const STRING_TYPE = 3;
const INTEGER_TYPE = 4;

export const SNIPE_COMMAND = {
    name: 'snipe',
    description: 'Log a snipe for points! Up to five targets in one command.',
    options: [
        {
            name: 'target1',
            description: 'The target to snipe.',
            type: USER_TYPE, // USER type
            required: true,
        },
        {
            name: 'target2',
            description: 'The target to snipe.',
            type: USER_TYPE, // USER type
            required: false,
        },
        {
            name: 'target3',
            description: 'The target to snipe.',
            type: USER_TYPE, // USER type
            required: false,
        },
        {
            name: 'target4',
            description: 'The target to snipe.',
            type: USER_TYPE, // USER type
            required: false,
        },
        {
            name: 'target5',
            description: 'The target to snipe.',
            type: USER_TYPE, // USER type
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
            type: USER_TYPE, // USER type
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

export const OPT_OUT_COMMAND = {
    name: 'optout',
    description: 'Opt out of CrossSnipes.',
    options: [],
};

export const OPT_COMMAND = {
    name: 'opt',
    description: 'Opt user in or out of CrossSnipes.',
    options: [
        {
            name: 'mode',
            description: '"in" or "out"',
            type: STRING_TYPE, // STRING type
            required: true,
            choices: [
                { name: 'in', value: 'in' },
                { name: 'out', value: 'out' },
            ],
        },
        {
            name: 'user',
            description: 'The user to opt in/out.',
            type: USER_TYPE, // USER type
            required: true,
        }
    ],
    default_member_permissions: ADMINISTRATOR.toString(), // Restrict to admins/mods
};

export const ERASE_SNIPE = {
    name: 'erase-snipe',
    description: 'Removes points from user and undoes in/out count changes',
    options: [
        {
            name: 'sniper',
            description: 'person who did snipe',
            type: USER_TYPE,
            required: true,
        },
        {
            name: 'target',
            description: 'person who got sniped',
            type: USER_TYPE,
            required: true,
        },
        {
            name: 'points',
            description: 'amount of points earned in snipe',
            type: INTEGER_TYPE,
            required: true,
        }
    ],
    default_member_permissions: ADMINISTRATOR.toString(), // Restrict to admins/mods
};

export const ADD_POINTS = {
    name: 'add-points',
    description: 'Add points to a user.',
    options: [
        {
            name: 'user',
            description: 'The user to add points to.',
            type: USER_TYPE, // USER type
            required: true,
        },
        {
            name: 'points',
            description: 'The number of points to add.',
            type: INTEGER_TYPE, // INTEGER type
            required: true,
        }
    ],
    default_member_permissions: ADMINISTRATOR.toString(), // Restrict to admins/mods
};