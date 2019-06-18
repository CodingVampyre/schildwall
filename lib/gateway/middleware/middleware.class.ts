import { IGatewayContext, IMiddleware } from "../types";

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
 * prototype for gateway middleware
 */
export abstract class Middleware implements IMiddleware {

    /**
     * executes when a request is made
     */
    public async execute(ctx: IGatewayContext): Promise<any> { }

    /**
     * executes when a middleware is bound
     */
    public async start(): Promise<any> { }

    /**
     * executes when the server should stop
     */
    public async stop(): Promise<any> { }

}

