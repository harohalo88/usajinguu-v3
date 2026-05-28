import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['ja', 'en', 'zh-TW', 'zh-CN', 'ko'];

export default getRequestConfig(async ({locale}) => {
  const activeLocale = locale || 'ja';
  if (!locales.includes(activeLocale)) notFound();

  return {
    locale: activeLocale,
    messages: (await import(`./messages/${activeLocale}.json`)).default
  };
});
