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
        // flex: 1,
        marginTop: window.height / 4,
        height: window.height / 2,
        width: window.width - 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkBackground,
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center',
    },
    text_box: {
      backgroundColor: colors.midBackground,
      borderRadius: 10,

    },
    add_button: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
        color: colors.buttonTextBlue,
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
        textAlign: 'center',
        margin: 5,
    },
});
