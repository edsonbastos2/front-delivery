import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductsPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
      category: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const extraProducts = await db.product.findMany({
    where: {
      category: {
        name: `${product?.category.name}`,
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },

    include: {
      restaurant: true,
    },
  });

  return (
    <div>
      <ProductImage product={product} />
      <ProductDetails product={product} extraProducts={extraProducts} />
    </div>
  );
};

export default ProductsPage;
