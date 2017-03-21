import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../config/styles';

var {height, width} = Dimensions.get('window')
export default StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'centuryschl',
        textAlign: 'left',
        margin: 5,
        color: colors.carbon,
    },
    container: {
        flex: 1,
        width: window.width,
        marginHorizontal: 5,
        alignSelf: "center",
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


});


