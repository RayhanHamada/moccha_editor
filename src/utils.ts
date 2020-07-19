import { isDev } from './globals';

/**
 * turn on/off debugLog
 */
const enableDebugLog = true;

/**
 * for logging some information in development mode
 */
export function debugLog(msg: string) {
  if (isDev && enableDebugLog) {
    console.log(msg);
  }
}
