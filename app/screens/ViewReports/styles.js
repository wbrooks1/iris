import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

var {height, width} = Dimensions.get('window')
//TODO change all of this.
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.neutral,
    },
    image: {
        width: width,
        height: 50,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: colors.black,
    },
    back_arrow: {
        width: 50,
        height: 50,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
    }
});
