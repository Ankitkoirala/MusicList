import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
 
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { Icon,ListItem, Text, Card } from 'react-native-elements';
import SongImage from '../assets/images/Song.jpg'

const menuList=[
  {
    title:'Serach Albums',
    subtitle:'Search your fav music',
    icon:'music',
    navigateTo:'Album',
    images:'https://i.pinimg.com/originals/57/e9/e2/57e9e207cc26658c19bd4fe05380dbbd.jpg'
  },
  
    {
      title:'Favourite Albums',
      subtitle:'Access your fav albums',
      icon:'heart',
      navigateTo:'Favorite',
      images:"https://i.ytimg.com/vi/bVCdNJK4RuA/maxresdefault.jpg"
      // images:{SongImage}
    },
  
    {
        title:'Setting',
        subtitle:'Customize App',
        icon:'cog',
        navigateTo:'Settings',
        images:'https://www.linkedinsights.com/wp-content/uploads/2018/03/Settings-Metal-1024x577.png'
      }
]
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
 

  render() {
    return (
      <ScrollView style={styles.container}>
      <View containerStyle={{backgroundColor:'#eaeaea',marginTop:0}}>
        {
          menuList.map((item,index)=>{
            return(
              <Card key={index}
                    image={{uri:item.images}}
                    title={item.title}>
                      <View style={styles.cardView}>
                        {/* <Image
                        source={SongImage}
                        style={{width:'100%',height:200}}/> */}
                        <Text style={{marginBottom:10}}> {item.subtitle}</Text>
                        <Icon
                          raised
                          name={item.icon}
                          type='font-awesome'
                          color="#000"
                          size={30}
                          onPress={()=>{this.props.navigation.navigate(item.navigateTo)}}
                          />
                      </View>
                 </Card>
            )

          })
        }
      </View>
       </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textColor:{
    color:'#f44b42'
  },
  cardView:{
    alignItems:'center',
    // backgroundColor:'#f44b42',
  }
 
});
