import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-8 py-3 shadow-md">
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
