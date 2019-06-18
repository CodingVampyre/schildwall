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

import { IGatewayTarget } from "../types";

/**
 * 
 */
export class TargetSelector {

    private targets: Array<IGatewayTarget> = [];

    /**
     * 
     */
    public resolveTargetUrl(url: string) {
        const serviceToFetch = url.split('/')[1];
        const endpoint = this.fetchTargetHost(serviceToFetch);
        const resultUrl = this.removeFirstPathPart(url);
        return { url: resultUrl, endpoint }
    }

    /**
     * 
     */
    public setTargets(targets: Array<IGatewayTarget>) {
        this.targets = targets;
    }

    /**
     * 
     */
    private fetchTargetHost(name: string): string | null {
        for (const target of this.targets) if (name === target.name) return target.endpoint;
        return null;
    }

    /**
     * 
     */
    private removeFirstPathPart(path: string) {
        return '/' + path.split('/').slice(2).join('/');
    }
}
