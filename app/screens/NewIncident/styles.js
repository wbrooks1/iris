import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../config/styles';

var {height, width} = Dimensions.get('window')
//TODO change all of this.
export default StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
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
        textAlign: 'center',
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
        alignSelf: 'center',
    },
    back_arrow: {
        width: 50,
        height: 50,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
    },
    option_list: {
        width: width - 60,
        backgroundColor: colors.white,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: colors.carbon,
    },
    option_list_text: {
        fontSize: 16,
        textAlign: 'left',
        margin: 10,
        color: colors.carbon,
        fontFamily: 'centuryschl',
    },
    select: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        width: width - 60,
        borderColor: colors.white,
        alignSelf: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: 'centuryschl',
        textAlign: 'left',
        margin: 5,
        color: colors.carbon,
        marginLeft: 30,
    },

});
