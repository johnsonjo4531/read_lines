type Reader = Deno.Reader;
import { readDelim, readLines } from 'https://deno.land/std@v0.36.0/io/bufio.ts';

/** Yields a buffer of each line given from the reader. */
/** Read delimited strings from a Reader. */
export async function* linesBuffer(
	reader: Deno.Reader,
): AsyncIterableIterator<Uint8Array> { yield* readDelim(reader, new TextEncoder().encode('\n')) };

/** Reads from a reader and yields each line as a str. */
export const lines = readLines;
