export interface IGatewayTarget {

    // a domain that specifies the endpoint
    endpoint: string;

    // this will be passed as the first part of an url
    name: string;
}