import React, { useState,useContext,useEffect } from 'react';
import { View,FlatList,TouchableOpacity } from "react-native"
import styled from 'styled-components';
import { FilterComponent } from '../components/buyFilter.components';
import { ExchangeContext } from '../../../services/exchnage/exchange.context';
import { ActivityIndicator, Colors } from "react-native-paper";
import { FadeInView } from '../../common/components/animations/fade.animation';
import { ItemInfoCard } from '../components/itemInfoCard.components';

const Wrapper = styled(View)`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const Head=styled.View`
    flex-direction:row
    background-color:${props=>props.theme.colors.ui.basic}
    padding:${props=>props.theme.space[3]}
`;

const Empty=styled.Text`
    color: ${props=>props.theme.text}
    text-align:center
    font-size:${props=>props.theme.fontSizes.h5}
    padding-top:${props=>props.theme.space[6]}
    font-family:${props=>props.theme.fonts.body}
`;

export const BuyScreen = ({ navigation }) => {

    const [category,setCategory]=useState("")
    const [sort,setSort]=useState("")

    const { isLoading,exchange,Search,Sort }=useContext(ExchangeContext)

    useEffect(()=>{
        Search("Select All")
    },[])

    const renderItem = (item) => {
        return(
            <TouchableOpacity onPress={()=>navigation.navigate("ItemDetails",{details:item.item,get:0})}>
                <FadeInView>
                    <ItemInfoCard item={item} />
                </FadeInView>
            </TouchableOpacity>
        )
    }

    return (
        <Wrapper>
            {isLoading?
            (
                <View style={{ marginTop: 50 }}>
                    <ActivityIndicator color={Colors.red400} size={50} />
                </View>
            ):
            (
                <>
                    <Head>
                        <FilterComponent 
                        sort={sort} 
                        category={category} 
                        setCategory={setCategory} 
                        setSort={setSort} 
                        Search={Search} 
                        Sort={Sort} />    
                    </Head>
                    {exchange.length?
                    (
                        <FlatList 
                            data={exchange}
                            renderItem={renderItem}
                            keyExtractor={(item)=>item.imgName}
                        />
                    ):(
                        <Empty>No items found!!</Empty>
                    )}
                </>
            )
            }
        </Wrapper>
    )
}