import { connect } from 'react-redux';
import React from 'react';

import { MyTypes } from '../../types/app-state';

import BannerDesc from '../../components/misc/BannerDesc';
import Spinner from '../../components/misc/Spinner';
import JoinForm from '../../components/join-form/';
import Typer from '../../components/misc/Typer';

import './index.scss';
import { bindActionCreators } from 'redux';

const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
  isLoading: authReducer.isLoading,
  loadingMsg: authReducer.loadingMsg,
});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
  bindActionCreators({}, dispatch);

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const LoginPage = (props: Props) => {
  return (
    <div className="flex flex-row w-screen h-screen" id="wrapper-login">
      <div className="banner bg-gray-800 flex flex-col">
        <span className="banner-title text-6xl font-bold ml-32 mt-10">
          Moccha Text Editor
        </span>
        <BannerDesc />
        <br />
        <Typer />
      </div>
      <div className="join-form-wrapper flex flex-col pt-4">
        <span
          id="join-room-title"
          className="self-center text-gray-800 text-3xl"
        >
          Fill The Guest Book First !
        </span>
        <JoinForm />
        {props.isLoading ? <Spinner /> : <p></p>}
        <span className="loading-msg self-center">{props.loadingMsg}</span>
        <div className="flex-row mt-auto self-center pb-1">
          <i
            className="fa fa-github fa-3x ml-3"
            id="my-github-icon"
            onClick={() =>
              window.open('https://github.com/RayhanHamada/moccha_editor')
            }
          ></i>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(LoginPage);
