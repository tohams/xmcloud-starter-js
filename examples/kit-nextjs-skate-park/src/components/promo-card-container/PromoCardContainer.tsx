import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import componentMap from '.sitecore/component-map';
import { AppPlaceholder } from "@sitecore-content-sdk/nextjs";

interface PromoCardContainerProps extends ComponentProps {
  params: ComponentProps["params"] & {
    DynamicPlaceholderId: string;
  };
}

const PromoCardContainer = ({
  params,
  rendering,
  page,
}: PromoCardContainerProps): JSX.Element => {
  const {
    styles,
    RenderingIdentifier: id,
    DynamicPlaceholderId,
  } = params || {};
  
  const phKey = `promo-cards-${DynamicPlaceholderId || '1'}`;

  return (
    <div className={`component promo-card-container-default ${styles || ''}`} id={id}>
      <div className="component-content">
        <div className="row">
          <div
            style={{
              width: '100%',
              maxWidth: 1170,
              padding: '32px 24px 60px 24px',
              boxSizing: 'border-box',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              justifyContent: 'center',
            }}
          >
            <AppPlaceholder
              name={phKey}
              rendering={rendering}
              page={page}
              componentMap={componentMap}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = ({ params, rendering, page }: PromoCardContainerProps): JSX.Element => {
  return <PromoCardContainer params={params} rendering={rendering} page={page} />;
};

export default Default;
