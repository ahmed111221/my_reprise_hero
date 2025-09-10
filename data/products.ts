export interface Product {
  id: string;
  name: string;
  image: string;
  url: string;
}

export const products: Product[] = [
  {
    id: "tablet",
    name: "Tablet",
    image: "/products/tablet.svg",
    url: "/product/tablet"
  },
  {
    id: "headphones",
    name: "Headphones",
    image: "/products/headphones.svg",
    url: "/product/headphones"
  },
  {
    id: "phone",
    name: "Phone",
    image: "/products/phone.svg",
    url: "/product/phone"
  },
  {
    id: "laptop",
    name: "Laptop",
    image: "/products/laptop.svg",
    url: "/product/laptop"
  },
  {
    id: "watch",
    name: "Watch",
    image: "/products/watch.svg",
    url: "/product/watch"
  },
  {
    id: "vr-headset",
    name: "VR Headset",
    image: "/products/headphones.svg", 
    url: "/product/vr-headset"
  },
  {
    id: "controller",
    name: "Controller",
    image: "/products/phone.svg", 
    url: "/product/controller"
  },
  {
    id: "air-pods",
    name: "Air Pods",
    image: "/products/airpods.svg", 
    url: "/product/air-pods"
  }
];

export const getRandomProduct = (): Product => {
  const randomIndex = Math.floor(Math.random() * products.length);
  return products[randomIndex];
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};