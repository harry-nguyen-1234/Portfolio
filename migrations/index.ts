import * as migration_20260519_203101 from './20260519_203101';
import * as migration_20260520_052823 from './20260520_052823';

export const migrations = [
  {
    up: migration_20260519_203101.up,
    down: migration_20260519_203101.down,
    name: '20260519_203101',
  },
  {
    up: migration_20260520_052823.up,
    down: migration_20260520_052823.down,
    name: '20260520_052823'
  },
];
