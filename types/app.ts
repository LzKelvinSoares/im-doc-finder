export interface Document {
    id: string | number;
    title: string;
    url: string;
    icon: string;
};

export interface DocumentCRUD extends Document {
    personId: string | number;
};

export interface PersonCRUD {
    id: string | number;
    name: string;
}

export interface Person extends PersonCRUD {
    documents?: Document[];
}
