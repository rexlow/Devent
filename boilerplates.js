const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

// Button Component
this.buttonStates = {
  submitEvent: {
    text: 'SUBMIT EVENT',
    onPress: () => {
      this.setState({ buttonState: 'loading' });
      this.updateProfile();
    },
  },
  loading: {
    spinner: true,
    text: 'SUBMITTING YOUR EVENT'
  }
};

<ButtonComponent
  style={buttonStyle}
  type='primary'
  shape='rectangle'
  buttonState={this.state.buttonState}
  states={this.buttonStates}
/>
