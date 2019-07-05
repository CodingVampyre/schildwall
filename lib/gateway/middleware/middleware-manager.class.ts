import { Middleware, Instance } from ".";
import _ from 'lodash';

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

/**
 * 
 */
export class MiddlewareManager {
    
    /**
     * all middlewares that can be used at runtime
     */
    private availableMiddlewares: Middleware[] = [];

    /**
     * all RUNNING middlewares with an intance id
     */
    public boundMiddlewareInstances: Instance<Middleware>[] = [];

    /**
     * default constructor
     */
    public constructor(availableMiddlewares?: Middleware[]) {

        // assign all middlewares at start
        if (availableMiddlewares != null) this.availableMiddlewares = availableMiddlewares;
    }

    /**
     * 
     */
    public listAvailableMiddlewares(): string[] {
        return this.availableMiddlewares.map(m => m.name);
    }

    /**
     * @return a list of objects each containing ID and Middleware Name of the instance
     */
    public listRunningInstances(): Array<{id: string, name: string}> {
        return this.boundMiddlewareInstances.map(instance => {return {id: instance.id, name: instance.entity.name}});
    }

    /**
     * creates a new middleware
     */
    public addAvailableMiddleware(middleware: Middleware) {
        this.availableMiddlewares.push(middleware);
    }

    /**
     * creates a new instance
     */
    public createInstance(middlewareName: string) {

        for (const middleware of this.availableMiddlewares) {

            // check if this is the desired middleware
            if (middleware.name === middlewareName) {

                // deep clones the middleware and stores it as an instance
                const instance = new Instance<Middleware>(_.cloneDeep(middleware));

                // create
                this.boundMiddlewareInstances.push(instance);

                // return instance id
                return instance.id;
            }
        }

        throw new Error('middleware name not found');
    }

    /**
     * removes an instance
     */
    public async removeInstance(instanceId: string) {
        for (const instance of this.boundMiddlewareInstances) {
            if (instance.id === instanceId) {

                // stop instance
                await instance.entity.stop();

                // remove instance
                _.remove(this.boundMiddlewareInstances, item => item.id === instanceId);
            }
        }

        throw new Error('instance not found');
    }

    /**
     * starts a stopped instance
     */
    public async startInstance(instanceId: string) {
        for (const instance of this.boundMiddlewareInstances) {
            if (instance.id === instanceId) await instance.entity.start();
        }

        throw new Error('instance not found')
    }

    /**
     * stops a running instance
     */
    public async stopInstance(instanceId: string) {
        for (const instance of this.boundMiddlewareInstances) {
            if (instance.id === instanceId) await instance.entity.stop();
        }

        throw new Error('instance not found');
    }

    /**
     * starts all middlewares in queue
     */
    public async startAll() {
        for (const instance of this.boundMiddlewareInstances) {
            await instance.entity.start();
        }
    }

    /**
     * stops all middlewares in queue
     */
    public async stopAll() {
        for (const instance of this.boundMiddlewareInstances) {
            await instance.entity.stop();
        }
    }

}