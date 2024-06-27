import type { Nil } from './common-types';

export const APP_URL = '#';
export const APP_TITLE = 'Grocery';
export const APP_DESCRIPTION = `${APP_TITLE} is a simple fullstack e-commerce website demo built with Next.js`;
export const APP_REPOSITORY_URL = 'https://github.com/';

export const createMockArray = (length: number) => {
  // eslint-disable-next-line unicorn/prefer-spread
  return Array.from(Array.from({ length }).keys());
};

export const isNil = (value: unknown): value is Nil => {
  return value === null || value === undefined;
};
