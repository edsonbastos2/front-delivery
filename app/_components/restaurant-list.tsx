import { db } from "../_lib/prisma";
import RestaurantItem from "./reataurant-item";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 5 });
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((item) => (
        <RestaurantItem restaurant={item} key={item.id} />
      ))}
    </div>
  );
};

export default RestaurantList;
