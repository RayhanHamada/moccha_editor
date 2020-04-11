# Moccha-Editor (Front-end)

A live-collaboration code editor that i casually built using  React, Redux and other specific libraries and technologies 

## Features

 1. Live-Collaboration code editing
 2. Supports 7 Languages (C++, C, Javascript, Python2, Python3, Ruby, Typescript)
 3. Voice Chat (planned)
 4. Cursor for other player (planned)
 5. Changeable Dark and Light Theme (planned)

## Tech Used

 1. React with Redux
 2. Connected-React-Router (connecting router with redux)
 3. axios (for doing http requests)
 4. redux-observable (for managing asynchronous state event)
 5. typesafe-action for making strong-typed action and reducer
 6. Typescript, all source code is made in typescript
 7. Monaco Editor as the base editor
 8. convergencelabs's monaco-collab-ext, used for managing editor content's changes (and make it easy for me to quickly prototyping change event :) )
 9. socket-io, for sending code changes and editor state to other connected client.
 10. Webpack and webpack-dev-server to manage project build and development server
 11. Styled-Component, Tailwindcss

## Demo
https://mocchaeditor.netlify.com/