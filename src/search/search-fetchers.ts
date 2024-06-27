import { getDb } from '@/db/db-utils';
import type { Product } from '@/products/product-types';
import type {
  ProductFilterArgs,
  ProductFilterOptions,
  ProductFilterResponse,
  ProductFilterSelectedOption,
} from '@/search/search-types';
import { ProductFilterKey, ProductSorting } from '@/search/search-utils';
import { cache } from 'react';

async function getProductFilterOptions() {
  const { sorting, categories, priceRange } = await getDb();

  const filterOptions: ProductFilterOptions = {
    sortings: {
      title: 'Tri',
      options: sorting.map((option, i) => ({ ...option, order: `0_${i}` })),
      filterKey: ProductFilterKey.SORTING,
    },
    categories: {
      title: 'Catégories',
      options: categories.map((option, i) => ({ ...option, order: `1_${i}` })),
      filterKey: ProductFilterKey.CATEGORIES,
    },
    priceRanges: {
      title: 'Prix',
      options: priceRange.map((option, i) => ({ ...option, order: `2_${i}` })),
      filterKey: ProductFilterKey.PRICE_RANGES,
    },
  };

  return filterOptions;
}

async function getManyProducts(args: ProductFilterArgs) {
  const db = await getDb();
  let response: Product[] = [...db.products];

  if (args.categories?.length) {
    response = response.filter((product) =>
      args.categories?.includes(product.category.value),
    );
  }

  if (args.priceRanges?.length) {
    const productsInPriceRanges: Product[] = [];

    for (const priceRange of args.priceRanges) {
      const [minPriceText, maxPriceText] = priceRange.split('-');
      const minPrice = Number(minPriceText);
      const maxPrice =
        maxPriceText === 'max'
          ? Number.POSITIVE_INFINITY
          : Number(maxPriceText);
      productsInPriceRanges.push(
        ...response.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice,
        ),
      );
    }

    response = productsInPriceRanges;
  }

  if (args.sorting) {
    switch (args.sorting as ProductSorting) {
      case ProductSorting.PRICE_ASC: {
        response.sort((a, b) => a.price - b.price);
        break;
      }
      case ProductSorting.PRICE_DESC: {
        response.sort((a, b) => b.price - a.price);
        break;
      }
    }
  }

  return response;
}

function getProductFilterSelectedOptions({
  filterOptions,
  args,
}: {
  filterOptions: ProductFilterOptions;
  args: ProductFilterArgs;
}) {
  const { sortings, categories, priceRanges } = filterOptions;
  const selectedOptions: ProductFilterSelectedOption[] = [];

  let isDefaultSortingApplied = false;
  let selectedSorting = sortings.options.find(
    (sorting) => sorting.value === args.sorting,
  );

  if (!selectedSorting) {
    isDefaultSortingApplied = true;

    const defaultSorting = sortings.options.find(
      (sorting) => sorting.isDefault,
    );
    selectedSorting = defaultSorting;
  }

  if (selectedSorting) {
    selectedOptions.push({
      ...selectedSorting,
      isVisible: !isDefaultSortingApplied,
      filterKey: ProductFilterKey.SORTING,
    });
  }

  for (const category of categories.options) {
    if (args.categories?.includes(category.value)) {
      selectedOptions.push({
        ...category,
        isVisible: true,
        filterKey: ProductFilterKey.CATEGORIES,
      });
    }
  }

  for (const priceRange of priceRanges.options) {
    if (args.priceRanges?.includes(priceRange.value)) {
      selectedOptions.push({
        ...priceRange,
        isVisible: true,
        filterKey: ProductFilterKey.PRICE_RANGES,
      });
    }
  }

  return selectedOptions;
}

export const filterProducts = cache(
  async (args: ProductFilterArgs): Promise<ProductFilterResponse> => {
    const [filterOptions, products] = await Promise.all([
      getProductFilterOptions(),
      getManyProducts(args),
    ]);

    const selectedOptions = getProductFilterSelectedOptions({
      filterOptions,
      args,
    });

    return { filterOptions, selectedOptions, products };
  },
);
