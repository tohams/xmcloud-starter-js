import React, { JSX } from 'react';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Field,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Header: Field<string>;
  Copy: Field<string>;
  Image: ImageField;
  Link: LinkField;
}

type WearRedPromoProps = ComponentProps & {
  fields: Fields;
};

const Default = (props: WearRedPromoProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  if (!fields) {
    return (
      <div className={`component wear-red-promo ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Wear Red Promo</span>
        </div>
      </div>
    );
  }

  const { Header, Copy, Image, Link } = fields;

  // Check if component has any content
  const hasContent = !!(Header?.value || Copy?.value || Image?.value?.src || Link?.value?.href);

  if (!hasContent && !isEditing) {
    return (
      <div className={`component wear-red-promo ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Wear Red Promo</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`component wear-red-promo ${styles || ''}`} id={id}>
      <div
        className="wear-red-promo__container"
        style={{
          width: '100%',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1170,
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'white',
            border: '15px solid #c41230',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1)',
            padding: '48px',
            display: 'flex',
            flexDirection: 'row',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* Left Content */}
          <div
            className="wear-red-promo__content"
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* Header */}
            {(Header?.value || isEditing) && (
              <h2
                className="wear-red-promo__header"
                style={{
                  color: '#1b1b1d',
                  fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                  fontSize: 32,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                <ContentSdkText field={Header} />
              </h2>
            )}

            {/* Copy */}
            {(Copy?.value || isEditing) && (
              <div
                className="wear-red-promo__copy"
                style={{
                  color: '#666',
                  fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                  fontSize: 16,
                  lineHeight: 1.6,
                  marginBottom: 32,
                }}
              >
                <ContentSdkRichText field={Copy} />
              </div>
            )}

            {/* Divider */}
            <div
              style={{
                width: 200,
                height: 1,
                backgroundColor: '#e5e5e5',
                marginBottom: 24,
              }}
            />

            {/* Link */}
            {(Link?.value?.href || isEditing) && (
              <ContentSdkLink
                field={Link}
                className="wear-red-promo__link"
                style={{
                  color: '#c41230',
                  fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  position: 'relative',
                }}
              />
            )}
          </div>

          {/* Right Image */}
          {(Image?.value?.src || isEditing) && (
            <div
              className="wear-red-promo__image"
              style={{
                flex: 1,
                minWidth: 0,
                maxWidth: 500,
              }}
            >
              <ContentSdkImage
                field={Image}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
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
