import { BufReader } from "https://deno.land/x/io@v0.3.4/bufio.ts";

/** Yields a buffer of each line given from the reader. */
export async function* linesBuffer(
	reader: Deno.Reader
): AsyncIterableIterator<Deno.Buffer> {
	const bufReader = new BufReader(reader);
	let bufState = null;
	let buffer = new Deno.Buffer();
	while (bufState !== "EOF") {
		let bytes, isPrefix;
		[bytes, isPrefix, bufState] = await bufReader.readLine();
		await buffer.write(bytes);
		if (isPrefix) {
			continue;
		}
		if (bufState === "EOF") {
			return;
		}
		yield buffer;
		buffer = new Deno.Buffer();
	}
}

/** Reads from a reader and yields each line as a str. */
export async function* lines(
	reader: Deno.Reader,
	bufferSize = 4096
): AsyncIterableIterator<string> {
	const decoder = new TextDecoder();
	for await (const line of linesBuffer(reader)) {
		// yield
		const buffer = new Deno.Buffer();
		let eof = false,
			nread = 0,
			str = "";
		const bytes = new Uint8Array(bufferSize);
		while (!eof) {
			({ nread, eof } = await line.read(bytes));
			if (bytes.byteLength === nread) {
				str += decoder.decode(bytes);
			} else {
				str += decoder.decode(bytes.slice(0, nread));
			}
		}
		yield str;
	}
}
