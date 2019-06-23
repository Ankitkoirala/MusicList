import React from 'react';
import { ScrollView, StyleSheet,Text,View,Linking } from 'react-native';
import * as actions from '../actions'
import _ from 'lodash'
import { Button, ListItem,Card, Icon } from 'react-native-elements';

import {Audio} from 'expo'

export default class FavoriteScreen extends React.Component {
  static navigationOptions = {
    title: 'FavoriteAlbums',
  };
  constructor(){
    super();
    this.state={
      favoriteAlbums:undefined
    }

    this.getFavoriteAlbums();
  }
  async getFavoriteAlbums(){
    const favoriteAlbums=await actions.retrieveData('favoriteAlbums');

    if(favoriteAlbums){
      this.setState({favoriteAlbums});
    }
  }

  async deleteAlbum(albumId){
    const {favoriteAlbums} =this.state;

    delete favoriteAlbums [albumId];
    const success= await actions.storeData('favoriteAlbums',favoriteAlbums);

    if(success){
      this.setState({favoriteAlbums});
    }
  }

  // btnPlayerClicked = async()=>{
  //   await Audio.Sound.createAsync(track.Sound)
  // }

  renderFavoriteTracks(tracks){
    if(tracks){
     return _.map(tracks,(track,id)=>{
        return(
          <ListItem style={styles.list}
          key={id}
          title={track.title}
          leftIcon={{name:'play-arrow'}}
          rightIcon={
            <Icon
            raised
            name='music'
            type='font-awesome'
            color='#f50'
            onPress={()=>Linking.openURL(track.preview)}/>
          }/>
        )
     })
    }
  }

  renderFavoriteAlbums(){
    const {favoriteAlbums}=this.state
    if(favoriteAlbums){
      return _.map(favoriteAlbums,(album,id)=>{
        return(
            <View key={id}>
              <Card
                title={album.title}>
                  <Button
                  title='Delete Album'
                  raised
                  underlayColor='#fff'
                  name='trash'
                  onPress={()=>this.deleteAlbum(album.id)}/>
                     
              </Card>
              {this.renderFavoriteTracks(album.tracks)}
        
            </View>
        )
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
       <ScrollView style={styles.listContainer}>
         {this.renderFavoriteAlbums()}
       </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  listContainer:{
    backgroundColor:'#eaeaea'
  },
  list:{
    marginLeft:15,
    marginRight:15,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  }
});
