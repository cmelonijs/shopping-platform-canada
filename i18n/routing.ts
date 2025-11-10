import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'it', 'vi'],
  defaultLocale: 'en'
});