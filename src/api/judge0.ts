import axios from 'axios';

/**
 * NOTE that testing this API call in localhost is resulting in 
 * Access-Control-Allow-Origin error / cors error, and this is inavoidable.
 * however, we're still able to use this API call for testing purposes.
 */

const BASE_API_URL = 'https://judge0.p.rapidapi.com';
const rapidApiKey = process.env.X_RAPIDAPI_KEY;

/**
 * headers options
 */
const createSubmissionHeader = {
	'x-rapidapi-host': 'judge0.p.rapidapi.com',
	'x-rapidapi-key': rapidApiKey,
	'content-type': 'application/json',
	accept: 'application/json',
	useQueryString: true,
};

const getSubmissionHeader = {
	'x-rapidapi-host': 'judge0.p.rapidapi.com',
	'x-rapidapi-key': rapidApiKey,
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
