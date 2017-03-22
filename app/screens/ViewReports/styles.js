import { StyleSheet, Dimensions } from 'react-native';
import { colors, style } from '../../config/styles';

var {height, width} = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.neutral,
    },
    image: {
        width: width,
        height: style.headerImageSize,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    title: {
        fontSize: style.titleFontSize,
        textAlign: 'center',
        margin: style.margin,
        color: colors.black,
    },
    back_arrow: {
        width: style.headerImageSize,
        height: style.headerImageSize,
        justifyContent: 'flex-start',
    }
});
