import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../../../../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../../../commons/constant';
import { ModalProduct } from './ModalProduct';
import { Product } from './HomeScreen';

//interface - props
interface Props {
    product: Product;
    changeStockProduct: (idProduct: number, quantity: number) => void; //función para
    //actualizar stock
}

export const CardProduct = ({ product, changeStockProduct }: Props) => {
    //hook useState: permitir visualizar o no el modal
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <View>
            <View style={styles.contentCard}>
                <Image source={{
                    uri: product.pathImage
                }}
                    style={styles.imageCard} />
                <View>
                    <Text style={styles.titleCard}>{product.name}</Text>
                    <Text>Precio: ${product.price.toFixed(2)}</Text>
                </View>
                <View style={styles.iconCard}>
                    <Icon
                        name='add-shopping-cart'
                        size={33}
                        color={PRIMARY_COLOR}
                        onPress={() => setShowModal(!showModal)} />
                </View>
            </View>
            <ModalProduct
                isVisible={showModal}
                setShowModal={() => setShowModal(!showModal)}
                product={product}
                changeStockProduct={changeStockProduct} />
        </View>
    )
}