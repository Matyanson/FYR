import * as functions from 'firebase-functions';
import axios from 'axios';
import Song from './models/Song';
//import { ResultStorage } from 'firebase-functions/lib/providers/testLab';
const admin = require('firebase-admin');
const YTGenresData = require('./static/YTMusicGenres.json');
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

//https://us-central1-freeytmusic.cloudfunctions.net/helloWorld

exports.getMusic = functions.https.onCall(async (data, context)=>{

    const {search = "", monetization = 0, tags = [], mood = [], genre = [], sortBy = "relevance" } = data;
    let monetiz = Number(monetization);
    let result = [] as Song[];
    
    let YoutubeSongs = await fetchFromYT(search, monetiz, genre, tags, mood, sortBy);
    result = YoutubeSongs.map((x:any)=>{
        return x.song
    })
    return result;


    async function fetchFromYT(search = "", monetization: number = 0, genre: string[] = [], tags: string[] = [], mood: string[] = [],  sortBy = "relevance"){
    let key = "AIzaSyBuoiAmiO9-nwx1M_Ti3DxxpgUb7NAQQtI";
    //genre to topicIDs
    let topicIDs: string[] = [];
    for(const x of genre){
        let id = YTGenresData[x];
        if(id){
        if(id instanceof Array){
            for(const x of id)
            if(!topicIDs.includes(x))
                topicIDs.push(x);
        }
        else if(!topicIDs.includes(id))
            topicIDs.push(id);
        }
    }
    //prepare yt variables
    let license = monetization === 1? "creativeCommon" : "any";
    let sort = sortBy === "views"? "viewCount" : "relevance";
    search = search +" "+ tags.join('%7C');
    let topics = topicIDs.join(',');
    console.log(search);
    //fetch songs
    const result = await searchYTSongs(search, license, topics, sort);
    const videoIds = result.map(x=>{
        return x.videoId;
    })
    const details = await getYTVideosDetail(videoIds, key);
    //add info to songs
    for(const i in result){
        const detail = details[i]?? undefined;
        if(detail.snippet){
            result[i].song.tags = detail.snippet.tags;
        }
        if(detail.topicDetails){
            let topics = detail.topicDetails.relevantTopicIds;
            //get genres
            let genre = topics.map((x:any)=>{
                const key = Object.keys(YTGenresData).find(key => (
                key!=="music"
                && (YTGenresData[key] === x
                || YTGenresData[key].includes(x))
                ));
                return key;
            })
            result[i].song.genres = genre;
        }
        if(detail.status.license && result[i].song.monetization === -1){
            result[i].song.monetization = detail.status.license === "creativeCommon"? 1 : -1;
        }
    }
    return result;

    }
    async function searchYTSongs(search = "", license = "any", topicId = "/m/04rlf", sortBy = "relevance"){
        let key = "AIzaSyBuoiAmiO9-nwx1M_Ti3DxxpgUb7NAQQtI";
        //get YouTube Songs
        try{
            let res = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${search}&part=snippet&order=${sortBy}&regionCode=US&type=video&videoCategoryId=10&topicId=${topicId}&videoLicense=${license}&key=${key}`);
        
            let YTvideos = res.data.items;
            //save songs to array
            let result = [];
            for(const song of YTvideos){
                result.push({
                videoId: song.id.videoId,
                song:
                {
                    author: song.snippet.channelTitle,
                    name: song.snippet.title,
                    bpm: -1,
                    description: "description of this awesome song!",
                    seconds: -1,
                    monetization: license === "creativeCommon"? 1 : -1,
                    genres: [],
                    links: {youtube: `https://youtu.be/${song.id.videoId}`},
                    mood: [],
                    source: 1,
                    img: song.snippet.thumbnails.default.url
                }as Song})
            }
            return result;
        }catch(e){
            console.log(e)
            return [];
        }
    }
    async function getYTVideosDetail(videoIds: string[], key:string){
    try{
        let ids = videoIds.join(',');
        let topics = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,topicDetails,status&id=${ids}&key=${key}`);
        let details = topics.data.items;
        return details;
    }catch(e){
        console.log(e);
    }
    return [];
    }
})
