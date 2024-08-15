import React from 'react';
import { TextInput, View } from 'react-native';

import { PRIMARY_COLOR } from '../commons/constant';
import { styles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';


//interface - props
interface Props {
    placeholder: string;
    handleSetValues: (name: string, value: string) => void; //prop función
    name: string;
    isPassword?: boolean;    //prop opcional 
    hasIcon?: boolean;
    setHiddenPaswword?: () => void;    //prop función
}

export const InputComponent = ({ placeholder, handleSetValues, name, isPassword = false, hasIcon = false, setHiddenPaswword }: Props) => {
    return (
        <View>
            {
                (hasIcon)
                    ? <Icon
                        name='visibility'
                        size={25}
                        color={PRIMARY_COLOR}
                        onPress={setHiddenPaswword}
                        style={styles.iconPassword} />
                    : null
            }
            <TextInput
                placeholder={placeholder}
                keyboardType='default'
                onChangeText={(value) => handleSetValues(name, value)}
                secureTextEntry={isPassword}
                style={styles.inputText}
            />
        </View>
    )
}