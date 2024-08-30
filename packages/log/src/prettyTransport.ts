/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export default (opts: any) =>
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('pino-pretty')({
    ...opts,
    colorizeObjects: true,
    include: 'level,name',
    messageFormat: (log: any) => {
      return `${typeof log.msg === 'string' ? log.msg : log}     ${log.msg?.file || ''}`; // log.msg || log;
    },
  });
