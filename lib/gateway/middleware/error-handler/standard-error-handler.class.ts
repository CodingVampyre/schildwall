import { MiddlewareErrorHandler } from "./middleware-error-handler.interface";
import { IGatewayContext } from "../../types";
import { HttpError } from "../http-error";
import { BadGatewayException } from '../http-error';

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
 * default error handler
 */
export class StandardErrorHandler implements MiddlewareErrorHandler {

    public async execute(ctx: IGatewayContext, error: HttpError): Promise<void> {
        console.log('[Default Error Handler]', error.message);

        // set status code to error code
        ctx.response.statusCode = error.httpStatusCode || 500;

        // write mandatory headers
        for (const header in error.headers)
            ctx.response.setHeader(header, error.headers[header]);

        // end
        return ctx.response.end();
    }

}
