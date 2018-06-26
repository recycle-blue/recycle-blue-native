import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import activity from './activity'
import location from './location'
import product from './product'
import userActivities from './user-activities'
import leaders from './leaders'
import friends from './friends'
import selectedFriend from './selected-friend'

const reducer = combineReducers({ user, activity, location, product, userActivities, leaders, friends, selectedFriend })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, /*createLogger({ collapsed: true })*/)
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './activity'
export * from './product'
export * from './user-activities'
export * from './category'
export * from './leaders'
export * from './friends'
export * from './selected-friend'
