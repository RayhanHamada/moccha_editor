declare namespace AppAPI {
	type SubmissionResult = {
		stdout: string;
		stderr: string;
		status: {
			id: number;
			description: string;
		};
	};
}
