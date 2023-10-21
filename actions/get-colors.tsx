import { Color } from "@/types";

const URL=`https://amazon-green-5b24hskck-olivemonk.vercel.app/api/aeee7d63-5801-4593-96d8-d688c00aed41/colors`;

const getColors = async (): Promise<Color[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getColors;
