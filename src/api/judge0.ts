// @ts-nocheck
import axios from 'axios';

const BASE_API_URL = 'https://api.judge0.com';

/*
 * @name    fetchSubmissionToken
 * @method  POST
 * @query   language_id => specify what language this source code is in
 *          source_code => the source_code
 * @param
 * @desc    get submission token
 * @return  object => token
 */

export const fetchSubmissionToken = (langID: number, code: string) =>
	axios
		.post(`${BASE_API_URL}/submissions`, {
			language_id: langID,
			source_code: code,
		})
		.then(res => res.data.token as string);

/*
 * @name        fetchSubmissionResult
 * @method      GET
 * @query       -
 * @param       token
 * @desc        get submission result
 * @return      SubmissionResult (see api.d.ts)
 */

export const fetchSubmissionResult = (token: string) =>
	axios
		.get(`${BASE_API_URL}/submissions/${token}`)
		.then(res => res.data as AppAPI.SubmissionResult);
