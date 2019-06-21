import {GatewayApp, MasterGateway, ListenerErrorHandler, Middleware, IGatewayContext, BadGatewayException} from '../lib';

/**
 * checks for a 'kill-me' header and if it is true, throw an exception
 */
class HeaderScanner extends Middleware {

    public async execute(ctx: IGatewayContext): Promise<any> {

        if (ctx.request.headers['kill-me'] === 'true') throw new BadGatewayException('kill-me header was found');

    }

}

@GatewayApp({
    log: true,
    listenerErrorHandler: new ListenerErrorHandler,
    endpoints: [
        {
            endpoint: 'http://localhost:3000', name: 'mock'
        }
    ],
    middlewares: [
        new HeaderScanner(),
    ]
})
class Gateway extends MasterGateway {}

const gateway = new Gateway();
gateway.init().then((server) => server.listen(8000));
