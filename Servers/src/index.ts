import server from './app.js';
import cors from 'cors';
server.use(cors());

server.set('port', (process.env.PORT || 5000));

server.listen(server.get('port'), () => {
    console.log('app listening on port', server.get('port'));
});
