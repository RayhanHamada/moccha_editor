import React from 'react';

import Typer from '../../components/typer/Typer';

import JoinForm from '../../components/join_form/JoinForm';

import 'tailwindcss/dist/tailwind.css';
import './LoginPage.scss';
import BannerDesc from '../../components/BannerDesc';

const LoginPage = () => {
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
				<div className="flex-row mt-auto self-center pb-1">
					<i
						className="fa fa-github fa-3x ml-3"
						onClick={() => window.open('https://github.com/RayhanHamada')}
					></i>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
