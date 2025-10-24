import { FC } from 'react';

type JsonLdProps = {
  data: object;
};

export const JsonLd: FC<JsonLdProps> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
