import React, { useEffect, EventHandler } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MyTypes } from '../../types/app-store';

import * as authActions from '../../features/auth/actions';

import routes from '../../routes/routes-names';
import { history } from '../../store';

import FormButton from './FormButton';

import './index.scss';

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
  bindActionCreators(
    {
      setUsername: authActions.setUsername,
      setRoomKey: authActions.setRoomKey,
      fetchRoomKey: authActions.getRoomKey.request,
      reqRoomExistence: authActions.getRoomExistence.request,
    },
    dispatch
  );

const mapStateToProps = ({ auth }: MyTypes.RootState) => ({
  username: auth.me.username,
  roomKey: auth.roomKey,
  authenticated: auth.authenticated,
});

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const JoinForm = (props: Props) => {
  /**
   * event for create room button
   */
  const createRoom: EventHandler<React.MouseEvent<
    HTMLButtonElement,
    MouseEvent
  >> = ev => {
    ev.preventDefault();

    if (props.username !== '') {
      /**
       * fetch the keys, and then authenticate the user
       */
      props.fetchRoomKey();
      return;
    }

    alert('Username cannot be empty');
  };

  /**
   * event for join room button
   */
  const joinRoom: EventHandler<React.MouseEvent<
    HTMLButtonElement,
    MouseEvent
  >> = e => {
    e.preventDefault();

    /**
     * to join the room, username and roomKey shouldn't be empty string
     * and roomKey should be exists on database
     */
    if (props.username !== '' && props.roomKey !== '') {
      props.reqRoomExistence();
      return;
    }

    alert('username and room key cannot be empty !');
  };

  const onChangeUsername = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    /**
     * set auth's username
     */
    props.setUsername(value);
  };

  const onChangeRoom = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;

    /**
     * set room Key
     */
    props.setRoomKey(value);
  };

  /**
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
          onChange={onChangeUsername}
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
          onChange={onChangeRoom}
        ></input>
      </div>
      <small className="mb-4">*the random string is required</small>
      <FormButton onClick={joinRoom}>Join The Room</FormButton>
      <br />
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
