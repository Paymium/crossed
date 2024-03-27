/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createHumanLogs } from 'human-logs';
import winston from 'winston';

export const apiLog = createHumanLogs({
  events: {
    eval_style_function_error: 'Cannot eval style with theme',
    detect_style_function: 'Style creation detection',
    parser_hook_undefined: 'Parser hook not exist',
    ast_type_not_implemented: 'Ast type is not implemented',
    css_output_success: 'css output was written successfully',
    css_output_error: 'css output error',
    create_instance_success: 'Plugin bridge created successfully',
  },
  explanations: {
    // api_unreachable: 'because the API cannot be reached.',
  },
  solutions: {
    // check_status_page: {
    //   template: 'You can check the status of our services on our status page.',
    //   params: {},
    //   actions: [
    //     {
    //       text: 'Go to status page',
    //       href: 'https://skosh.dev',
    //     },
    //   ],
    // },
    // project_view: {
    //   template: 'View the project.',
    //   params: {},
    //   actions: [
    //     {
    //       text: 'View',
    //       href: 'https://skosh.dev',
    //     },
    //   ],
    // },
  },
});

// export const logger = winston.createLogger({
//   level: 'info',
//   // format: winston.format.combine(
//   //   winston.format.colorize(),
//   //   winston.format.printf(({ level, message, label }) => {
//   //     return `[${label}] ${level}: ${message}`;
//   //   })
//   // ),
//   transports: [new winston.transports.Console()],
// });

export const createLogger = ({
  label,
  level,
}: {
  label: string;
  level?: string;
}) => {
  return winston.createLogger({
    level: level ?? 'info',
    format: winston.format.combine(
      winston.format.label({ label }),
      winston.format.colorize(),
      winston.format.printf(({ level, message, label, file }) => {
        return `${level}: [${label}] ${message}     ${file || ''}`;
      })
    ),
    transports: [new winston.transports.Console()],
  });
  // return logger.child({
  //   format: winston.format.combine(
  //     winston.format.label({ label }),
  //     winston.format.colorize(),
  //     winston.format.printf(({ level, message, label }) => {
  //       return `[${label}] ${level}: ${message}`;
  //     })
  //   ),
  // });
};
