# read_lines

Main script is read_lines.ts. See the example.ts for an example to run.

You can compare this with the cat implementation on deno's examples in the std library. The time spent seems to be pretty comparable.

This example:

```sh
time deno example.ts mobydick.txt -A
```

Deno's cat example

```sh
time deno https://deno.land/std/examples/cat.ts mobydick.txt -A
```

You can get the [mobydick.txt from project gutenberg](https://www.gutenberg.org/files/2701/2701-0.txt).
