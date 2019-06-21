# Schildwall

<p align="center">
  <img height="100px" src="https://user-images.githubusercontent.com/12459210/59879324-b9a78e00-93aa-11e9-8068-06fe50ab6754.png?raw=true" alt="Schildwall Icon"/>
</p>

Schildwall is a service to manage security and accessibility of API-Networks.
It aims to provide a modular, simple way of building complex gateways for big APIs.
It supports

* Custom Middleware
* Multiple Endpoints

## installation
```bash
npm i --save @vampyreio/schildwall
```

## How To Use
The example can be ran using 'npm run-script example' and starts a proxy server on port 8000 with an endpoint

* `/test/` which points to localhost:8888

```typescript
// gateway.class.ts

import { ListenerErrorHandler, GatewayApp, MasterGateway } from '@vampyreio/schildwall';
import { HeaderMiddleware } from './app/middleware';

@GatewayApp({
    log: true,
    listenerErrorHandler: new ListenerErrorHandler,
    endpoints: [
        { endpoint: 'http://localhost:58', name: 'local58' },
        { endpoint: 'http://google.com', name: 'google' },
    ],
    middlewares: [
        new HeaderMiddleware(),
    ],
})
export class Gateway extends MasterGateway { }

// index.ts
import { Gateway } from './gateway.class';

const gateway = new Gateway();

async function bootstrap() {
    const server = await gateway.init();
    server.listen(3000);
}

```

If the gateway now runs on `localhost:8000`, a request to Google with path /search would be made with
```
GET /google/search => GET http://google.com/search
GET /local58/entity/abcde => GET http://localhost:58/entity/abcde
```
because the first parameter of the path will be mapped onto the provided endpoint list and cut from the incoming url.


## Middleware
Middleware can be attached to the gateway easily. 
A Middleware contains methods that control what it should do on startup, on shutdown and on execution.
It has access to the servers request and response via the `ctx` object. 

> to let a header block the request and answer it itself with an error, it's not required to set the answer manually.
> Schildwall provides Error Objects for all 4xx and 5xx errors. 
> when such an error is thrown, an internal error handler does this itself. 
> It will me overwritable in upcoming versions to allow manual error handling.

Middleware will be executed in the order of binding.

> In upcoming versions, middlewares will be able to pass data to following middlewares.

```typescript
import {Middleware, IGatewayContext, BadGatewayException} from '../lib';

/**
 * checks for a 'kill-me' header and if it is true, throw an exception
 */
class HeaderScanner extends Middleware {

    /**
     * executes when a request enters
     */
    public async execute(ctx: IGatewayContext): Promise<any> {

        if (ctx.request.headers['kill-me'] === 'true') 
            throw new BadGatewayException('kill-me header was found');

    }

    /**
     * executes when a middleware is bound
     */
    public async start(): Promise<any> {
        // Setup, initialisation, precondition checking, ...
    }

    /**
     * executes when the server should stop
     */
    public async stop(): Promise<any> { 
        // Cleanup, stopping processes, deletions, ...
    }

}
```

## Error Handling
