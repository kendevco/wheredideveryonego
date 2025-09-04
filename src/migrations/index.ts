import * as migration_20250904_003014 from './20250904_003014';

export const migrations = [
  {
    up: migration_20250904_003014.up,
    down: migration_20250904_003014.down,
    name: '20250904_003014'
  },
];
