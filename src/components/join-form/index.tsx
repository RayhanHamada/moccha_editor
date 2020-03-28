import React, { useEffect, EventHandler } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MyTypes } from '../../store/app-custom-types';

import * as authActions from '../../features/auth/actions';
import routes from '../../routes/routes-names';
import { history } from '../../store';

import FormButton from './FormButton';

import './index.scss';

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			setUsername: authActions.setUsername,
			setRoom: authActions.setRoom,
			fetchRoomKey: authActions.getRoomKey.request,
			reqRoomExistence: authActions.checkRoomExistence.request,
		},
		dispatch
	);

const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	username: authReducer.username,
	roomKey: authReducer.roomKey,
	authenticated: authReducer.authenticated,
});

type JoinFormProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;

const JoinForm = (props: JoinFormProps) => {
	/*
	 * event for create room button
	 */
	const createRoom: EventHandler<React.MouseEvent<
		HTMLButtonElement,
		MouseEvent
	>> = ev => {
		ev.preventDefault();

		if (props.username !== '') {
			/*
			 * fetch the keys, and then authenticate the user
			 */
			props.fetchRoomKey();
			return;
		}

		alert('Username cannot be empty');
	};

	/*
	 * event for join room button
	 */
	const joinRoom: EventHandler<React.MouseEvent<
		HTMLButtonElement,
		MouseEvent
	>> = e => {
		e.preventDefault();

		/*
		 * to join the room, username and roomKey shouldn't be empty string
		 * and roomKey should be exists on database
		 */
		if (props.username !== '' && props.roomKey !== '') {
			props.reqRoomExistence();
			return;
		}

		alert('username cannot be empty !');
	};

	/*
	 * if user is authenticated, then navigate to /editor page
	 */
	useEffect(() => {
		if (props.authenticated) {
			history.push(routes.editor);
		}
	}, [props.authenticated]);

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
			<FormButton onClick={createRoom}>Create The Room</FormButton>
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
			<FormButton onClick={joinRoom}>Join The Room</FormButton>
			<br />
		</form>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
