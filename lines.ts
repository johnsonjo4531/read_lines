import { BufReader } from "https://deno.land/x/io/bufio.ts";
import concatBytes from "./concatBytes.ts";

/**
 *  returns an AsyncIterable of lines from the given file in bytes.
 */
export async function* linesBytes(
  reader: Deno.Reader
): AsyncIterableIterator<Uint8Array> {
  const bufReader = new BufReader(reader);
  let bufState;
  let allBytes = [];
  while (bufState !== "EOF") {
    let bytes, isPrefix;
    [bytes, isPrefix, bufState] = await bufReader.readLine();
    if (isPrefix) {
      allBytes.push(bytes);
      continue;
    }
    if (allBytes.length > 0) {
      allBytes.push(bytes);
      bytes = concatBytes(...allBytes);
      allBytes = [];
    }
    yield bytes;
  }
}

/**
 * Reads from a reader and yields each line
 */
export async function* lines(
  reader: Deno.Reader
): AsyncIterableIterator<string> {
  const decoder = new TextDecoder();
  for await (const line of linesBytes(reader)) {
    yield decoder.decode(line);
  }
}
