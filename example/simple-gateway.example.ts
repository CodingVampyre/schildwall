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

import { GatewayApp, MasterGateway, ListenerErrorHandler, Middleware, IGatewayContext, BadGatewayException, MiddlewareErrorHandler, HttpError } from '../lib';
import { GatewayApiServer } from '../lib';

/**
 * checks for a 'kill-me' header and if it is true, throw an exception
 */
class HeaderScanner extends Middleware {

    public async execute(ctx: IGatewayContext): Promise<any> {

        if (ctx.request.headers['kill-me'] === 'true') throw new BadGatewayException('kill-me header was found');

    }

}

/**
 * handles 502 errors 
 */
class MyFiveZeroTwo implements MiddlewareErrorHandler {

    public errorCodeToCatch = 502;

    public async execute(ctx: IGatewayContext, error: HttpError) {

        ctx.response.setHeader('my-test', 'true');
        ctx.response.statusCode = this.errorCodeToCatch;
        ctx.response.write('There is actually text in this reply!');
        return ctx.response.end();

    }
}

@GatewayApp({
    log: true,
    listenerErrorHandler: new ListenerErrorHandler,
    endpoints: [
        { endpoint: 'http://localhost:3000', name: 'mock' }
    ],
    middlewares: [
        new HeaderScanner(),
    ],
    middlewareErrorHandlers: [
        new MyFiveZeroTwo(),
    ],
})
class Gateway extends MasterGateway { }

const gateway = new Gateway();
gateway.init().then((server) => {
    server.listen(8000);

    const api = new GatewayApiServer().run(8081);
});

