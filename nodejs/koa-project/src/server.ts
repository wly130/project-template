import {createApp} from './app.ts';
import {port} from './config/environment.ts';

createApp().listen(port, '127.0.0.1', () => {
    console.log('Listening at http://127.0.0.1:' + port);
});
