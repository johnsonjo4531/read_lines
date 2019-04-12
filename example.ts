import lines from "./read_lines.ts";
import concatBytes from "./concatBytes.ts";

async function cat(filenames: string[]): Promise<void> {
  const newlinebuffer = new TextEncoder().encode("\r\n");
  for (let filename of filenames) {
    const file_lines: Uint8Array[] = [];
    for await (const line of lines(filename)) {
      // you could transform the line buffers here
      file_lines.push(line);
      file_lines.push(newlinebuffer);
    }
    Deno.stdout.write(concatBytes(...file_lines));
  }
}

cat(Deno.args.slice(1));
