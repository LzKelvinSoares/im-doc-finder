export interface Document {
    id: string;
    title: string;
    url: string;
    icon: string;
};

export interface PersonCRUD {
    id: string;
    name: string;
}

export interface Person extends PersonCRUD {
    documents?: Document[];
}
