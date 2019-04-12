export default function concatBytes(...arrs: Uint8Array[]) {
  // map to bytelengths and sum.
  const totalByteLength = arrs
    .map(x => x.byteLength)
    .reduce((a, b) => a + b, 0);
  const arr = new Uint8Array(totalByteLength);
  let k = 0;
  for (let i = 0; i < arrs.length; ++i) {
    arr.set(arrs[i], k);
    k += arrs[i].byteLength;
  }
  return arr;
}
