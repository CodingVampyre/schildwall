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

import uuidv1 from 'uuid/v1';

/**
 * contains a middleware and an unique identifier assigned at moving in
 * Makes running multiple instances of a middleware possible
 */
export class Instance<T> {

    /**
     * entitiy, usually a middleware in this application 
     * but can be used for other things aswell
     */
    public entity: T;

    /**
     * unique identifier of this instance
     */
    public readonly id = uuidv1();

    /**
     * default constructor
     */
    public constructor(entity: T) {
        this.entity = entity;
    }

}