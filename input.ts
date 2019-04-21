import { lines } from "./lines.ts";

/** Returns a python like input reader. */
export function inputReader(
	reader: Deno.Reader = Deno.stdin,
	writer: Deno.Writer = Deno.stdout
) {
	const lineReader = lines(reader);
	/**
	 * Python like input reader. Returns an array containing at the first index
	 * the line read and at the second index a boolean indicating whether the eof
	 * has been reached.
	 */
	return async function input(output: string): Promise<string> {
		if (output) {
			writer.write(new TextEncoder().encode(output));
		}
		const { value, done } = await lineReader.next();
		if (done) {
			throw new Deno.DenoError(Deno.ErrorKind.UnexpectedEof, "EOF reached");
		}
		return value;
	};
}

/**
 * Takes a string to output to stdout and returns a string
 * that was given on stdin. Throws when end of file is reached.
 */
export const input = inputReader();
