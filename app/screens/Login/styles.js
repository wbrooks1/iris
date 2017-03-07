import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../config/styles';

var {height, width} = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.neutral,
    },
    row_container: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontFamily: 'centuryschl',
        textAlign: 'center',
        margin: 10,
        color: colors.black,
    },
    image: {
        width: width,
        height: height / 3,
        resizeMode: 'contain',
        padding: 10,
        borderRadius: 10,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});
