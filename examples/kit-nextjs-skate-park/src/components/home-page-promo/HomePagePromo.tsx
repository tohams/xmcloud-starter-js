import React, { JSX } from 'react';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Header?: Field<string>;
  Subheader?: Field<string>;
  Title1?: Field<string>;
  Subtitle1?: Field<string>;
  Copy1?: Field<string>;
  Title2?: Field<string>;
  Subtitle2?: Field<string>;
  Copy2?: Field<string>;
  Title3?: Field<string>;
  Subtitle3?: Field<string>;
  Copy3?: Field<string>;
  Button?: LinkField;
}

type HomePagePromoProps = ComponentProps & {
  fields: Fields;
};

const Default = (props: HomePagePromoProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  const {
    Header,
    Subheader,
    Title1,
    Subtitle1,
    Copy1,
    Title2,
    Subtitle2,
    Copy2,
    Title3,
    Subtitle3,
    Copy3,
    Button,
  } = fields || {};

  // Check if component has any content
  const hasContent = !!(
    Header?.value ||
    Subheader?.value ||
    Title1?.value ||
    Button?.value?.href
  );

  if (!hasContent && !isEditing) {
    return (
      <div className={`component home-page-promo ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Home Page Promo</span>
        </div>
      </div>
    );
  }

  const columns = [
    { title: Title1, subtitle: Subtitle1, copy: Copy1 },
    { title: Title2, subtitle: Subtitle2, copy: Copy2 },
    { title: Title3, subtitle: Subtitle3, copy: Copy3 },
  ];

  return (
    <div className={`component home-page-promo ${styles || ''}`} id={id}>
      <div
        className="home-page-promo__container"
        style={{
          backgroundColor: '#c41230',
          width: '100%',
          padding: '60px 24px 80px',
        }}
      >
        <div
          style={{
            maxWidth: 1170,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {/* Header */}
          {(Header?.value || isEditing) && (
            <h2
              className="home-page-promo__header"
              style={{
                color: 'white',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 42,
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              <ContentSdkText field={Header} />
            </h2>
          )}

          {/* Subheader */}
          {(Subheader?.value || isEditing) && (
            <div
              className="home-page-promo__subheader"
              style={{
                color: 'white',
                fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                fontSize: 18,
                lineHeight: 1.6,
                marginBottom: 48,
                maxWidth: 1000,
              }}
            >
              <ContentSdkRichText field={Subheader} />
            </div>
          )}

          {/* Three Columns */}
          <div
            className="home-page-promo__columns"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 40,
              marginBottom: 48,
            }}
          >
            {columns.map((col, index) => {
              const hasColContent = col.title?.value || col.subtitle?.value || col.copy?.value;
              if (!hasColContent && !isEditing) return null;

              return (
                <div key={index} className="home-page-promo__column">
                  {/* Title (large number) */}
                  {(col.title?.value || isEditing) && (
                    <div
                      className="home-page-promo__title"
                      style={{
                        color: 'white',
                        fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                        fontSize: 48,
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: 8,
                      }}
                    >
                      <ContentSdkText field={col.title} />
                    </div>
                  )}

                  {/* Subtitle (bold text) */}
                  {(col.subtitle?.value || isEditing) && (
                    <div
                      className="home-page-promo__subtitle"
                      style={{
                        color: 'white',
                        fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        lineHeight: 1.4,
                        marginBottom: 12,
                      }}
                    >
                      <ContentSdkText field={col.subtitle} />
                    </div>
                  )}

                  {/* Copy */}
                  {(col.copy?.value || isEditing) && (
                    <div
                      className="home-page-promo__copy"
                      style={{
                        color: 'white',
                        fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: 1.6,
                      }}
                    >
                      <ContentSdkText field={col.copy} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Button */}
          {Button && (Button.value?.href || isEditing) && (
            <div
              className="home-page-promo__button-wrapper"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ContentSdkLink
                field={Button}
                style={{
                  display: 'inline-block',
                  padding: '16px 80px',
                  border: '2px solid white',
                  borderRadius: 50,
                  color: 'white',
                  fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  minWidth: 300,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Default;
