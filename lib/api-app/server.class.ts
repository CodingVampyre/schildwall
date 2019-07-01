/*
 * Copyright 2019 Tobias Kavsek
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Request, Response, createServer, plugins} from 'restify';
import { ListenerManager } from '../gateway/listener-manager';
import { MiddlewareRouter, EndpointsRouter } from './router';

/**
 * 
 */
export class GatewayApiServer {

    private server = createServer();

    private middlewareRouter: MiddlewareRouter = new MiddlewareRouter();
    private endpointsRouter: EndpointsRouter = new EndpointsRouter();

    constructor(listenerManager: ListenerManager) {

        this.server.use(plugins.bodyParser());

        // routes
        this.server.get('/', this.getHealth);

        // middleware
        this.server.get('/middlewares', (request: Request, response: Response) => this.middlewareRouter.getMiddlewareList(request, response, listenerManager)); // list all middlewares
        // this.server.get('/middlewares/:middlewareId'); // TODO list metadata of a specific middleware
        // this.server.post('/middleware/:middlewareId/toggle') // TODO starts or stops a middleware
        // this.server.patch('/middleware/:middlewareId') // TODO changes a middlewares settings
        // this.server.del('/middleware/:middlewareId') // TODO removes a selected middlware

        // endpoints
        this.server.get('/endpoints', (request: Request, response: Response) => this.endpointsRouter.getEndpoints(request, response, listenerManager)); // list all endpoints
        this.server.post('/endpoints', (request: Request, response: Response) => this.endpointsRouter.postEndpoint(request, response, listenerManager)); // creates a new endpoint
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
    public stop() {
        this.server.close();
    }

    // ************
    // ROUTER METHODS
    // ************

    /**
     * 
     */
    private getHealth(request: Request, response: Response) {
        response.send('Gateway-API works!');
    }
}
