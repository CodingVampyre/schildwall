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

import { Server, createServer } from 'http';
import { MasterGateway, IGatewayOptions } from '.';
import { ListenerManager } from './listener-manager';
import httpProxy from 'http-proxy';

/**
 * 
 * @param options 
 */
export function GatewayApp(options: IGatewayOptions) {
    return (constructorFunction: Function) => {

        /**
         * 
         */
        return class extends MasterGateway {

            /**
             * 
             */
            public async init(): Promise<Server> {

                // instanciate server
                if (options.log) console.log('[gateway] instantiate server');
                const listenerManager = new ListenerManager();
                const proxy = httpProxy.createProxyServer().on('error', (error, req, res) => console.log(error.message));// TODO error handler

                // error handing
                if (options.log) console.log('[gateway] initializing error handling...');
                listenerManager.on('error', options.listenerErrorHandler.handle);

                // targets
                listenerManager.setTargets(options.endpoints);

                // middlewares
                if (options.middlewares) {
                    if (options.log) console.log('[gateway] initializing middlewares...');
                    listenerManager.bindMiddlewares(options.middlewares);
                    await listenerManager.startMiddlewares();
                }

                // middleware error handlers
                if (options.middlewareErrorHandlers) {
                    if (options.log) console.log('[gateway] initializing middleware error handlers...');
                    listenerManager.bindMiddlewareErrorHandlers(options.middlewareErrorHandlers);
                }

                return createServer(listenerManager.createListener(proxy));
            }
        }
    }
}
