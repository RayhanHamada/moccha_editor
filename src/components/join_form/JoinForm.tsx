import React from 'react';
import { connect } from 'react-redux';

import { JoinFormProps, mapStateToProps, mapDispatchToProps } from './logics';

import './JoinForm.scss';
import { history } from '../../store';
import routes from '../../routes/routes-names';

const JoinForm = (props: JoinFormProps) => {
	return (
		<form
			id="join-form"
			className="self-center pt-5 flex flex-col items-center"
		>
			<div className="mb-1">
				<input
					className="shadow appearance-none border rounded py-2 px-3 w-64 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="form-username"
					type="text"
					placeholder="Enter Your Username Here"
					onChange={ev => props.setUsername(ev.target.value)}
				></input>
			</div>
			<small className="mb-10">*username is required </small>
			<span className="self-center text-gray-800 text-2xl mb-2">
				Now You Can{' '}
			</span>
			<button
				className="join-button w-64 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				onClick={ev => {
					// ev.persist()
					ev.preventDefault();

					if (props.username !== '') {
						// fetch the keys, and then authenticate the user
						props.fetchRoomKey();
						// history.push(routes.editor);
						return;
					}

					alert('Username cannot be empty');
				}}
			>
				Create a room
			</button>
			<span className="self-center text-gray-800 text-2xl mb-2">Or</span>
			<div className="self-center text-gray-800 mb-2">
				Enter that random string sent by ur friend
			</div>
			<div className="mb-1">
				<input
					className="shadow appearance-none border rounded py-2 px-3 w-64 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="form-room"
					type="text"
					placeholder={`Like "bfd5b1a2-0be0......."`}
					onChange={ev => props.setRoom(ev.target.value)}
				></input>
			</div>
			<small className="mb-4">*the random string is required</small>
			<button className="join-button w-64 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
				Join the room
			</button>
			<br />
		</form>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
