# read_lines

Main script is read_lines.ts. See the example.ts for an example to run.

You can compare this with the cat implementation on deno's examples in the std library. The time spent seems to be pretty about 3x slower on my Macbook and about the same on my PC.

This example:

```sh
time deno -A example.ts mobydick.txt
```

or if you didn't install it yet:

```
time deno -A https://raw.githubusercontent.com/johnsonjo4531/read_lines/master/example.ts mobydick.txt
```

Deno's cat example

```sh
time deno -A https://deno.land/std/examples/cat.ts mobydick.txt
```

You can get the [mobydick.txt from project gutenberg](https://www.gutenberg.org/files/2701/2701-0.txt) or curl it:

```sh
curl https://www.gutenberg.org/files/2701/2701-0.txt -o mobydick.txt
```
