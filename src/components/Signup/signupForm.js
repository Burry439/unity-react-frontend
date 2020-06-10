export default {
    config: {
      messages: {
        success: 'Signed Up',
        error:
          'Invalid username or password'
      },
      buttonText: 'Login',
      spinner: true
    },
    fields: [
      {
        label: 'username',
        placeholder: 'Enter your username',
        required: true
      },

      {
        label: 'password',
        type: 'password',
        placeholder: 'Please enter your password',
        required: true
      }
    ]
  }