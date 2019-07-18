import { linesBuffer } from "../lines.ts";

async function cat(filenames: string[]): Promise<void> {
	const newlinebytes = new TextEncoder().encode("\n");
	for (let filename of filenames) {
		const file = await Deno.open(filename);
		const buffer = new Deno.Buffer();
		try {
			const file_lines: Uint8Array[] = [];
			for await (const line of linesBuffer(file)) {
				// you could transform the line buffers here
				buffer.write(line);
				buffer.write(newlinebytes);
			}
			Deno.copy(Deno.stdout, buffer);
		} finally {
			file.close();
		}
	}
}

cat(Deno.args.slice(1));
