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

import {Request, Response} from 'restify';
import { ListenerManager } from '../../gateway/listener-manager';
import { Validator, CreateEndpointSchema } from '../validator';

 /**
  * 
  */
export class EndpointsRouter {

    /**
     * gets a list of all middlewares and their metadata
     */
    public getEndpoints(request: Request, response: Response, listenerManager: ListenerManager) {
        response.send(listenerManager.getEndpoints());
    }

    /**
     * creates a new endpoint
     */
    public postEndpoint(request: Request, response: Response, listenerManager: ListenerManager) {

        const validationError = Validator.validate(request.body, CreateEndpointSchema);
        if (validationError != null) {
            response.status(400);
            return response.send(validationError.message);
        }

        listenerManager.createEndpoint({
            endpoint: request.body.endpoint,
            name: request.body.name,
        });

        response.set({'Location': '/getEndpoints'}); // TODO get a single endpoint
        response.status(201);
        return response.end();
    }

}


