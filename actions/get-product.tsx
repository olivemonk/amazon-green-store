import { Product } from "@/types";

const URL=`https://amazon-green-5b24hskck-olivemonk.vercel.app/api/aeee7d63-5801-4593-96d8-d688c00aed41/products`;

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProduct;
