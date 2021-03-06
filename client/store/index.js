import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import activity from './activity'
import location from './location'
import product from './product'
import userActivities from './user-activities'
import userSearch from './user-search'
import leaders from './leaders'
import friends from './friends'
import selectedFriend from './selected-friend'
import ad from './ad'
import category from './category'
import comments from './comments'
import feed from './feed'
import categories from './categories'

const reducer = combineReducers({
  user,
  activity,
  location,
  product,
  userActivities,
  leaders,
  friends,
  selectedFriend,
  userSearch,
  ad,
  category,
  comments,
  feed,
  categories
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './activity'
export * from './product'
export * from './user-activities'
export * from './user-search'
export * from './category'
export * from './leaders'
export * from './friends'
export * from './selected-friend'
export * from './ad'
export * from './comments'
export * from './feed'
export * from './location'
export * from './categories'
