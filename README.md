# Schildwall
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

## Error Handing
