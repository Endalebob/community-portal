export default interface IResourceTopic {
    id: number;
    title: string;
    resources: IResourceList[];
}

export interface IResourceList {
    id: number;
    title: string;
}