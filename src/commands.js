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
    ],
};

export const PING_COMMAND = {
    name: 'ping',
    description: 'Ping the bot to check if it is online.',
    options: [
    {
      name: 'target1',
      description: 'First target',
      type: 6, // USER type
      required: true,
    },
    {
      name: 'target2',
      description: 'Second target',
      type: 6, // USER type
      required: false,
    },
    {
      name: 'target3',
      description: 'Third target',
      type: 6, // USER type
      required: false,
    },
    {
      name: 'target4',
      description: 'Fourth target',
      type: 6, // USER type
      required: false,
    },
    {
      name: 'target5',
      description: 'Fifth target',
      type: 6, // USER type
      required: false,
    },
  ],
};