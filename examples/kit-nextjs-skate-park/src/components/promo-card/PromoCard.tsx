import React, { JSX } from 'react';
import {
  Text as ContentSdkText,
  Link as ContentSdkLink,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  // Field names may vary - using common patterns
  heading?: Field<string>; // May be called "Text" or "heading"
  description?: Field<string>; // May be called "Text 2" or "description"
  link?: LinkField; // Link field
  // Additional fields that may exist but we don't use:
  // image, text3, image2
}

type PromoCardProps = ComponentProps & {
  fields: Fields;
};

const Default = (props: PromoCardProps): JSX.Element => {
  const { fields, params, page } = props;
  const { styles, RenderingIdentifier: id } = params || {};
  const isEditing = page?.mode?.isEditing ?? false;

  if (!fields) {
    return (
      <div className={`component promo-card ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Promo Card</span>
        </div>
      </div>
    );
  }

  // Try multiple possible field name variations
  const title = fields.heading || (fields as any).text || (fields as any).Title;
  const copy = fields.description || (fields as any).text2 || (fields as any).Text2 || (fields as any).Copy;
  const link = fields.link || (fields as any).Link;

  const hasContent = !!(title?.value || copy?.value || link?.value?.href);

  if (!hasContent && !isEditing) {
    return (
      <div className={`component promo-card ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Promo Card</span>
        </div>
      </div>
    );
  }

  const cardContent = (
    <div
      className="promo-card__content"
      style={{
        backgroundColor: 'white',
        border: '15px solid #c41230',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1)',
        padding: '48px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title */}
      {(title?.value || isEditing) && (
        <h3
          className="promo-card__title"
          style={{
            color: '#1b1b1d',
            fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          <ContentSdkText field={title} />
        </h3>
      )}

      {/* Copy */}
      {(copy?.value || isEditing) && (
        <p
          className="promo-card__copy"
          style={{
            color: '#666',
            fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
            fontSize: 16,
            lineHeight: 1.6,
            marginBottom: 32,
            flex: 1,
          }}
        >
          <ContentSdkText field={copy} />
        </p>
      )}

      {/* Link - only rendered in editing mode (when card is not wrapped in <a>) */}
      {link && isEditing && (
        <ContentSdkLink
          field={link}
          className="promo-card__link"
          style={{
            color: '#c41230',
            fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
            fontSize: 18,
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 'auto',
          }}
        />
      )}
    </div>
  );

  // Make entire card clickable if link exists and not in editing mode
  if (link?.value?.href && !isEditing) {
    return (
      <div className={`component promo-card ${styles || ''}`} id={id}>
        <a
          href={link.value.href}
          target={link.value.target}
          rel={link.value.target === '_blank' ? 'noopener noreferrer' : undefined}
          style={{
            textDecoration: 'none',
            display: 'block',
            height: '100%',
          }}
        >
          {cardContent}
        </a>
      </div>
    );
  }

  return (
    <div className={`component promo-card ${styles || ''}`} id={id}>
      {cardContent}
    </div>
  );
};

export default Default;
