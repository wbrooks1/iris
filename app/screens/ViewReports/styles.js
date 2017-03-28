import { StyleSheet, Dimensions, Platform} from 'react-native';
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
        ...Platform.select({
            ios: {
                fontFamily: 'CenturySchL-Roma'
            },
            android: {
                ...Platform.select({
        ios: {
            fontFamily: 'CenturySchL-Roma'
        },
        android: {
            fontFamily: 'centuryschl',

        },
    }),

            },
        }),
    },
    back_arrow: {
        width: style.headerImageSize,
        height: style.headerImageSize,
        justifyContent: 'flex-start',
    }
});
