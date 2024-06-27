import { getManyCategories } from '@/categories/category-fetchers';
import { routes } from '@/routing/routing-utils';
import { CategoryLink } from './category-link';

export async function Categories() {
  const categories = await getManyCategories();

  return (
    <ul className="flex justify-center gap-12">
      {categories.map((category) => {
        return (
          <li key={category.value}>
            <CategoryLink
              href={routes.search({
                query: { categories: [category.value] },
              })}
              imageSrc={category.image}
              title={category.title}
              color={category.color}
            />
          </li>
        );
      })}
    </ul>
  );
}
