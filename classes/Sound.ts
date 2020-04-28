import genres from './genres';
interface Sound{
    author: string,
    name: string,
    description: string,
    seconds: number,
    monetization: number,
    links: string[],
    source: number,
    tags: string[]
}
export default Sound;