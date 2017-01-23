import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';

const SingleLineInput = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Title
      </Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
};

SingleLineInput.propTypes = {
  borderTop: React.PropTypes.bool,
};

export default SingleLineInput;
