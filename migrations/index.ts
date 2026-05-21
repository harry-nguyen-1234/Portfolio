import * as migration_20260520_054734 from './20260520_054734';
import * as migration_20260520_054842 from './20260520_054842';
import * as migration_20260521_064536 from './20260521_064536';

export const migrations = [
  {
    up: migration_20260520_054734.up,
    down: migration_20260520_054734.down,
    name: '20260520_054734',
  },
  {
    up: migration_20260520_054842.up,
    down: migration_20260520_054842.down,
    name: '20260520_054842',
  },
  {
    up: migration_20260521_064536.up,
    down: migration_20260521_064536.down,
    name: '20260521_064536'
  },
];
