import { StyleSheet, Dimensions } from 'react-native';
import { colors, style } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    modal: {
        // flex: 1,
        marginTop: window.height / 4,
        height: window.height / 2,
        width: window.width - style.modalWidthDifference,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'silver',
        padding: style.padding,
        borderRadius: style.borderRadius,
        alignSelf: 'center',
    },
    signIn: {
        fontSize: style.titleFontSize,
        textAlign: 'center',
        margin: style.titleMargin,
        color: colors.ink
    },
});
