import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import componentMap from '.sitecore/component-map';
import { AppPlaceholder } from "@sitecore-content-sdk/nextjs";

type PromoCardContainerProps = ComponentProps & {
  params: ComponentProps["params"] & {
    DynamicPlaceholderId: string;
  };
};

const Default = ({ params, rendering, page }: PromoCardContainerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = params || {};
  const phKey = `promo-cards-${DynamicPlaceholderId}`;

  return (
    <div className={`component promo-card-container ${styles || ''}`} id={id}>
      <div
        className="promo-card-container__wrapper"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className="promo-card-container__inner"
          style={{
            width: '100%',
            maxWidth: 1170,
            padding: '32px 24px 60px 24px',
            boxSizing: 'border-box',
          }}
        >
          <div
            className="promo-card-container__grid"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
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

export default Default;
