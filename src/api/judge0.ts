import axios from 'axios';

const BASE_API_URL = 'https://judge0.p.rapidapi.com';

/**
 * headers options
 */
const createSubmissionHeader = {
	'x-rapidapi-host': 'judge0.p.rapidapi.com',
	'x-rapidapi-key': process.env['x-rapidapi-key'],
	'content-type': 'application/json',
	accept: 'application/json',
	useQueryString: true,
};

const getSubmissionHeader = {
	'x-rapidapi-host': 'judge0.p.rapidapi.com',
	'x-rapidapi-key': process.env['x-rapidapi-key'],
	useQueryString: true,
};

/**
 * @name    createSubmissionAPI
 * @method  POST
 * @query   language_id => specify what language this source code is in
 *          source_code => the source_code
 * @param
 * @desc    get submission token
 * @return  object => token
 */

export const createSubmissionAPI = (langID: number, code: string) =>
	axios
		.post(
			`${BASE_API_URL}/submissions`,
			{
				language_id: langID,
				source_code: code,
			},
			{
				headers: createSubmissionHeader,
			}
		)
		.then(res => res.data.token as string);

/**
 * @name        getSubmissionAPI
 * @method      GET
 * @query       -
 * @param       {string} token
 * @desc        get submission result
 * @return      SubmissionResult (see api.d.ts)
 */

export const getSubmissionAPI = (token: string) =>
	axios
		.get(`${BASE_API_URL}/submissions/${token}`, {
			headers: getSubmissionHeader,
		})
		.then(res => res.data as AppAPI.SubmissionResult);
