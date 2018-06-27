import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const POST_COMMENT = 'POST_COMMENT'

/**
 * INITIAL STATE
 */
const defaultComment = {
  userId: 0,
  activityId: 0,
  text: '',
}

/**
 * ACTION CREATORS
 */
export const postComment = comment => ({
  type: POST_COMMENT,
  comment
})


/**
 * THUNK CREATORS
 */
export const postCommentThunk = (comment) => async dispatch => {

  try {
    const { activityId } = comment
    const res = await axios.post(`${ENV_PATH}/api/activity/${activityId}/comment`, comment)
    dispatch(postComment(res.data || defaultComment))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultComment, action) {
  switch (action.type) {
    case POST_COMMENT:
      return action.comment
    default:
      return state
  }
}
