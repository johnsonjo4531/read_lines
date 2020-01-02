import { TextProtoReader } from 'https://deno.land/std/textproto/mod.ts';
import { BufReader } from 'https://deno.land/std/io/bufio.ts';

/** Yields a buffer of each line given from the reader. */
export async function* linesBuffer(
	reader: Deno.Reader,
	bufferSize = 4096
): AsyncIterableIterator<Uint8Array> {
	const tpReader = new TextProtoReader(new BufReader(reader, bufferSize));
	let buffer;
	while (buffer !== Deno.EOF) {
		buffer = await tpReader.readLineSlice();
		if(buffer == Deno.EOF) {
			return;
		}
		yield buffer;
	}
}

/** Reads from a reader and yields each line as a str. */
export async function* lines(
	reader: Deno.Reader,
	bufferSize = 4096
): AsyncIterableIterator<string> {
	const tpReader = new TextProtoReader(new BufReader(reader, bufferSize));
	let buffer;
	while (buffer !== Deno.EOF) {
		buffer = await tpReader.readLine();
		if(Deno.EOF === buffer) break;
		yield buffer;
	}
}
