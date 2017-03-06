import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

var {height, width} = Dimensions.get('window')
//TODO change all of this.
export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.neutral,
  },
  row_container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.neutral,
  },
  title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: colors.black,
  },
  image: {
      width: width,
      height: height / 4,
      justifyContent: 'flex-start',
      resizeMode: 'contain',
  },
    logout_text: {
        fontSize: 20,
        textAlign: 'right',
        margin: 10,
        color: colors.redAccent,
    },
    background: {
        width: width,
        height: height,
    },
    text_row: {
        width: width,
        flexDirection: 'row',
        backgroundColor: colors.ink,
        justifyContent: 'space-between',
    },
    user: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        color: colors.sky,
    }
});
