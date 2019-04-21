# read_lines

Main scripts are [lines.ts](./lines.ts) and [input.ts](./input.ts).

## Cat Example

See the [example.ts](./example.ts) for an example to run. You can compare this with the cat implementation on deno's examples in the std library. This script's time spent seems to be roughly 3x slower than deno's cat example on my Macbook Pro's native terminal.

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

The `lines` function's async iterator can be used directly like in [`./example_input.ts`](./example_input.ts). The input reader created in that file is somewhat similar in style to pythons `input` function.

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

This file would

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
