import React from 'react';

import { Dispatch, bindActionCreators } from 'redux';
import { MyTypes } from '../types';
import * as joinRoomAction from '../features/join/joinAction';

import './JoinForm.scss';
import { connect } from 'react-redux';
import { history } from '../store';

const mapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) =>
	bindActionCreators(
		{
			setUsername: joinRoomAction.setUsername,
			setRoom: joinRoomAction.setRoom,
			authenticate: joinRoomAction.authenticate,
		},
		dispatch
	);

const mapStateToProps = ({ joinRoomReducer }: MyTypes.RootState) => ({
	username: joinRoomReducer.username,
	room: joinRoomReducer.room,
});

type JoinFormProps = ReturnType<typeof mapDispatchToProps> &
	ReturnType<typeof mapStateToProps>;

const JoinForm = (props: JoinFormProps) => {
	// go to editor page
	const goToEditor = () => {
		// for now just checking if room and username field is not empty
		if (props.room === '' || props.username === '') {
			alert('Form Field must not be empty and alphanumeric allowed only');
			return;
		}
		props.authenticate();
		history.push('/editor');
	};

	return (
		<form id="join-form" className="self-center pt-5">
			<div className="mb-4">
				<label className="block text-gray-800 text-lg" htmlFor="username">
					Username
				</label>
				<input
					className="shadow appearance-none border rounded py-2 px-3 w-64 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="form-username"
					type="text"
					placeholder="Enter Your Username Here"
					onChange={ev => props.setUsername(ev.target.value)}
				></input>
			</div>
			<div className="mb-4">
				<label className="block text-gray-800 text-lg" htmlFor="username">
					Room
				</label>
				<input
					className="shadow appearance-none border rounded py-2 px-3 w-64 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="form-room"
					type="text"
					placeholder="Enter Your Room Here"
					onChange={ev => props.setRoom(ev.target.value)}
				></input>
			</div>
			<button
				className="join-button w-64 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				onClick={goToEditor}
			>
				Join the Room
			</button>
			<br />
			<small>*Un-existed Room will created automatically</small>
		</form>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
