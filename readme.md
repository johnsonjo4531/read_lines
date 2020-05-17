# read_lines

Main scripts are [lines.ts](./lines.ts) and [input.ts](./input.ts).

## Table of Contents

- [read_lines](#readlines)
	- [Table of Contents](#table-of-contents)
	- [What and Why](#what-and-why)
	- [input module](#input-module)
		- [Usage](#usage)
			- [`input`](#input)
			- [`inputReader`](#inputreader)
		- [Examples](#examples)
			- [Input Program](#input-program)
	- [Lines module](#lines-module)
		- [Usage](#usage-1)
			- [`linesBuffer`](#linesbuffer)
			- [`lines`](#lines)
		- [Examples](#examples-1)
			- [Cat Program using Lines](#cat-program-using-lines)

## What and Why

Input is a module that is inspired by pythons input method. It allows writing to a Writer (like stdout) and waiting for input separated by a newline by reading from a Reader (such as stdin).

Lines is now a deprecated module, because it can now be achieved with only the Deno standard library functions in `bufio.ts` read below or look at the implementation to see how it's implemented now. Lines is a module to read a file line by line using an Async Iterable using `for await of`. It can be useful for getting buffers of the lines with the exported `linesBuffer` method or for getting the decoded strings of the lines with the `lines` method.

## input module

### Usage

#### `input`

The `input` method allows you to prompt the user on stdout and wait for a line of input on stdin.

signature:

```ts
type input = async (output: string) => Promise<string | Deno.EOF>
```

input example:

```ts
import { input } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v3.1.0/input.ts";

(async () => {
	console.log("-- DENO ADDER --");
	// will return EOF string if end of file is hit.
	const num1 = String(await input("Enter a number: "));
	const num2 = String(await input("Enter another number: "));
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
import { inputReader } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v3.1.0/input.ts";

// you could substitute Deno.stdin and Deno.stdout with any open file (with appropriate permissions)
// or with a Deno Reader and Writer.
const input = inputReader(Deno.stdin, Deno.stdout);

// the below produces the same output as the input example
(async () => {
	console.log("-- DENO ADDER --");
	// get the next line throws if it reaches the EOF
	const num1 = String(await input("Enter a number: "));
	const num2 = String(await input("Enter another number: "));
	console.log(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
})();
```

### Examples

#### Input Program

The `lines` function's async iterator can be used directly like in [`./input.ts`](./input.ts). The input reader created in that file is somewhat similar in style to pythons `input` function. An example using the input method is given in [`./examples/input.ts`](./examples/input.ts)

Try it out

```sh
$ deno https://raw.githubusercontent.com/johnsonjo4531/read_lines/v3.1.0/examples/input.ts
```

Here's an example run of the program

```sh
$ deno https://raw.githubusercontent.com/johnsonjo4531/read_lines/v3.1.0/examples/input.ts
-- DENO ADDER --
Enter a number: 2
Enter another number: 3
2 + 3 = 5
```

## Lines module

### Usage

⚠ The lines module is now deprecated due to the changes in Deno standard library these functions are replaced by readDelim and readLines in std/io/bufio. It's suggested you just use those.⚠️

Importing the lines module:

```ts
import {
	lines,
	linesBuffer,
} from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v3.1.0/lines.ts";
```

#### `linesBuffer`

The `linesBuffer` method is deprecated and is now just a light wrapper around [readDelim](https://github.com/denoland/deno/blob/a29343c7d6b5dad26c5d501eb6d21e9caf382a58/std/io/bufio.ts#L534-L590) from Deno standard library it's suggested you just use that.  
It will help you read input line by line through an async iterable with buffered output.

signature:

```ts
export async function* linesBuffer(
	reader: Deno.Reader
): AsyncIterableIterator<Uint8Array>;
```

cat program example:

```ts
import { linesBuffer } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v3.1.0/lines.ts";

(async () => {
	const newlinebytes = new TextEncoder().encode("\n");
	const file = await Deno.open(Deno.args[0]);
	const buffer = new Deno.Buffer();
	try {
		for await (const line of linesBuffer(file)) {
			// you could transform the line buffers here
			buffer.write(line);
			buffer.write(newlinebytes);
		}
		Deno.copy(Deno.stdout, buffer);
	} finally {
		file.close();
	}
})();
```

#### `lines`

The `lines` method is now deprecated and is literally just an an alias to [readLines](https://github.com/denoland/deno/blob/a29343c7d6b5dad26c5d501eb6d21e9caf382a58/std/io/bufio.ts#L604-L609) in Deno standard library.

signature:

```ts
async function* lines(
	reader: Deno.Reader,
	bufferSize = 4096
): AsyncIterableIterator<string>;
```

cat program example:

```ts
import { lines } from "https://raw.githubusercontent.com/johnsonjo4531/read_lines/v3.1.0/lines.ts";

(async () => {
	const newlinebuffer = new TextEncoder().encode("\n");
	const file = await Deno.open(Deno.args[0]);
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

### Examples

#### Cat Program using Lines

See the [`./examples/cat.ts`](./examples/cat.ts) for an example to run. You can compare this with the cat implementation on deno's examples in the std library. This script's time spent seems to be roughly 3x slower than deno's cat example on my Macbook Pro's native terminal. Note that the `time` before the commands below work on bash.

This example:

```sh
$ time deno -A examples/cat.ts mobydick.txt
```

or if you didn't install it yet:

```sh
$ time deno -A https://raw.githubusercontent.com/johnsonjo4531/read_lines/v3.1.0/examples/cat.ts mobydick.txt
```

Deno's cat example

```sh
$ time deno -A https://deno.land/std@v0.36.0/examples/cat.ts mobydick.txt
```

You can download the [mobydick.txt from project gutenberg](https://www.gutenberg.org/files/2701/2701-0.txt) or curl it (Mac/Linux) from there like so:

```sh
$ curl https://www.gutenberg.org/files/2701/2701-0.txt -o mobydick.txt
```
