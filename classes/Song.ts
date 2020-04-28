import genres from './genres';
interface Song{
    author: string,
    name: string,
    bpm: number,
    description: string,
    seconds: number,
    monetization: number,
    genres: string[],
    links: string[],
    mood: string[],
    source: number,
    tags?: string[]
}
export default Song;