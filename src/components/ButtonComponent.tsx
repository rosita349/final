import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../theme/appTheme';


//interface - props
interface Props {
    textButton: string;
    onPress: () => void;     //prop función
}

export const ButtonComponent = ({ textButton, onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}>
            <Text style={styles.buttonText}>{textButton}</Text>
        </TouchableOpacity>
    )
}