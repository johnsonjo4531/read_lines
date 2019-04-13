# lines

Main script is [lines.ts](./lines.ts).

## Example

See the [example.ts](./example.ts) for an example to run. You can compare this with the cat implementation on deno's examples in the std library. This scripts time spent seems to be pretty about 2x slower than deno's cat example on my Macbook Pro's native terminal.

This example:

```sh
time deno -A example.ts mobydick.txt
```

or if you didn't install it yet:

```sh
time deno -A https://raw.githubusercontent.com/johnsonjo4531/read_lines/v1.0.1/example.ts mobydick.txt
```

Deno's cat example

```sh
time deno -A https://deno.land/std@v0.3.0/examples/cat.ts mobydick.txt
```

You can download the [mobydick.txt from project gutenberg](https://www.gutenberg.org/files/2701/2701-0.txt) or curl it (Mac/Linux) from there like so:

```sh
curl https://www.gutenberg.org/files/2701/2701-0.txt -o mobydick.txt
```

## Input example

The `lines` function's async iterator can be used directly like in [`./example_input.ts`](./example_input.ts). The input reader created in that file is somewhat similar in style to pythons `input` function.

Try it out

```sh
deno https://raw.githubusercontent.com/johnsonjo4531/read_lines/v1.0.1/example_input.ts
```
