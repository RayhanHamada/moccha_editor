import React from 'react';
import styled from 'styled-components';

import { MyTypes } from '../../../types/app-store';

import { changeLanguage } from '../../../features/editor-internal/actions';
import { supportedLanguages } from '../../../globals';
import store from '../../../store';

import { debugLog } from '../../../utils';

const Option = styled.option`
  background: #1e1e1e;
  color: #e41749;
`;

const SelectLanguage = styled.select`
  border: 1px solid black;
  height: 40px;
  background: transparent;
  border-radius: 7%;
`;

/**
 * set SelectLanguage default props
 */
SelectLanguage.defaultProps = {
  children: (
    <>
      {supportedLanguages.map(lang => (
        <Option value={lang.id} key={lang.id}>
          {lang.name} {`(${lang.version})`}
        </Option>
      ))}
    </>
  ),

  onChange: function(ev) {
    /**
     * get watchLangChange
     */
    const { watchLangChangeFromSocket } = store.getState().edin;

    /**
     * when we emit change-language from the socket, it would received by other client's
     * SelectLanguage's onChange listener and will be sent back to us, which will trigger
     * emit change-language again, and so on.
     * to prevent that, we should determine when to watch for language change
     */
    if (!watchLangChangeFromSocket) return;

    /**
     * get option's value as language id
     */
    const langId = parseInt(ev.target.options[ev.target.selectedIndex].value);

    /**
     * should dispatch changeLanguage here
     */
    store.dispatch<MyTypes.RootAction>(changeLanguage(langId));

    debugLog('change-language emitted');
  },
};

export default SelectLanguage;
