import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import { ArrowDownIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

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
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="relative h-[360px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />

        <Button
          className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
          size="icon"
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-7">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className="mb-1 mt-1 text-lg font-semibold">{product.name}</h1>
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">
            {formatCurrency(Number(product.price))}
          </h2>

          {product.discountPercentage > 0 && (
            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full text-white">
              <ArrowDownIcon size={14} />
              <span className="text-xs font-semibold">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
