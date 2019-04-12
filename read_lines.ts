import concatBytes from "./concatBytes.ts";

/**
 *  returns an AsyncIterable of lines from the given file.
 */
export async function* file_lines(file: Deno.File): AsyncIterable<Uint8Array> {
  // The Carriage-Return Line-Feed characters encoded
  const CRLF = new TextEncoder().encode("\r\n");
  // the data that is batched until a new line is hit
  let prevData = null;
  // just the amount of bytes to read from the file at a time
  let readBytes = 2 ** 8;
  const data = new Uint8Array(readBytes);

  let readResult = { eof: false, nread: 0 };
  while (!readResult.eof) {
    readResult = await file.read(data);
    let checkData;

    if (prevData) {
      checkData = concatBytes(prevData, data.slice(0, readResult.nread));
    } else {
      checkData = data.slice(0, readResult.nread);
    }

    let lastFind = 0;
    for (
      let i = prevData ? prevData.byteLength : 0;
      i < checkData.length;
      i++
    ) {
      if (checkData[i] == CRLF[0] && checkData[i + 1] == CRLF[1]) {
        yield checkData.slice(lastFind, i);
        lastFind = i + 2;
        i += 2;
      } else if (checkData[i] == CRLF[1]) {
        yield checkData.slice(lastFind, i);
        lastFind = i + 1;
        i += 1;
      }
    }

    // save characthers that aren't a full line yet
    prevData = checkData.slice(lastFind);
    // maybe yield previous data here if it exceeds some maximum byte length
    // then set it to null again
  }
  if (prevData.byteLength > 0) {
    yield prevData;
  }
}

/**
 * Opens a file with the file name and returns an AsyncIterable of `Uint8Array`s of lines from that file.
 * Once the iterator has finished or errored it closes the file
 */
export default async function* read_lines(
  fileName: string
): AsyncIterable<Uint8Array> {
  const file = await Deno.open(fileName);
  try {
    yield* file_lines(file);
  } finally {
    file.close();
  }
}
