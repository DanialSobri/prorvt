export interface Vendor {
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    id: string;
    logo: string;
    name: string;
    updated: string;
}

export interface Category {
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    name: string;
    updated: string;
}

export interface Families {
    category: Category[];
    collectionId: string;
    collectionName: string;
    created: string;
    desc: string;
    freemium: string;
    id: string;
    vendor: Vendor;
    name: string;
    nested_family: boolean;
    parametric: boolean;
    rfa: string;
    specification: string;
    thumbnail: string;
    updated: string;
}