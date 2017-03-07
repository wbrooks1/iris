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
    row_container: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: colors.black,
        fontFamily: 'centuryschl',
    },
    image: {
        width: width,
        height: 50,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
    },
    save_text: {
        fontFamily: 'centuryschl',
        fontSize: 25,
        textAlign: 'center',
        color: colors.black,
        width: width,
    },
    list_container: {
        borderRadius: 10,
    },
    submit_button: {
        backgroundColor: colors.sky,
        width: 250,
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back_arrow: {
        width: 50,
        height: 50,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
    },
});
