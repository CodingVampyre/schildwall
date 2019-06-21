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

// 400
export class BadRequestException extends HttpError {

    public name: string = "Bad Request";
    public httpStatusCode: number = 400;

}

// 401
export class UnauthorizedException extends HttpError {

    public name: string = "Unauthorized";
    public httpStatusCode: number = 401;

}

// 401
export class PaymentRequiredException extends HttpError {

    public name: string = "Payment Required";
    public httpStatusCode: number = 402;

}

// 403
export class ForbiddenException extends HttpError {

    public name: string = "Forbidden";
    public httpStatusCode: number = 403;

}

// 404
export class NotFoundException extends HttpError {

    public name: string = "Not Found";
    public httpStatusCode: number = 404;

}

// 405
export class MethodNotAllowedException extends HttpError {

    public name: string = "Method Not Allowed";
    public httpStatusCode: number = 405;

}

// 406
export class NotAcceptableException extends HttpError {

    public name: string = "Not Acceptable";
    public httpStatusCode: number = 406;

}

// 407
export class ProxyAuthenticationRequiredException extends HttpError {

    public name: string = "Proxy Authentication Required";
    public httpStatusCode: number = 407;

}

// 408
export class RequestTimeoutException extends HttpError {

    public name: string = "Request Timeout";
    public httpStatusCode: number = 408;

}

// 409
export class ConflictException extends HttpError {

    public name: string = "Conflict";
    public httpStatusCode: number = 409;

}

// 410
export class GoneException extends HttpError {

    public name: string = "Gone";
    public httpStatusCode: number = 410;

}

// 411
export class LengthRequiredException extends HttpError {

    public name: string = "Langth Required";
    public httpStatusCode: number = 411;

}

// 412
export class PreconditionFailedException extends HttpError {

    public name: string = "Precondition Failed";
    public httpStatusCode: number = 412;

}

// 413
export class PayloadTooLargeException extends HttpError {

    public name: string = "Payload Too Large";
    public httpStatusCode: number = 413;

}

// 414
export class URITooLongException extends HttpError {

    public name: string = "URI Too Long";
    public httpStatusCode: number = 414;

}

// 415
export class UnsupportedMediaType extends HttpError {

    public name: string = "Unsupported Media Type";
    public httpStatusCode: number = 415;

}

// 416
export class RequestRangeNotSatisfiableException extends HttpError {

    public name: string = "Requested Range Not Satisfiable";
    public httpStatusCode: number = 416;

}

// 417
export class ExpectationFailedException extends HttpError {

    public name: string = "Expectation Failed";
    public httpStatusCode: number = 417;

}

// 421
export class MisdirectedRequestException extends HttpError {

    public name: string = "Misdirection Request";
    public httpStatusCode: number = 421;

}

// 426
export class UpgradeRequiredException extends HttpError {

    public name: string = "Upgrade Required";
    public httpStatusCode: number = 426;

}

// 428
export class PreconditionRequiredException extends HttpError {

    public name: string = "Precondition Required";
    public httpStatusCode: number = 428;

}

// 429
export class TooManyRequestsException extends HttpError {

    public name: string = "Too Many Requests";
    public httpStatusCode: number = 429;

}

// 431
export class RequestHeaderFieldsTooLargeException extends HttpError {

    public name: string = "Request Header Fields Too Large";
    public httpStatusCode: number = 431;

}

// 451
export class UnavailableForLegalReasonsException extends HttpError {

    public name: string = "UnavailableForLegalReasonsException";
    public httpStatusCode: number = 431;

}
