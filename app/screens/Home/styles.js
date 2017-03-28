import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors, style} from '../../config/styles';

var {height, width} = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral,
    },
    row_container: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: height / 4,
        resizeMode: 'contain',
    },
    logout_text: {
        fontSize: style.titleFontSize,
        textAlign: 'right',
        margin: style.margin,
        color: colors.redAccent,
        fontFamily: 'centuryschl',
    },
    background: {
        width: width,
        height: height,
    },
    text_row: {
        width: width,
        flexDirection: 'row',
        backgroundColor: colors.sky,
        justifyContent: 'space-between',
    },
    user: {
        fontSize: style.titleFontSize,
        textAlign: 'left',
        margin: style.margin,
        color: colors.carbon,
        ...Platform.select({
        ios: {
            fontFamily: 'CenturySchL-Roma'
        },
        android: {
            fontFamily: 'centuryschl',

        },
    }),
    }
});
