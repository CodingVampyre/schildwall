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

import Restify from 'restify';
import { ListenerManager } from '../gateway/listener-manager';
import { MiddlewareRouter } from './router';

/**
 * 
 */
export class GatewayApiServer {

    private server = Restify.createServer();

    private middlewareRouter: MiddlewareRouter;

    constructor(listenerManager: ListenerManager) {
        this.middlewareRouter = new MiddlewareRouter();

        // routes
        this.server.get('/', this.getHealth);

        // middleware
        this.server.get('/middlewares', (request: Restify.Request, response: Restify.Response) => this.middlewareRouter.getMiddlewareList(request, response, listenerManager)); // TODO list all middlewares
        // this.server.get('/middlewares/:middlewareId'); // TODO list metadata of a specific middleware
        // this.server.post('/middleware/:middlewareId/toggle') // TODO starts or stops a middleware
        // this.server.patch('/middleware/:middlewareId') // TODO changes a middlewares settings
        // this.server.del('/middleware/:middlewareId') // TODO removes a selected middlware
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
    private getHealth(request: Restify.Request, response: Restify.Response) {
        response.send('Gateway-API works!');
    }
}
