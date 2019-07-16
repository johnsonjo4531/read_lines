# read_lines

Main scripts are [lines.ts](./lines.ts) and [input.ts](./input.ts).

## Usage

### lines module

Importing the lines module:

```
import { lines, linesBuffer } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/lines.ts"
```

Usage:

#### linesBuffer

signature

```ts
async function* linesBuffer(
	reader: Deno.Reader
): AsyncIterableIterator<Deno.Buffer>
```

```ts
import { linesBuffer } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/lines.ts"

(async () => {
	const newlinebytes = new TextEncoder().encode("\n");
	const file = await Deno.open(Deno.args[0]);
	const buffer = new Deno.Buffer();
	try {
		const file_lines: Uint8Array[] = [];
		for await (const line of linesBuffer(file)) {
			// you could transform the line buffers here
			Deno.copy(buffer, line);
			buffer.write(newlinebytes);
		}
		Deno.copy(Deno.stdout, buffer);
	} finally {
		file.close();
	}
})()
```

#### lines

signature:

```ts
async function* lines(
	reader: Deno.Reader,
	bufferSize = 4096
): AsyncIterableIterator<string>
```

```ts
import { lines } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/lines.ts"

(async () => {
	const newlinebuffer = new TextEncoder().encode("\n");
	const file = await Deno.open(filename);
	try {
		let fileStr = "";
		for await (const line of lines(file)) {
			// you could transform the line buffers here
			fileStr += line + "\n";
		}
		console.log(fileStr);
	} finally {
		file.close();
	}
})();
```

If it isn't clear from the examples, first open a file then feed the file to `lines` or `linesBuffer` and they will return an iterator of the lines. `lines` will return decoded string values of the lines, and `linesBuffer` will return encoded typedArrays of the lines.


### input module

## Cat Example

See the [`./examples/cat.ts`](./examples/cat.ts) for an example to run. You can compare this with the cat implementation on deno's examples in the std library. This script's time spent seems to be roughly 3x slower than deno's cat example on my Macbook Pro's native terminal. Note that the `time` before the commands below work on bash.

This example:

```sh
$ time deno -A examples/cat.ts mobydick.txt
```

or if you didn't install it yet:

```sh
$ time deno -A https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/examples/cat.ts mobydick.txt
```

Deno's cat example

```sh
$ time deno -A https://deno.land/std@v0.3.4/examples/cat.ts mobydick.txt
```

You can download the [mobydick.txt from project gutenberg](https://www.gutenberg.org/files/2701/2701-0.txt) or curl it (Mac/Linux) from there like so:

```sh
$ curl https://www.gutenberg.org/files/2701/2701-0.txt -o mobydick.txt
```

## Input Example

The `lines` function's async iterator can be used directly like in [`./input.ts`](./input.ts). The input reader created in that file is somewhat similar in style to pythons `input` function. An example using the input method is given in [`./examples/input.ts`](./examples/input.ts)

Try it out

```sh
$ deno https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/examples/input.ts
```

Here's an example run of the program

```sh
$ deno https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/examples/input.ts
-- DENO ADDER --
Enter a number: 2
Enter another number: 3
2 + 3 = 5
```

## Generating a long single line file

You can generate a large single line file by running the [`./createTestFile.ts`](./createTestFile.ts) script like so: (requires file redirect shown is in unix)

```sh
deno createTestFile.ts > example.txt
```

The buffered lines cat example should be able to run with a long single file

```sh
deno examples/cat.ts example.txt
```

But the string lines cat example should run out of memory because the string
being built for the line will get too large.
I don't know a good way to get around this and keep the nice string api.

```sh
deno examples/cat2.ts example.txt
```
