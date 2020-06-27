import * as functions from 'firebase-functions';
import Song from './models/Song';
//import SC from './static/soundcloud.js';
const admin = require('firebase-admin');
import youtubeAPI from './models/youtubeAPI';
import spotifyAPI from './models/spotifyAPI';
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

//https://us-central1-freeytmusic.cloudfunctions.net/helloWorld

exports.getMusic = functions.https.onCall(async (data, context)=>{

    const {search = "", monetization = -1, tags = [], mood = -1, genre = [], sortBy = "relevance" } = data;
    console.log({search, monetization, tags, mood, genre, sortBy});
    if(false){
        await youtubeAPI.getSongs(search, genre, tags, 0, sortBy);
    }
    //let monetiz = Number(monetization);
    let allSongs = [] as Song[];

    console.log("starting");

    let SFToken = await spotifyAPI.getAuthSF();
    let SFsongs = await spotifyAPI.getSongsSF(SFToken, search, genre);

    if(SFsongs.length > 0){
        allSongs.push(SFsongs[0]);
        let song = await uploadSong(allSongs[0]);
        return [song];
    }
    else
        console.log("0 results on spotify");
    
    return allSongs;
});

exports.uploadSong = functions.https.onCall( async (data, context)=>{
    uploadSong(data);
})

exports.onUploadSong = functions.firestore
.document('songs/{songId}')
.onCreate(async (snap, context) => {
    const value = snap.data();
    let newValue = value;
    if(newValue){
        // save new tags
    }
    return null;
})

async function uploadSong(song: Song): Promise<Song>{
    //prepare new properties
    song.author_casefold = casefold(song.author);
    song.author_cleared = clearAuthor(song.author_casefold);
    song.name_casefold = casefold(song.name);
    song.name_cleared = clearTitle(song.name_casefold);
    song.seconds = Math.floor(song.seconds);

    //search for Matching song in db
    let db = admin.firestore();
    let items = await getMatchingSong(song.author_cleared, song.name_casefold, db);

    if(items && items.length > 0){
        let id = items[0].id;
        //merge the existing song with the new one
        return await updateSong(id, song);
    }
    else{
        //Upload new unique Song
        console.log("uploadingNewUniqueSong");
        return await uploadUnique(song);
    }

    async function uploadUnique(song: Song): Promise<Song>{
        //search on other paltforms
        let similar: Song[] = [];
        let promises: Promise<Song[]>[] = [];
        let search = `${song.author_cleared} ${song.name_cleared}`;

        if (!song.links.hasOwnProperty("youtube")) {
            promises.push(youtubeAPI.getSongs(search));
        }
        if (!song.links.hasOwnProperty("spotify")) {
            let token = await spotifyAPI.getAuthSF();
            promises.push(spotifyAPI.getSongsSF(token, search));
        }
        let temp = await Promise.all(promises);
        similar = flatten(temp);

        let matching = similar.filter(s=>{
            return isSongMatching(s, song.author_casefold!, song.name_casefold!);
        })
        let related = similar.filter(s=>{
            return isSongRelated(s, song.author_cleared!, song.name_cleared!);
        })
        console.log(related);
        //merge to one song
        matching.reverse().forEach(x=>{
            song = mergeSongs(song, x);
        })

        let newDocRef = db.collection('songs').doc();
        newDocRef.set(song);
        console.log("return merged song:");
        console.log(song);
        return song;
    }
    function flatten(array: any[]):any[]{
        let result: any[] = [];
        for(let el of array){
            result = result.concat(el);
        }
        return result;
    }
}
function isSongRelated(song: Song, author_cleared: string, name_cleared: string){
    let name_cleared0 = clearTitle(casefold(song.name));
    let author_cleared0 = clearAuthor(casefold(song.author));
    const firstCheck = (name_cleared.includes(name_cleared0) &&
                      (name_cleared.includes(author_cleared0) || author_cleared == author_cleared0));
    return firstCheck
}

function isSongMatching(song: Song, author_cleared: string, name_casefold: string){
    console.log(`${clearAuthor(casefold(song.author))}-${casefold(song.name)} == ${author_cleared}-${name_casefold}`);
    let result = (clearAuthor(casefold(song.author)) == author_cleared &&
            (casefold(song.name) == name_casefold || casefold(song.name) == `${author_cleared} - ${name_casefold}` || casefold(song.name) == `${author_cleared}-${name_casefold}`));
    if(result) console.log("match!!!");
    return result;
}

function mergeSongs(song1: any, song2: Song){
    return Object.assign(song1,{
        bpm: song1.bpm > -1? song1.bpm : song2.bpm,
        seconds: song1.seconds > -1? song1.seconds : song2.seconds,
        monetization: mergeMonetization(song2, song1),
        genre: song1.genre.concat(song2.genre),
        links: Object.assign(song1.links, song2.links),
        mood: song1.mood > -1? song1.mood : song2.mood,
        tags: song1.tags.concat(song2.tags),
        img: song1.img? song1.img : song2.img,
    })
}

async function updateSong(docId: string, newSong: Song, db: any = undefined){
    if(!db)
        db = admin.firestore();
    let doc = await db.collection('songs').doc(docId);
    let snapshot = await doc.get();
    let originalData = await snapshot.data();
    console.log("matching song:");
    console.log(originalData);

    let newData = mergeSongs(originalData, newSong);

    doc.update(newData);
    return newData;
}

function casefold(s: string){
    return s.normalize('NFKC').toLowerCase();
}

function clearTitle(title: string){
    return title.replace(/\([^()]*\)|\[[^[\]]*\]|\{[^{}]*\}|\<[^<>]*\>/g, "");
}

function clearAuthor(author: string){
    return author.replace(/\s*vevo\s*/g, "");
}

function mergeMonetization(...songs: Song[]){
    let youtubeWeight = 0.3;
    let soundcloudWeight = 0.7;
    let newgroundsWeight = 0.3;
    let result = 0.5;
    songs.forEach(s=>{
        if(s.monetization > -1){
            let up = s.monetization > 0.5? true : false;
            if(s.links.youtube)
                calculateWeigth(youtubeWeight,up);
            if(s.links.soundcloud)
                calculateWeigth(soundcloudWeight, up);
            if(s.links.newgrounds)
                calculateWeigth(newgroundsWeight, up);
        }        
    })
    function calculateWeigth(weight: number, up:boolean){
        if(up){
            result =  result + (1-result) * (weight*(0.5/result));
        }
        else{
            result = result - (result) * (weight*(0.5/result));
        }
    }
    return result;
}

async function getMatchingSong(author_cleared: string, name_casefold: string, db:any){
    if(!db)
        db = admin.firestore();
    let songsRef = db.collection('songs');
    let query = await songsRef
    .where("author_cleared", "==", `${author_cleared}`)
    .where("name", "==", `${name_casefold}`)
    .limit(1);
    let items = await query.get();
    return items.docs;
}