declare namespace AppAPI {
	type SubmissionResult = {
		stdout: string;
		stderr: string;
		time: string;
		message: string;
		compile_output: string;
		status: {
			id: number;
			description: string;
		};
	};
}
