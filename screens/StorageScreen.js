import React from 'react';
import { ScrollView, StyleSheet,TouchableHighlight,TouchableOpacity,View } from 'react-native';
import {Button,Divider,Text} from 'react-native-elements'
import * as actions from '../actions'


export default class StorageScreen extends React.Component {
  static navigationOptions = {
    title: 'Storage',
  };

  constructor()
  {
    super();

    this.state={
        value:''
    }
  }
 async storeData(){
    
     const data={
         value:'Some testing data'
     }
   const value=await actions.storeData('somekey',data);
   if(value){
       console.log(value);
   }
  }
 async retrieveData(){
     this.setState({
         value:''
     })
     const data=await actions.retrieveData('favoriteAlbums');
     console.log(data)

    if(data){
        debugger;
        console.log(data)
        // this.setState({
        //     value:data.value
        // })
    }

  }
  async removeData(){
    const success=await actions.clearStorage();

    if(success){
      this.setState({value:''})
    }
  }

  render() {
      const {value}=this.state;
    return (
      <ScrollView style={styles.container}>
          <Text> I am a storage</Text>
          <Button title='store ' onPress={()=>{this.storeData()}}/>
          <Button title='retrive ' onPress={()=>{this.retrieveData()}}/>
          <Button title='remove ' onPress={()=>{this.removeData()}}/>
          <Text>{value}</Text>

          
        <Divider  style={{backgroundColor:'#f50',marginTop:5, borderBottomWidth:2 }}/>
        <Text h3>TOUCHABLES</Text>
        <TouchableHighlight onPress={()=>{}} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={()=>{}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
      
     
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
