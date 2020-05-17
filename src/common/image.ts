export function imageTobase64(src: string) {
  const buffer:Buffer = Buffer.from(src)
  const mimetype = 'image/jpeg'
  return `data:${mimetype || ''};base64,${buffer.toString('base64')}`;
}
