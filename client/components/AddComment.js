import React from 'react'
import { StyleSheet, Text, View, Button, Image, KeyboardAvoidingView } from 'react-native'
import { Form, Textarea } from 'native-base'
import { connect } from 'react-redux'
import { postCommentThunk, getCommentsThunk } from '../store'

class AddComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.userId,
      activityId: this.props.activityId,
      text: ''
    }

  }
  static navigationOptions = {
    drawerLabel: () => null
  }
  handleSubmit = async () => {
    await this.props.addComment(this.state)
    this.setState({ text: '' })
    await this.props.getComments(this.state.activityId)
    this.props.navigation.navigate('activity')

  }
  render() {
    return (
      <View>
        <Text>
          Add A Comment
        </Text>
        <Form>
          <Textarea
            rowSpan={5}
            bordered placeholder="Add Comments"
            onChangeText={(comment) => this.setState({ text: comment })}
            value={this.state.text} />
        </Form>
        <Button title='submit' onPress={this.handleSubmit} />
      </View>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    userId: store.user.id,
    activityId: store.activity.id
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (comment) => dispatch(postCommentThunk(comment)),
  getComments: (activityId) => dispatch(getCommentsThunk(activityId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)