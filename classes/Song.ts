interface Song{
    author: string,
    name: string,
    bpm: number,
    description: string,
    seconds: number,
    monetization: number,
    genre: string[],
    links: {[key:string]:string},
    mood: number,
    source: number,
    tags: string[],
    img?: string
}
export default Song;