/**
 * namespace for all app-related types
 */

declare namespace AGT {
  /**
   * supported languages by monaco editor (not all)
   * for full set of supported languages,
   * see https://github.com/microsoft/monaco-editor-webpack-plugin/blob/master/src/languages.ts
   */
  type SupportedLanguageName =
    | 'typescript'
    | 'javascript'
    | 'cpp'
    | 'c'
    | 'python'
    | 'ruby';

  /**
   * this language interface used for specify language the editor use
   * and for submission API call
   */

  interface Language {
    /**
     * this property for specifying language the editor deals with,
     * see https://github.com/microsoft/monaco-editor-webpack-plugin/blob/master/src/languages.ts
     */
    nameInEditor: SupportedLanguageName;

    /**
     * properties from https://api.judge0.com/languages/all (GET) API call
     */

    // name for select component UI
    name: string;

    // version
    version: string;

    // specify id of a language used for call submission API
    id: number;
  }

  /**
   * for monaco editor's EditorContentManager
   */
  type TextChange = Partial<{
    idx: number;
    len: number;
    text: string;
  }>;

  /**
   * for components props types that use react-redux's connect HOC
   * (we use it very much)
   */
  type Props<
    _MapStateToProps extends (rootState: any) => Record<string, any>,
    _MapDispatchToProps extends (dispatch: any) => any
  > = ReturnType<_MapStateToProps> & ReturnType<_MapDispatchToProps>;
}
