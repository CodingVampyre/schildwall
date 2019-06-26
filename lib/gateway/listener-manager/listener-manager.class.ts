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
import { TargetSelector } from '..';
import { IGatewayTarget } from '../types';
import { Middleware } from '../middleware';
import { MiddlewareErrorHandler, StandardErrorHandler } from '../middleware/error-handler';

export class ListenerManager extends EventEmitter {

    private targetSelector: TargetSelector = new TargetSelector();
    private middlewares: Middleware[] = [];
    private middlewareErrorHandlers: MiddlewareErrorHandler[] = [
        new StandardErrorHandler(),
    ];

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
                for (const middleware of this.middlewares)
                    await middleware.execute({ request, response });
            } catch (error) {

                // choose the best error handler
                for (const handler of this.middlewareErrorHandlers) {
                    if (handler.errorCodeToCatch == null || handler.errorCodeToCatch === error.httpStatusCode) { 
                        return handler.execute({ request, response }, error); 
                    }
                }

                console.log('[gateway] no error handler was selected');
            }

            // send requet to actual server
            return proxy.web(request, response, { target: endpoint });
        }
    }

    /**
     * creates the target endpoints
     */
    public setTargets(targets: Array<IGatewayTarget>) {
        this.targetSelector.setTargets(targets);
    }

    /**
     * bind error handlers to handle middleware handling
     */
    public bindMiddlewareErrorHandlers(middlewareErrorHandlers: MiddlewareErrorHandler[]) {
        for (const handler of middlewareErrorHandlers) {
            this.middlewareErrorHandlers.unshift(handler); // unshift grants the first error handler also is caleld first
        }
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

    // ************
    // API-METADATA
    // ************

    /**
     * 
     */
    public getMiddlewareMetadata(): Array<{id: string, name: string, isRunning: boolean}> {
        return this.middlewares.map(middleware => {
            return {
                id: middleware.id,
                name: middleware.name,
                isRunning: middleware.isRunning,
            }
        });
    }

    /**
     * 
     */
    public getEndpoints(): IGatewayTarget[] {
        return this.targetSelector.getTargets();
    }

}
