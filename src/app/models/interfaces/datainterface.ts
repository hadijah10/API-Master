export interface IPostList{
    id:number;
    userId:number;
    title: string;
    body:string;
}
export interface IPostComment{
    postId: number;
    id:number;
    name:string;
    email:string;
    body: string;
}