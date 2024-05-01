import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="flex gap-4 overflow-scroll px-5 pt-6">
      {categories.map((cat) => (
        <CategoryItem category={cat} key={cat.id} />
      ))}
    </div>
  );
};

export default CategoryList;
