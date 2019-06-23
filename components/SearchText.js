import React from 'react';
import { Text,View,StyleSheet,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { FormLabel, FormInput, Button, Input } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

export default class SearchText extends React.Component {
    constructor(){
        super();
        this.state={
            value:''
        }
    }

    componentDidMount(){
        this.input.focus();
    }
    onChange(value){
        this.setState({value})
    }
    onSubmitSearch(){
        const{submitSearch} =this.props

        submitSearch(this.state.value)
        console.log(this.state.value)
    }
  render() {
    return (
        <View style={{flex:1,}}>
            <View style={{height:60,backgroundColor:'#000',
            justifyContent:'space-between',flexDirection:'row',alignItems:'center',width:'100%'}}>
            <Animatable.View animation='fadeInDown' duration={1050} style={{height:50,backgroundColor:"white",flexDirection:'row',padding:5,alignItems:'center'}}>
            <Icon name ='ios-search' style={{fontSize:24}}/>
            <TextInput placeholder ="Album" style={{ marginLeft:5, fontSize:24,width:'70%',alignItems:'center',paddingTop:5,borderRadius:2,borderColor:'#000'}} 
            ref={input=>this.input = input} onChangeText={(event)=>{
                debugger;
            this.onChange(event) }}/> 
            </Animatable.View>
            <Button title="Search" 
              color="#841584"
              backgroundColor='#3fffff'

            style={{width:'100%', paddingRight:0, alignItems:'center'}} 
            onPress={()=>this.onSubmitSearch()}/>
            </View>
            
            </View>
    )
  }
}
const styles = StyleSheet.create({
    center:{
        alignItems: 'center'
    }
})
