import { runTests, test, assertEquals } from "./dev_deps.ts";
import { lines, linesBuffer } from "./lines.ts";

test(async function linesBufferTest() {
	const line1 = "Something something";
	const line2 = "Blah blah blah";
	const line3 = "";
	const line4 = "Don't know what to write here";
	const encoder = new TextEncoder();
	const input = new Deno.Buffer();
	const outputLine1 = new Uint8Array(encoder.encode(line1));
	const outputLine2 = new Uint8Array(encoder.encode(line2));
	const outputLine3 = new Uint8Array(encoder.encode(line3));
	const outputLine4 = new Uint8Array(encoder.encode(line4));
	input.write(encoder.encode(`${line1}\n${line2}\n${line3}\n${line4}`));
	const expected = new Deno.Buffer();
	[outputLine1, outputLine2, outputLine3, outputLine4].forEach(function (x) {
		expected.write(x);
	});

	const output = new Deno.Buffer();
	for await (const lineBuff of linesBuffer(input)) {
		output.write(lineBuff);
	}

	assertEquals(output, expected);
});

test(async function linesTest() {
	const line1 = "Something something";
	const line2 = "Blah blah blah";
	const line3 = "";
	const line4 = "Don't know what to write here";
	const encoder = new TextEncoder();
	const input = new Deno.Buffer();
	input.write(encoder.encode(`${line1}\n${line2}\n${line3}\n${line4}`));
	const expected = [line1, line2, line3, line4];

	const output = [];
	for await (const lineBuff of lines(input)) {
		output.push(lineBuff);
	}

	assertEquals(output, expected);
});

runTests();
