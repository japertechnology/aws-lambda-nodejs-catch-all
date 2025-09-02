#!/usr/bin/env node
/**
 * Command-line utility for invoking the universal Lambda handler with a JSON
 * event payload.  Useful for local testing and debugging.
 */
import fs from 'fs/promises';
import path from 'path';
import { handler } from '../index.mjs';

/**
 * Read an event from disk and invoke the handler, printing the result to
 * stdout.  Exits the process with a non-zero code on failure.
 */
async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node bin/invoke.js <event.json>');
    process.exit(1);
  }

  const eventPath = path.resolve(process.cwd(), file);
  const data = await fs.readFile(eventPath, 'utf8');
  const event = JSON.parse(data);
  const context = { awsRequestId: 'cli' };
  const result = await handler(event, context);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
