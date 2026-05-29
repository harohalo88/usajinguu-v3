'use client';

import React from 'react';
import { StubPage } from '@/components/layout/StubPage';
import { useTranslations } from 'next-intl';

export default function DonationPage() {
  const t = useTranslations();
  return (
    <StubPage
      titleKey="footerDonation"
      enTitle="Donations & Supporters"
      defaultTitle={t('donation_text_1')}
    />
  );
}
