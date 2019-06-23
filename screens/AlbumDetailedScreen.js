import React from 'react';
import { ScrollView, StyleSheet,View,FlatList,Linking,Alert} from 'react-native';
import * as actions from '../actions'
import { Avatar,Text,Divider,Icon,ListItem} from 'react-native-elements';
import {Audio} from 'expo'



export default class AlbumDetailedScreen extends React.Component {
  static navigationOptions = {
    title: 'AlbumDetail',
  };
  constructor(){
      super();
      this.state={
          tracks:[]
      }
  }
  
  componentDidMount(){
    const album = this.props.navigation.getParam('album',{}) 
   actions.getAlbumTracks(album.id).then(
       tracks =>this.setState({tracks}))
   .catch(error=>console.error(error));
  }
 async savedTrackToFavorite(album,track){
    const favouriteAlbums=await actions.retrieveData('favoriteAlbums') || {};
   
    let albumData= favouriteAlbums[album.id];
    if(!albumData){
      albumData=album;
    }
    if(!albumData['tracks']){
      albumData['tracks']={};
    }
    albumData['tracks'][track.id]=track;
    favouriteAlbums[album.id]=albumData;

    const success= await actions.storeData('favoriteAlbums',favouriteAlbums);
    if(success){
      Alert.alert(
        'Track',
        `Track ${track.title} from ${track.artist.name} was added to favoraite`,
        [
          {text: 'Continue', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }
  btnPlayerClicked = async()=>{
    await Audio.Sound.createAsync({uri:track.preview})
  }



    renderTracks(album){
        const {tracks} = this.state;
        if(tracks && tracks.length > 0){
            return tracks.map((track,index) =>{
                return(
                    <ListItem key={index}
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 0.5,
                      }}
                              title={track.title}
                              leftIcon={{name:'play-arrow'}}
                              leftIconOnpress={()=>Linking.openURL(track.preview)} 
                              onPress={()=>{Linking.openURL(track.preview)}}  
                              rightIcon={
                                  <Icon raised
                                        name='play'
                                        type='font-awesome'
                                        color='#000'
                                        onPress={()=>this.savedTrackToFavorite(album,track)}
                                    />
                                   
                                        }
                    />
                    
                )
            })
        }
    }

   

  render() {
     const album = this.props.navigation.getParam('album',{});
     const artist = this.props.navigation.getParam('artist','');
     debugger;
     
     if(album.id){
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                 <Avatar size='xlarge' rounded source={{uri: album.cover_medium}}> </Avatar> 
                </View>
                <View style={styles.headerRight}>
                    <Text style={styles.mainText} h3> {album.title}</Text>
                    <Text style={styles.subText} h4> {artist}</Text>
                    <Icon raised
                       name='play'
                       type='font-awesome'
                       size={20}
                       color='#000'
                       onPress={()=>Linking.openURL(this.state.tracks[0].preview)} />
                </View>
            </View>
            <Divider  style={{backgroundColor:'#f50',marginTop:5, borderBottomWidth:2 }}/>
            <View style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}>
                {this.renderTracks(album)}
            </View>
             </ScrollView>
          );
     }else{
         <View><Text>Loading..</Text></View>
     }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  header:{
    flex:1,
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:"#fff",
    padding:20,
  },
  avatar:{
      flex  :1,
      marginRight:10
  },
  headerRight:{
      flex:1,
      flexWrap:'wrap',
      justifyContent:'flex-end',
      flexDirection:'column'
  },
  mainText:{
    fontWeight:'bold',
    color:'#3a3a3a',
    fontSize:17,
  },
  subText:{
      color:'#3a3a3a',
      fontSize:10,
  }
});
