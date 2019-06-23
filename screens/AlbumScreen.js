import React from 'react';
import { ScrollView, StyleSheet,Text,View,Alert,ActivityIndicator } from 'react-native';
import { CardList } from '../components/CardList';
import * as actions from '../actions'
import  SearchText  from '../components/SearchText';
import { Icon } from 'react-native-elements';

export default class AlbumScreen extends React.Component {
  state={
    serachBarFocused:true
  }
  static navigationOptions = {
    title: 'Album',
  };
  constructor(){
      super();
      this.state = {
         albums:[],
         isFetching:false,
         artist:''
      }
      this.searchTracks=this.searchTracks.bind(this);
      this.renderBottomNavigation=this.renderBottomNavigation.bind(this);
  }
  searchTracks(artist){
    this.setState({isFetching:true,artist});

    actions.searchTracks(artist)
    .then(albums=>this.setState({albums,isFetching:false}) )
    .catch(err => this.setState({albums:[],isFetching:false}))
  }
 async saveAlbumToFavorite(album){
  const favouriteAlbums=await actions.retrieveData('favoriteAlbums') || {};
  if(favouriteAlbums[album.id]){
    Alert.alert(
      'Album is added ',
      `Album is already in favoraite`,
      [
        {text: 'Continue', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    return false;
  }
  favouriteAlbums[album.id]=album;
     const success=   await actions.storeData('favoriteAlbums',favouriteAlbums);
     if(success){
      Alert.alert(
        'Album',
        `Album ${album.title} from ${this.state.artist} was added to favoraite`,
        [
          {text: 'Continue', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
     }
  }

  renderBottomNavigation(album){
    const{artist}=this.state;
    return(
      <View style={styles.albumsMenu} >
        <Icon onPress={()=>{}}
              raised
              name='play'
              type='font-awesome'
              color='#000'
              size={20}/>
              <Icon onPress={()=>this.saveAlbumToFavorite(album)}
              raised
              name='heart'
              type='font-awesome'
              color='#000'
              size={20}/>
              <Icon onPress={()=>{this.props.navigation.navigate('AlbumDetail',{album,artist})}}
              raised
              name='info-circle'
              type='font-awesome'
              color='#000'
              size={20}/>
      </View>
    )

  }

  renderAlbumView(){
    const {albums , isFetching}= this.state;
      return(
        <ScrollView style={styles.container} >
        <SearchText submitSearch ={this.searchTracks}></SearchText>

          { albums.length > 0 && !isFetching && 
          <CardList 
                data={albums} 
                  imageKey={'cover_big'}
                  titleKey={'title'}
                  buttonText="See the detail"
                  bottomView={this.renderBottomNavigation}>
            </CardList>
            }
            {albums.length > 0 && isFetching && 
           <ActivityIndicator
           size='large'></ActivityIndicator>
            }
        </ScrollView>
       )
  }
 
  render() {
    return this.renderAlbumView();
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  text:{
      color:'#f44242',
      fontSize:30,
      fontStyle:'italic'
  },
  albumsMenu:{
    flexDirection:'row',
    justifyContent:'space-between',
  }
});
