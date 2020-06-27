"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const genresData = require('../static/YTMusicGenres.json');
const YoutubeAPI = {
    async getSongs(s = "", genre = [], tags = [], monetization = 0, sortBy = "relevance") {
        let temp = this.getGenreAndTags(genre);
        let topics = temp[0];
        tags = tags.concat(temp[1]);
        let license = monetization === 1 ? "creativeCommon" : "any";
        let sort = sortBy === "views" ? "viewCount" : "relevance";
        let res = await this.search(s, "video", topics, tags, license, sort, 10);
        if (res && res.items) {
            let temp = {};
            res.items.forEach((item) => {
                temp[item.id.videoId] = {
                    author: item.snippet.channelTitle,
                    name: item.snippet.title,
                    bpm: -1,
                    description: "description of this awesome song!",
                    seconds: -1,
                    monetization: license === "creativeCommon" ? 1 : -1,
                    genres: [],
                    links: { youtube: `https://youtu.be/${item.id.videoId}` },
                    mood: -1,
                    source: 1,
                    img: item.snippet.thumbnails.default.url
                };
            });
            let details = await this.getSongDetails(Object.keys(temp));
            details.forEach((d) => {
                if (temp[d.id]) {
                    temp[d.id].tags = d.snippet.tags;
                    temp[d.id].genre = this.topicsToGenre(d.topicDetails.relevantTopicIds);
                    temp[d.id].monetization = d.status.license === "creativeCommon" ? 1 : 0;
                }
            });
            return Object.values(temp);
        }
        return [];
    },
    async getSongDetails(videoIds) {
        let ids = videoIds.join(',');
        console.log("getting details" + `videos?part=snippet,topicDetails,status&id=${ids}`);
        let res = await this.fetch(`videos?part=snippet,topicDetails,status&id=${ids}`);
        if (res && res && res.items)
            return res.items;
        else {
            console.log("couldn't get deatils:");
            console.log(res);
        }
    },
    async search(search = "", type = "video", topics = ["/m/04rlf"], tags = [], license = "any", sortBy = "relevance", videoCategory = 10) {
        let topicIds = topics.join(',');
        let tagsEncoded = tags.join('%7C');
        search = `${search} ${tagsEncoded}`;
        let result = this.fetch(`search?q=${search}&part=snippet&order=${sortBy}&regionCode=US&type=${type}&videoCategoryId=${videoCategory}&topicId=${topicIds}&videoLicense=${license}`);
        return result;
    },
    async fetch(endpoint) {
        let key = "AIzaSyBuoiAmiO9-nwx1M_Ti3DxxpgUb7NAQQtI";
        let result;
        try {
            let res = await axios_1.default.get(`https://www.googleapis.com/youtube/v3/${endpoint}&key=${key}`);
            result = res.data;
        }
        catch (e) {
            console.log(e);
        }
        return result;
    },
    topicsToGenre(topics) {
        let hash = {};
        topics.forEach(t => {
            const key = Object.keys(genresData).find(key => (key !== "music"
                &&
                    (genresData[key] === t ||
                        genresData[key].includes(t))));
            if (key && !hash[key])
                hash[key] = true;
        });
        return Object.keys(hash);
    },
    getGenreAndTags(genre = []) {
        let topics = {};
        let tags = {};
        genre.forEach(g => {
            if (genresData[g]) {
                let topics = genresData[g];
                if (topics instanceof Array)
                    addTopics(topics);
                else
                    addTopics([topics]);
            }
            else
                tags[g] = true;
        });
        return [Object.keys(topics), Object.keys(tags)];
        function addTopics(values) {
            values.forEach(t => {
                topics[t] = true;
            });
        }
    }
};
exports.default = YoutubeAPI;
//# sourceMappingURL=youtubeAPI.js.map