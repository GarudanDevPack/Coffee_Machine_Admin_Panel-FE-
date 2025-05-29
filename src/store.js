import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

// const store = createStore(
//   combinedReducer,
//   applyMiddleware(thunk),
// )

// export default store

// import { legacy_createStore as createStore } from 'redux'

// import { applyMiddleware } from 'redux'
// import { thunk } from 'redux-thunk'
// import rootReducer from './reducers/index'

// // const store = createStore(rootReducer, applyMiddleware(thunk));

// // export default store;

// const initialState = {
//   sidebarShow: true,
//   theme: 'light',
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState, rootReducer, applyMiddleware(thunk))
// export default store

// import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
// import { thunk } from 'redux-thunk'
// import rootReducer from './reducers/index'

// const middleware = [thunk]

// const initialState = {
//   sidebarShow: true,
//   theme: 'light',
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// // const store = createStore(changeState)
// const store = createStore(
//   rootReducer,
//   initialState,
//   changeState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ),
// )
// export default store
