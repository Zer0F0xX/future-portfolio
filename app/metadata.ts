// File: app/metadata.ts
import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SITE_NAME = 'PAID.ca — Dimensional Archive';
const TWITTER_HANDLE = '@your_handle'; // Replace with your Twitter handle

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'The OS of You. A holographic, spatial portfolio by [Your Name].', // Replace with your name
  applicationName: SITE_NAME,
  authors: [{ name: '[Your Name]', url: SITE_URL }], // Replace with your name
  
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: 'The OS of You. A holographic, spatial portfolio by [Your Name].', // Replace with your name
    // You should create a default OG image and place it in /public
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
    title: SITE_NAME,
    description: 'The OS of You. A holographic, spatial portfolio by [Your Name].', // Replace with your name
    images: ['/og-default.png'],
  },
};
