'use client';

import React from 'react';
import { StubPage } from '@/components/layout/StubPage';
import { useTranslations } from 'next-intl';

export default function EtiquettePage() {
  const t = useTranslations();
  return (
    <StubPage
      titleKey="etiquetteTitle"
      enTitle="Worship Etiquette"
      defaultTitle={t('worshipEtiquette_text_1')}
      parentPath="/worship/guide"
      parentLabel={t('worshipEtiquette_text_2')}
    />
  );
}
