interface Product {
    id: number;
    name: string;
    description: string;
    remise: number;
    price: number;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Product 1",
        description: "Description 1",
        remise: 10,
        price: 100
    },
    {
        id: 2,
        name: "Product 2",
        description: "Description 2",
        remise: 20,
        price: 200
    },
    {
        id: 4,
        name: "Product 4",
        description: "Description 4",
        remise: 40,
        price: 400
    },
    {
        id: 5,
        name: "Product 5",
        description: "Description 5",
        remise: 50,
        price: 500
    },
];