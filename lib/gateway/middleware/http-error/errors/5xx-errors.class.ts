import { HttpError } from "../http-error.class";

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

// 500
export class InternalServerErrorException extends HttpError {

    public name: string = "Internal Server Error";
    public httpStatusCode: number = 500;

}

// 501
export class NotImplementedException extends HttpError {

    public name: string = "Not Implemented";
    public httpStatusCode: number = 501;

}

// 502
export class BadGatewayException extends HttpError {

    public name: string = "Bad Gateway";
    public httpStatusCode: number = 502;

}

// 503
export class ServiceUnavailableException extends HttpError {

    public name: string = "Service Unavailable";
    public httpStatusCode: number = 503;

}

// 504
export class GatewayTimeoutException extends HttpError {

    public name: string = "Gateway Timeout";
    public httpStatusCode: number = 504;

}

// 505
export class HttpVersionNotSupportedException extends HttpError {

    public name: string = "Http Version Not Supported";
    public httpStatusCode: number = 505;

}

// 506
export class VariantAlsoNegociatesException506 extends HttpError {

    public name: string = "Variant Also Negociates";
    public httpStatusCode: number = 506;

}

// 507
export class VariantAlsoNegociatesException507 extends HttpError {

    public name: string = "Variant Also Negociates";
    public httpStatusCode: number = 507;

}

// 511
export class NetworkAuthenticationRequiredException extends HttpError {

    public name: string = "Network Authentication Required";
    public httpStatusCode: number = 511;

}
