import { Abortable } from "node:events";
import { Interface as ReadLineInterface } from "node:readline/promises";
import { Readable, Writable} from "node:stream";

export default class MyInterface extends ReadLineInterface {
  constructor(input: Readable<any>, output?: Writable<any>) {
    super(input, output)
  }

  question(query: string): Promise<string>;
  question(query: string, options: AbortableAndExpectedOutput): Promise<string>;
  async question(query: string, options?: AbortableAndExpectedOutput): Promise<string> {
    if (!options) return super.question(query);
    if (!options.expectedOutput) return super.question(query, {signal: options.signal});

    let result = await super.question(query, {signal: options.signal});
    while (!options.expectedOutput.includes(result)) {
      console.log("Invalid answer.")
      result = await super.question("> ", {signal: options.signal});
    }

    return result;
  }
}

interface AbortableAndExpectedOutput extends Abortable {
  expectedOutput?: string[]
}