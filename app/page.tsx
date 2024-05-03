import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <CategoryList />

      <div className="px-5 pt-6">
        <PromoBanner src="/promo-banner01.png" alt="desconto em pizza" />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-sm font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-xs font-semibold text-primary hover:bg-transparent"
          >
            Ver Todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <div>
          <ProductList products={products} />
        </div>
      </div>

      <div className="px-5 pt-6">
        <PromoBanner src="/promo-banner02.png" alt="A partir de R$ 17,90" />
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-sm font-semibold">Restaurates Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-xs font-semibold text-primary hover:bg-transparent"
          >
            Ver Todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <div>
          <RestaurantList />
        </div>
      </div>
    </>
  );
}
