import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import { MyTypes } from '../../types/app-store';

import * as edinActions from '../../features/editor-internal/actions';
import * as authActions from '../../features/auth/actions';
import { printDevLog } from '../../utils';
import { history } from '../../store';
import routes from '../routes-names';

import MonacoWrapper from '../../components/editor-page/monaco-wrapper';
import TerminalWrapper from '../../components/editor-page/terminal';
import PlayerList from '../../components/editor-page/player-list';
import ToolBox from '../../components/editor-page/toolbox';

import './index.scss';

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
  bindActionCreators(
    {
      deauthenticate: authActions.deauthenticate,
      resetEdin: edinActions.resetEdin,
      setCopied: authActions.setCopied,
    },
    dispatch
  );

const mapStateToProps = ({ auth }: MyTypes.RootState) => ({
  authenticated: auth.authenticated,
  copied: auth.copied,
  roomKey: auth.roomKey,
});
type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const EditorPage = (props: Props) => {
  /**
   * when user go back to login page, leave page, or refresh page, then
   * do deauth, reset editor internal state, and replace route with routes.home
   */
  window.onbeforeunload = function() {
    props.deauthenticate();
    printDevLog('deauthenticated !');
    props.resetEdin();
    history.replace(routes.home);
  };

  /**
   * do the same as above
   */
  window.onpopstate = function() {
    props.deauthenticate();
    printDevLog('deauthenticated !');
    props.resetEdin();
    history.replace(routes.home);
  };

  /**
   * triggered when props.authenticated is false
   * example: when RM is leave the room (player-leave socket event) triggered
   */
  useEffect(() => {
    if (!props.authenticated) {
      props.resetEdin();
      history.replace(routes.home);
      printDevLog('should be back to login');
    }
  }, [props.authenticated]);

  const copyText = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();
    navigator.clipboard.writeText(props.roomKey);
    ev.currentTarget.blur();
    props.setCopied(true);
    setTimeout(() => {
      props.setCopied(false);
    }, 1000);
  };

  return (
    <div id="wrapper-editor" className="w-screen h-screen flex flex-row">
      <div className="code-panel flex-col">
        <div className="flex-row w-100">
          <span className="text-2xl opacity-75 pl-10 mb-1 mr-20">
            Moccha Text Editor
          </span>
          <span className="opacity-75 px-2">Your Room Key:</span>
          <button
            className="bg-transparent border border-black"
            onClick={copyText}
          >
            <i className="fa fa-copy"></i>
            <span className="opacity-75 px-2">{props.roomKey}</span>
          </button>
          {props.copied ? (
            <span className="opacity-75 px-2">Copied !</span>
          ) : (
            <small className="opacity-75 px-2">Click to copy</small>
          )}
        </div>
        <hr style={{ borderColor: 'black' }} />
        <ToolBox />
        <MonacoWrapper />
        <PlayerList />
      </div>
      <div className="console-panel border border-black">
        <TerminalWrapper />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
