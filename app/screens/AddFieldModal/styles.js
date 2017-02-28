import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        marginTop: window.height / 4,
        height: 275,
        width: window.width - 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.carbon,
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center',
    },
    text_box: {
      backgroundColor: colors.neutral,
      borderRadius: 10,

    },
    picker: {
        width: window.width - 60,
    },
    input: {
        height: 40,
        width: window.width - 60,
        fontSize: 20,
        borderRadius: 5,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignSelf: "center"
    },
    title: {
        fontSize: 20,
        fontFamily: 'centuryschl',
        margin: 15,
        color: colors.black,
    },
    label: {
        fontSize: 20,
        fontFamily: 'centuryschl',
        textAlign: 'left',
        margin: 5,
    },
    submit_button: {
        backgroundColor: colors.sky,
        width: 200,
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
