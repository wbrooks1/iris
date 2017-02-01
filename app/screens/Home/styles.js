import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

var {height, width} = Dimensions.get('window')
//TODO change all of this.
export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.background,
  },
  row_container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: colors.headerText,
  },
  image: {
      width: width,
      height: height / 4,
      justifyContent: 'flex-start',
      resizeMode: 'contain',
  },
});
