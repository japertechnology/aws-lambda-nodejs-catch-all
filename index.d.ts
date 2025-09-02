/**
 * TypeScript definitions for the universal AWS Lambda handler package.
 */
import type { Context } from 'aws-lambda';

/** Generic AWS Lambda handler signature. */
export type LambdaHandler = (event: any, context: Context) => Promise<any>;

/** Entrypoint exported by this package. */
export declare function handler(event: any, context: Context): Promise<any>;
export default handler;
