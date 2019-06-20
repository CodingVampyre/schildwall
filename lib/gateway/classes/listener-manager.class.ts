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

import http from 'http';
import HttpProxy from 'http-proxy';
import { EventEmitter } from "events";
import { TargetSelector } from '../../gateway';
import { IGatewayTarget } from '../types';
import { Middleware } from '../middleware';
import { HttpError } from '../middleware/http-error';

export class ListenerManager extends EventEmitter {

    private targetSelector: TargetSelector = new TargetSelector();
    private middlewares: Middleware[] = [];

    /**
     * 
     */
    public createListener(proxy: HttpProxy) {
        return async (request: http.IncomingMessage, response: http.ServerResponse) => {

            // route mapping
            const meta = this.targetSelector.resolveTargetUrl(request.url!);
            request.url = meta.url;
            const endpoint: string | null = meta.endpoint;
            if (endpoint == null) return this.emit('error', { request, response, message: 'no_such_target' });

            // execute middlewares middleware
            try {
                for (const middleware of this.middlewares) await middleware.execute({request, response});
            } catch (error) {

                // TODO send to error handing module
                // ************
                console.log(error.message); 

                // make typesafe
                error = error as HttpError;

                // set status code to error code
                response.statusCode = error.statusCode;

                // write mandatory headers
                for (const header in error.headers) response.setHeader(header, error.headers[header]);
                // ************
            }

            // send requet to actual server
            return proxy.web(request, response, { target: endpoint });
        }
    }

    public setTargets(targets: Array<IGatewayTarget>) {
        this.targetSelector.setTargets(targets);
    }

    /**
     * attaches a list of middlewares to the listener
     */
    public bindMiddlewares(middlewares: Middleware[]) {
        this.middlewares = this.middlewares.concat(middlewares);
    }

    /**
     * 
     */
    public async startMiddlewares() {
        for (const middleware of this.middlewares) await middleware.start();
    }

    /**
     * 
     */
    public async stopMiddlewares() {
        for (const middleware of this.middlewares) await middleware.stop();
    }

}
