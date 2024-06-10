/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createHumanLogs } from 'human-logs';
import pino from 'pino';

export const apiLog = (o: any) =>
  createHumanLogs({
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
  })(o).message;

export const createLogger = ({
  label,
  level,
}: {
  label: string;
  level?: string;
}) => {
  return pino({
    level: level ?? 'info',
    name: label,
    transport: {
      target: './prettyTransport',
      options: {
        colorize: true,
        // customPrettifiers: {
        //   // The argument for this function will be the same
        //   // string that's at the start of the log-line by default:
        //   time: () => '',

        //   // The argument for the level-prettifier may vary depending
        //   // on if the levelKey option is used or not.
        //   // By default this will be the same numerics as the Pino default:
        //   // level: (logLevel) => `LEVEL: ${logLevel}`,
        //   // level provides additional data in `extras`:
        //   // * label => derived level label string
        //   // * labelColorized => derived level label string with colorette colors applied based on customColors and whether colors are supported
        //   level: (logLevel, key, log, { label, labelColorized, colors }) =>
        //     `LEVEL: ${logLevel} LABEL: ${label} COLORIZED LABEL: ${labelColorized}`,

        //   // other prettifiers can be used for the other keys if needed, for example
        //   hostname: (hostname) => `MY HOST: ${hostname}`,
        //   pid: (pid) => pid,
        //   name: (name, key, log, { colors }) => `${colors.blue(name)}`,
        //   caller: (caller, key, log, { colors }) =>
        //     `${colors.greenBright(caller)}`,
        //   myCustomLogProp: (value, key, log, { colors }) =>
        //     `My Prop -> ${colors.bold(value)} <--`,
        // },
      },
    },

    // format: winston.format.combine(
    //   winston.format.label({ label }),
    //   winston.format.colorize(),
    //   winston.format.printf(({ level, message, label, file }) => {
    //     return `${level}: [${label}] ${message}     ${file || ''}`;
    //   })
    // ),
    // transports: [new winston.transports.Console()],
  });
};
