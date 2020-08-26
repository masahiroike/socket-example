import { createConnection } from 'typeorm';
import 'ts-polyfill/lib/es2019-array';
import 'ts-polyfill/lib/es2019-object';
import 'ts-polyfill/lib/es2019-string';
import 'ts-polyfill/lib/es2019-symbol';
createConnection().then(() => {
  import('./Servers/Socket');
});
