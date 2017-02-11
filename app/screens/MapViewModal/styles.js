import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
    modal: {
        // flex: 1,
        marginTop: window.height / 4,
        height: window.height / 2,
        width: window.width - 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'silver',
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center',
    },
    signIn: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
        color: colors.buttonTextBlue
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // flex: 1,
        // // height: 40,
        // width: window.width - 50,
        // backgroundColor: "#d9dde2",
        // marginHorizontal: 5,
        // alignSelf: "center",
        // flexDirection: 'column',
    },
    map: {
        flex: 1,
        height: window.height,
        width: window.width,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    signIn: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
        color: colors.buttonTextBlue
    },
});
