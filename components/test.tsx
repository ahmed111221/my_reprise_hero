import { products } from "@/data/products";

const Test = () => {

    const productsData = products;
    return (
        <div>
           {
                productsData.map((product) => (
                    <div key={product.id} className="flex flex-col gap-2 bg-white p-4 rounded-md my-4 ">
                        <p>{product.name}</p>
                        <p>{product.description}</p>
                        <p>{product.remise}</p>
                        <p>{product.price}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Test;