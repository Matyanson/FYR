"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const SFGenre = require('../static/SFGenre.json');
const spotifyAPI = {
    async getAuthSF() {
        const clientId = '9578627c8374487081defb9466709a06';
        const clientSecret = 'a2015b5b3f8447369819422857338fe0';
        const headers = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: clientId,
                password: clientSecret,
            },
        };
        const data = 'grant_type=client_credentials'; //qs stingify
        try {
            const response = await axios_1.default.post('https://accounts.spotify.com/api/token', data, headers);
            console.log(response.data.access_token);
            return response.data.access_token;
        }
        catch (error) {
            console.log(error);
            return '';
        }
    },
    async getSongDetailsSF(token, Ids) {
        let Idsjoined = Ids.join(",");
        let result = this.fetchSF(token, `audio-features?ids=${Idsjoined}`);
        return result;
    },
    async getSongsSF(token, search = "", genre = []) {
        genre = this.getGenreSF(genre);
        let res = await this.searchSF(token, search, ["track"], genre);
        let tracks = res.tracks.items;
        let temp = {};
        tracks.forEach((t) => {
            temp[t.id] = {
                author: t.artists[0].name,
                name: t.name,
                bpm: -1,
                description: "",
                seconds: t.duration_ms / 1000,
                monetization: -1,
                genre: [],
                tags: [],
                links: { spotify: t.href },
                mood: -1,
                source: 2
            };
        });
        let details = await this.getSongDetailsSF(token, Object.keys(temp));
        details = details.audio_features;
        details.forEach((d) => {
            if (temp[d.id]) {
                temp[d.id].bpm = d.tempo;
                temp[d.id].mood = d.valence;
            }
        });
        return Object.values(temp);
    },
    async searchSF(token, search = "", types = ["track"], genre = []) {
        let result;
        let genreEncoded = `%22${genre.join("%20")}%22`;
        let typesEncoded = types.join(",");
        let query = search;
        if (genre.length > 0)
            query += `%20genre:${genreEncoded}`;
        query += `&type=${typesEncoded}`;
        result = await this.fetchSF(token, `search?q=${query}`);
        return result;
    },
    async fetchSF(token, endpoint) {
        console.log(endpoint);
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios_1.default.get('https://api.spotify.com/v1/' + endpoint, config);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },
    getGenreSF(genre) {
        let result = [];
        for (let g of genre) {
            if (SFGenre[g]) {
                if (SFGenre[g] instanceof Array) {
                    result = result.concat(SFGenre[g]);
                }
                else {
                    result.push(SFGenre[g]);
                }
            }
        }
        return result;
    }
};
exports.default = spotifyAPI;
//# sourceMappingURL=spotifyAPI.js.map