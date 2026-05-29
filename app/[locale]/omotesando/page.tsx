'use client';

import React from 'react';
import { StubPage } from '@/components/layout/StubPage';
import { useTranslations } from 'next-intl';

export default function OmotesandoPage() {
  const t = useTranslations();
  return (
    <StubPage
      titleKey="footerOmotesando"
      enTitle="Omotesando Shopping"
      defaultTitle={t('omotesando_text_1')}
    />
  );
}
