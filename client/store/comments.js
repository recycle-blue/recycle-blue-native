import axios from 'axios'
import { ENV_PATH } from '../secrets'
import { ActionSheet } from 'native-base';

/**
 * ACTION TYPES
 */
const POST_COMMENT = 'POST_COMMENT'
const GET_COMMENTS = 'GET_COMMENTS'
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

export const getComments = comments => ({
  type: GET_COMMENTS,
  comments
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

export const getCommentsThunk = (activityId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/activity/${activityId}/comments`)
    dispatch(getComments(res.data.comments || defaultComment))
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
    case GET_COMMENTS:
      return action.comments
    default:
      return state
  }
}
