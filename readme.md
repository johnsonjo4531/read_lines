# read_lines

Main scripts are [lines.ts](./lines.ts) and [input.ts](./input.ts).

## Table of Contents

- [What and Why](#what-and-why)
- [Usage](#usage)
	- [lines module](#lines-module)
		- [`linesBuffer`](#linesbuffer)
		- [`lines`](#lines)
	- [input module](#input-module)
		- [`input`](#input)
		- [`inputReader`](#inputreader)
	- [Examples](#examples)
		- [Cat Program](#cat-program)
		- [Input Program](#input-program)
	- [Known Problems](#known-problems)
		- [Handling a long single line file](#handling-a-long-single-line-file)

## What and Why

Lines is a module to read a file line by line using promises and/or async/await. It can be useful for getting buffers of the lines with the exported `linesBuffer` method or for getting the decoded strings of the lines with the `lines` method.

Input is a module that is inspired by pythons input method. It allows writing to a file stream (like stdout) and waiting for input seperated by a newline by reading from a filestream (such as stdin).

## Usage

### lines module

Importing the lines module:

```
import { lines, linesBuffer } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/lines.ts"
```

#### `linesBuffer`

The `linesBuffer` method will help you read input line by line through an async iterable with buffered output.

signature:

```ts
async function* linesBuffer(
	reader: Deno.Reader
): AsyncIterableIterator<Deno.Buffer>;
```

cat program example:

```ts
import { linesBuffer } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/lines.ts";

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
})();
```

#### `lines`

The `lines` method will help you read input line by line through an async iterable with buffered output.

signature:

```ts
async function* lines(
	reader: Deno.Reader,
	bufferSize = 4096
): AsyncIterableIterator<string>;
```

cat program example:

```ts
import { lines } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/lines.ts";

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

### input module

#### `input`

The `input` method allows you to prompt the user on stdout and wait for a line of input on stdin.

signature:

```ts
type input = async (output: string) => Promise<string>
```

input example:

```ts
import { input } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/input.ts";

(async () => {
	console.log("-- DENO ADDER --");
	// get the next line throws if it reaches the EOF
	const num1 = await input("Enter a number: ");
	const num2 = await input("Enter another number: ");
	console.log(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
})();
```

#### `inputReader`

The `inputReader` method allows you to create an `input` method of your own with different different input and output files besides stdin and stdout.

signature:

```ts
type input = async (output: string) => Promise<string>

inputReader(
	reader: Deno.Reader = Deno.stdin,
	writer: Deno.Writer = Deno.stdout
): input
```

inputReader example:

```ts
import { inputReader } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v2.1.0/input.ts";

// you could substitute Deno.stdin and Deno.stdout with any open file (with appropriate permissions)
// or with a Deno Reader and Writer.
const input = inputReader(Deno.stdin, Deno.stdout);

// the below produces the same output as the input example
(async () => {
	console.log("-- DENO ADDER --");
	// get the next line throws if it reaches the EOF
	const num1 = await input("Enter a number: ");
	const num2 = await input("Enter another number: ");
	console.log(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
})();
```

## Examples

### Cat Program

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

### Input Program

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

## Known Problems

### Handling a long single line file

The `lines` method of the lines method cannot handle a long single line file. To test this you can generate a large single line file by running the [`./createTestFile.ts`](./createTestFile.ts) script like so: (requires file redirect shown is in unix)

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
