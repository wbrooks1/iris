
import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
  input: {
    height: 40,
    width: window.width - 25,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: colors.inputBackground,
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf:"center"
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 5,
  },
  container: {
    height: 20,
    backgroundColor: "#d9dde2",
    flex: 1,
    marginHorizontal: 10,
    alignSelf:"center",
  },
  inputWrapper: {
    backgroundColor: colors.inputBackground,
    width: window.width,
  },
});
