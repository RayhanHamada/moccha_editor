import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { MyTypes } from '../../../types/app-store';

import ClearConsoleButton from '../toolbox/ClearConsoleButton';

import './index.scss';

const mapStateToProps = ({ edin }: MyTypes.RootState) => ({
  consoleOutput: edin.consoleOutput,
});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
  bindActionCreators({}, dispatch);

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const TerminalWrapper = (props: Props) => {
  return (
    <div className="" id="terminal-wrapper">
      <ClearConsoleButton />
      <textarea
        name="console"
        id="console"
        value={props.consoleOutput}
        readOnly
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TerminalWrapper);
