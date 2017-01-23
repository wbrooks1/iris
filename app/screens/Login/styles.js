import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#e1e5ed',
  },
  row_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e1e5ed',
  },
  title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
  image: {
      width: 200,
      height: 200,
      marginTop: 5,
      justifyContent: 'flex-start',
  },
});
