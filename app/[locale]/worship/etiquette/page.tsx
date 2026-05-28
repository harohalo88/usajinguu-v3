'use client';

import React from 'react';
import { StubPage } from '@/components/layout/StubPage';

export default function EtiquettePage() {
  return (
    <StubPage
      titleKey="etiquetteTitle"
      enTitle="Worship Etiquette"
      defaultTitle="参拝の作法"
      parentPath="/worship/guide"
      parentLabel="参拝について"
    />
  );
}
