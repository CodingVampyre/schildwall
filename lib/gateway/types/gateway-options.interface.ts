import { IGatewayTarget } from '.';
import { ListenerErrorHandler } from '../error-handler/listener-error-handler.class';
import { Middleware, MiddlewareErrorHandler } from '../middleware';

export interface IGatewayOptions {

    // will print out debug messages if wanted
    log?: boolean;

    // handles error thrown by the listener itself but not the Middleware
    listenerErrorHandler: ListenerErrorHandler;

    // a list of endpoints
    endpoints: IGatewayTarget[];

    // middleware error handlers;
    middlewareErrorHandlers?: MiddlewareErrorHandler[];

    // middlewares
    middlewares?: Middleware[];
}
