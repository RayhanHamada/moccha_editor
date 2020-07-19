import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { MyTypes } from '../../../types/app-store';

import SelectLanguage from './SelectLanguage';
import RunButton from './RunButton';

import './index.scss';

const mapStateToProps = ({ edin }: MyTypes.RootState) => ({
  langId: edin.language.id,
});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
  bindActionCreators({}, dispatch);

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const ToolBox = (props: Props) => {
  return (
    <div id="tool-box" className="flex flex-row items-center">
      <RunButton />
      <SelectLanguage value={props.langId} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox);
