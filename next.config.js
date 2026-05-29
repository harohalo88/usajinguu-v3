const createNextIntlPlugin = require('next-intl/plugin');

// Explicitly point to the config file so this never breaks on next-intl upgrades
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);
