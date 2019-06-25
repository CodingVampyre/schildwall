import Restify from 'restify';
import http  from 'http';

/**
 * 
 */
export class GatewayApiServer {

    private server = Restify.createServer();

    constructor() {

        // routes
        this.server.get('/', this.getHealth);
    }

    /**
     * 
     */
    public run(port: number) {
        console.log('[API] Running on port', port);
        this.server.listen(port);
        return this;
    }

    /**
     * 
     */
    private getHealth(request: Restify.Request, response: Restify.Response) {
        response.send('Gateway-API works!');
    }

}