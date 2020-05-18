// import { imageTobase64 } from '../common/image';

// export async function compileImage(source: string) {
//   const base64Data = await imageTobase64(source)
//   return base64Data;
// }
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
// 最大图片大小
const MAX_IMAGE_SIZE = 10240;
const USE_MIME_TYPE = true;
const BASE64_ENCODING = 'base64'

function getMimetype(mimetype:boolean, resourcePath:string) {
  if (typeof mimetype === 'boolean') {
    if (mimetype) {
      const resolvedMimeType = mime.contentType(path.extname(resourcePath));

      if (!resolvedMimeType) {
        return '';
      }

      return resolvedMimeType.replace(/;\s+charset/i, ';charset');
    }

    return '';
  }

  if (typeof mimetype === 'string') {
    return mimetype;
  }

  const resolvedMimeType = mime.contentType(path.extname(resourcePath));

  if (!resolvedMimeType) {
    return '';
  }

  return resolvedMimeType.replace(/;\s+charset/i, ';charset');
}
function getEncoding(encoding?:string) {
  if (typeof encoding === 'boolean') {
    return encoding ? 'base64' : '';
  }

  if (typeof encoding === 'string') {
    return encoding;
  }

  return 'base64';
}

function shouldTransform(limit:boolean|string|number, size:number) {
  if (typeof limit === 'boolean') {
    return limit;
  }

  if (typeof limit === 'string') {
    return size <= parseInt(limit, 10);
  }

  if (typeof limit === 'number') {
    return size <= limit;
  }

  return true;
}

function getEncodedData(mimetype:string, encoding:string, content:Buffer|string, resourcePath:string) {

  return `data:${mimetype}${encoding ? `;${encoding}` : ''},${content.toString(
    // eslint-disable-next-line no-undefined
    encoding || undefined
  )}`;
}

export function imageTobase64(content: string|Buffer, resourcePath: string) {
  // const buffer:Buffer = Buffer.from(src)
  // const mimetype = 'image/jpeg'
  // return `data:${mimetype || ''};base64,${buffer.toString('base64')}`;

  if (shouldTransform(MAX_IMAGE_SIZE, content.length)) {
    const mimetype = getMimetype(USE_MIME_TYPE, resourcePath);
    const encoding = getEncoding(BASE64_ENCODING);

    if (typeof content === 'string') {
      // eslint-disable-next-line no-param-reassign
      content = Buffer.from(content);
    }

    const encodedData = getEncodedData(
      mimetype,
      encoding,
      content,
      resourcePath
    );

    // const esModule =
    //   typeof options.esModule !== 'undefined' ? options.esModule : true;

    // return `${
    //   esModule ? 'export default' : 'module.exports ='
    // } ${JSON.stringify(encodedData)}`;

    return `module.exports = ${JSON.stringify(encodedData)}`;
  }
}



export  async function compileImage(resourcePath:string) {
  const raw = fs.readFileSync(resourcePath)
  const base64Data = await imageTobase64(raw, resourcePath)
  return base64Data;
} 