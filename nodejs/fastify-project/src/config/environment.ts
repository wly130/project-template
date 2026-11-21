import {existsSync} from 'node:fs';
import {loadEnvFile} from 'node:process';

const file = '.env.' + (process.env.NODE_ENV ?? 'development');
if (existsSync(file)) loadEnvFile(file);

export const port = Number(process.env.PORT ?? 3000);
