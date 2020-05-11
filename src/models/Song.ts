interface Song{
    author: string,
    name: string,
    bpm: number,
    description: string,
    seconds: number,
    monetization: number,
    genres: string[],
    links: Object,
    mood: string[],
    source: number,
    tags?: string[],
    img?: string
}
export default Song;