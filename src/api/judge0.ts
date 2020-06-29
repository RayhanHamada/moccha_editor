import axios from 'axios';
import { serverUrl } from '../globals';

const baseUrl = `${serverUrl}/api/judge0`;

/**
 * @name    createSubmissionAPI
 * @method  POST
 * @query   {number} langID specify what language this source code is in
 *          {string} code the source code
 * @param 	{number} langId
 * @param	{string} sourceCode
 * @desc    get submission token
 * @returns {string} token
 */
export const createSubmissionAPI = (langId: number, sourceCode: string) =>
  axios
    .post(`${baseUrl}/v0/createSubmissions`, {
      langId,
      sourceCode,
    })
    .then(res => res.data.token as string);

/**
 * @name        getSubmissionAPI
 * @method      GET
 * @query       -
 * @param       {string} token
 * @desc        get submission result
 * @returns     {AppAPI.SubmissionResult} submissionResult (see api.d.ts)
 */
export const getSubmissionAPI = (token: string) =>
  axios
    .get<AppAPI.SubmissionResult>(`${baseUrl}/v0/getSubmissionResult/${token}`)
    .then(res => res.data);
