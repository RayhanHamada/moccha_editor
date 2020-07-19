/**
 * currently supported languages
 */
export const supportedLanguages: AGT.Language[] = [
  {
    nameInEditor: 'typescript',
    name: 'Typescript',
    id: 74,
    version: '3.7.4',
  },
  {
    nameInEditor: 'javascript',
    name: 'Javascript',
    id: 63,
    version: 'Node.js 12.14.0',
  },
  {
    nameInEditor: 'cpp',
    name: 'C++',
    id: 54,
    version: 'GCC 9.2.0',
  },
  {
    nameInEditor: 'c',
    name: 'C',
    id: 50,
    version: 'GCC 9.2.0',
  },
  {
    nameInEditor: 'python',
    name: 'Python',
    id: 71,
    version: '3.8.1',
  },
  {
    nameInEditor: 'python',
    name: 'Python',
    id: 70,
    version: '2.7.17',
  },
  {
    nameInEditor: 'ruby',
    name: 'Ruby',
    id: 72,
    version: '2.7.0',
  },
];

/**
 * determine if this app run in development mode
 */
export const isDev = process.env.NODE_ENV === 'development';

/**
 * backend server url
 */
export const serverUrl = process.env.BASE_SERVER_URL as string;
