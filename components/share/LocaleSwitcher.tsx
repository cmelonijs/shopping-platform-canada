'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Image from 'next/image';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return (
   <Select value={locale} onValueChange={switchLocale}>
      <SelectTrigger className="w-[auto]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <Image src="/flagUK.svg" alt="English" width={20} height={14} />
            <span>UK</span>
          </div>
        </SelectItem>
        <SelectItem value="it">
          <div className="flex items-center gap-2">
            <Image src="/flagIT.svg" alt="Italiano" width={20} height={14} />
            <span>IT</span>
          </div>
        </SelectItem>
        <SelectItem value="vi">
          <div className="flex items-center gap-2">
            <Image src="/flagVI.svg" alt="vietnamese" width={20} height={14} />
            <span>VI</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
