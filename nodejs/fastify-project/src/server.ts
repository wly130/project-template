import {createApp} from './app.ts';
import {port} from './config/environment.ts';

const app = createApp();
try {
    await app.listen({host: '127.0.0.1', port});
} catch (error) {
    app.log.error(error);
    process.exitCode = 1;
}
