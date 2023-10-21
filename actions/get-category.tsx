import { Category } from "@/types";

const URL=`https://amazon-green-5b24hskck-olivemonk.vercel.app/api/aeee7d63-5801-4593-96d8-d688c00aed41/categories`;

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getCategory;
