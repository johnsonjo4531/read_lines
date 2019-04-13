import { lines } from "./lines.ts";

async function cat(filenames: string[]): Promise<void> {
  const newlinebuffer = new TextEncoder().encode("\n");
  for (let filename of filenames) {
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
  }
}

cat(Deno.args.slice(1));
