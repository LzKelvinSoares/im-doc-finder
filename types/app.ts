export interface Document {
    id: string;
    title: string;
    url: string;
    icon: string;
};

export interface Person {
    id: string;
    name: string;
    documents: Document[];
}
