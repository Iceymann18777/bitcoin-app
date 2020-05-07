import { createElement as e } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import getPastedTokenData from './getPastedTokenData';
import AsyncStorage from '@react-native-community/async-storage';
import { getState, setState } from '../../../../reduxX';
import { fonts } from '../../../../constants';


const getStyles = () => {

    const mainStyleObject = getState( 'mainStyleObject' );
    
    return StyleSheet.create({
        outerContainer: {
            // backgroundColor: 'red',
            width: '100%',
            height: '100%',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
        },

        button: {

            width: '85%',
            flex: 0.25,
            backgroundColor: mainStyleObject.backgroundColor,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
        },

        buttonText: {

            color: mainStyleObject.color,
            fontFamily: fonts.merriweather.regular
        }
    });
};


export default () => {

    const styles = getStyles();

    return e(
        View,
        {
            style: styles.outerContainer,
        },
        e(
            TouchableOpacity,
            {
                // title: 'Create Token',
                style: styles.button,
                onPress: async () => {}
            },
            e(
                Text,
                {
                    style: styles.buttonText,
                },
                'Create New Token'
            )
        ),
        e(
            TouchableOpacity,
            {
                // title: 'Paste Token',
                style: styles.button,
                // color: '#f194ff',
                onPress: async () => {

                    try {
                        
                        const {

                            token,
                            tokenInfo,
                            
                        } = await getPastedTokenData();

                        setState( [ 'auth', 'tokenInfo' ], tokenInfo );
                        await AsyncStorage.setItem( 'token', token );
                    }
                    catch( err ) {

                        console.log( 'error in getPastedToken:', err );

                        setState( [ 'auth', 'tokenInfo' ], null );
                        await AsyncStorage.removeItem( 'token' );
                    }
                }
            },
            e(
                Text,
                {
                    style: styles.buttonText,
                },
                'Paste Existing Token'
            )
        )
    );
};
