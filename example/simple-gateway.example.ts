import {GatewayApp, MasterGateway, ListenerErrorHandler} from '../lib';

@GatewayApp({
    log: true,
    listenerErrorHandler: new ListenerErrorHandler,
    endpoints: [
        {
            endpoint: 'http://localhost:8888', name: 'test'
        }
    ]
})
class Gateway extends MasterGateway {}

const gateway = new Gateway();
gateway.init().then((server) => server.listen(8000));
