import type { Context } from 'aws-lambda';

export type LambdaHandler = (event: any, context: Context) => Promise<any>;

export declare function handler(event: any, context: Context): Promise<any>;
export default handler;
