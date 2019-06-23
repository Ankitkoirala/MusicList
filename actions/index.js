import axios from 'axios'
import _ from 'lodash'
import {AsyncStorage} from 'react-native'

const API_KEY='d1d4172a75msh065ae66c23b78d9p1026a1jsn0af9d5ad1610'
const axiosInstance = axios.create({
    baseURL: 'https://deezerdevs-deezer.p.rapidapi.com/',
    timeout: 2000,
    headers: {'X-RapidAPI-Key': API_KEY}
  });
  

  export const searchTracks = singerName=>{
 
      return axiosInstance.get(`search?q=${singerName}`).then(
        
          response =>{
              const albums=response.data.data.map(item =>item.album )
            const uniqueAlbums=_.uniqBy(albums, 'title');
            return uniqueAlbums
        });
         
        }
    export const getAlbumTracks =albumId=>{

        return axiosInstance.get(`album/${albumId}`).then(
            response=>response.data.tracks.data)
    }

    export const storeData = async (key,value) => {
            const stringifyValue=JSON.stringify(value);
        try {
          await AsyncStorage.setItem(key, stringifyValue);
        
          return value;
        } catch (error) {
          // Error saving data
        }
      };
    export const retrieveData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
         
            console.log(value);
            // const parsedValue = 
            JSON.parse(value);
            return JSON.parse(value);
            // this.setState({value})
          }
        } catch (error) {
          // Error retrieving data
        }
      };
