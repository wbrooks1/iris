
import { StyleSheet, Dimensions } from 'react-native';
import { colors, style } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
    input: {
        height: style.textInputHeightLarge,
        width: window.width - style.inputWidthDifference,
        fontSize: style.inputFontSize,
        borderRadius: style.inputBorderRadius,
        backgroundColor: colors.white,
        marginHorizontal: style.inputMarginHorizontal,
        paddingVertical: style.inputPaddingVertical,
        paddingHorizontal: style.inputPaddingHorizontal,
        alignSelf:"center",

    },
    title: {
        fontSize: style.titleFontSize,
        fontFamily: 'centuryschl',
        textAlign: 'left',
        margin: style.titleMargin,
        color: colors.carbon,
    },
    container: {
        flex: 1,
        width: window.width - style.containerWidthDifference,
        backgroundColor: colors.neutral,
        marginHorizontal: style.containerMarginHorizontal,
        alignSelf: "center",
        flexDirection: 'column',
    },
});
