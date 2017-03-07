import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../config/styles';

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
    submit_text: {
        fontFamily: 'centuryschl',
        fontSize: 25,
        textAlign: 'center',
        color: colors.black,
        width: width,
    },
    header_text: {
        fontSize: 20,
        fontFamily: 'centuryschl',
        textAlign: 'left',
        margin: 10,
        color: colors.black,
    },
    add_field_text: {
        fontSize: 20,
        fontFamily: 'centuryschl',
        textAlign: 'left',
        margin: 10,
        color: colors.carbon,
    },
    footer: {
        alignItems: "flex-start",
        paddingLeft: 20,
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
    }
});
