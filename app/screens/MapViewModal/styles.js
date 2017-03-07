import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

var {height, width} = Dimensions.get('window')
export default StyleSheet.create({

    submit: {
        fontFamily: 'centuryschl',
        fontSize: 25,
        textAlign: 'center',
        color: colors.black,
        width: width,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        height: height,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    submit_button: {
        backgroundColor: colors.sky,
        width: 250,
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: height - 100,
    },
});
