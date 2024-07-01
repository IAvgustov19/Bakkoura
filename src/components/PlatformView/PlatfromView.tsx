import React from 'react'
import { Platform } from 'react-native'
import RN from '../RN'

export const PlatfromView = ({children}) => {
    return (
        <>
            {Platform.OS === 'ios' ?
                <RN.SafeAreaView style={{flex: 1}}>
                    {children}
                </RN.SafeAreaView> :
                <RN.View style={{flex: 1}}>{children}</RN.View>
            }
        </>
    ) 
}
