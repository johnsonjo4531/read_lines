import { test, assertEquals } from "./dev_deps.ts";
import { inputReader } from "./input.ts";

test("Input reader should read and write from std", async function inputReaderTest() {
	const linesIn = [
		"Something something",
		"Blah blah blah",
		"",
		"Don't know what to write here",
	];
	const linesOut = [
		"Enter something for first line: ",
		"Enter something for second line: ",
		"Enter something for third line: ",
		"Enter something for fourth line: ",
	];
	const encoder = new TextEncoder();
	const readerInput = new Deno.Buffer();
	const readerOutput = new Deno.Buffer();
	readerInput.write(encoder.encode(linesIn.join("\n")));
	const expectedOutput = new Deno.Buffer();
	await Promise.all(
		linesOut.map(async (line) => expectedOutput.write(encoder.encode(line)))
	);

	const input = inputReader(readerInput, readerOutput);

	// test that we can get output correctly
	for (var i = 0; i < linesIn.length; ++i) {
		assertEquals(await input(linesOut[i]), linesIn[i]);
	}

	assertEquals(await input(linesOut[i]), null);

	// test that data was output correctly
	assertEquals(readerOutput, expectedOutput);
});
