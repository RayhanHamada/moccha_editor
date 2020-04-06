import React from 'react';
import { MyTypes } from '../../../store/app-custom-types';
import { connect } from 'react-redux';

const mapStateToProps = ({ playerManagerReducer }: MyTypes.RootState) => ({
	players: playerManagerReducer.players,
});

type PlayerListProps = ReturnType<typeof mapStateToProps>;

const PlayerList = (props: PlayerListProps) => {
	return (
		<div id="player-list" className="ml-10">
			<p className="text-2xl">
				<b>Joined Friends:</b>
			</p>
			{props.players.map((playa, idx) => (
				<p key={idx}>
					{idx + 1}. {playa.name}
				</p>
			))}
		</div>
	);
};

export default connect(mapStateToProps)(PlayerList);
