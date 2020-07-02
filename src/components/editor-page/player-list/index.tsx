import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MyTypes } from '../../../types/app-store';

const mapStateToProps = ({ pm }: MyTypes.RootState) => ({
  players: pm.players,
});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
  bindActionCreators({}, dispatch);

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const PlayerList = (props: Props) => {
  return (
    <div id="player-list" className="ml-10">
      <p className="text-2xl">
        <b>Joined Friends:</b>
      </p>
      {props.players.map((playa, idx) => (
        <p key={idx}>
          {idx + 1}. {playa.username}
        </p>
      ))}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);
