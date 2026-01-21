import React, { JSX } from 'react';
import {
  Text as ContentSdkText,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Field,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import './promo-row.css';

interface CardData {
  image?: ImageField;
  title?: Field<string>;
  copy?: Field<string>;
  link?: LinkField;
}

interface Fields {
  Image1: ImageField;
  Title1: Field<string>;
  Copy1: Field<string>;
  Link1: LinkField;
  Image2: ImageField;
  Title2: Field<string>;
  Copy2: Field<string>;
  Link2: LinkField;
  Image3: ImageField;
  Title3: Field<string>;
  Copy3: Field<string>;
  Link3: LinkField;
}

type PromoRowProps = ComponentProps & {
  fields: Fields;
};

const Default = (props: PromoRowProps): JSX.Element => {
  const { fields, params, page } = props;
  const { styles, RenderingIdentifier: id } = params || {};
  const isEditing = page?.mode?.isEditing ?? false;

  if (!fields) {
    return (
      <div className={`component promo-row ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Promo Row</span>
        </div>
      </div>
    );
  }

  const { Image1, Title1, Copy1, Link1, Image2, Title2, Copy2, Link2, Image3, Title3, Copy3, Link3 } =
    fields;

  // Build cards array
  const cards: CardData[] = [
    { image: Image1, title: Title1, copy: Copy1, link: Link1 },
    { image: Image2, title: Title2, copy: Copy2, link: Link2 },
    { image: Image3, title: Title3, copy: Copy3, link: Link3 },
  ];

  // Check if a card has content
  const hasCardContent = (card: CardData): boolean => {
    return !!(
      card.image?.value?.src ||
      card.title?.value ||
      card.copy?.value ||
      card.link?.value?.href
    );
  };

  const hasAnyContent = cards.some(hasCardContent);

  if (!hasAnyContent && !isEditing) {
    return (
      <div className={`component promo-row ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Promo Row</span>
        </div>
      </div>
    );
  }

  // Filter to only cards with content
  const visibleCards = isEditing ? cards : cards.filter(hasCardContent);

  return (
    <div
      className={`component promo-row ${styles || ''}`}
      id={id}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="promo-row__container"
        style={{
          width: '100%',
          maxWidth: 1170,
          padding: '32px 24px 60px 24px',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="promo-row__card-container"
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 8,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
          }}
        >
          <div
            className="promo-row__grid"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {visibleCards.map((card, index) => {
              const isLastCard = index === visibleCards.length - 1;

              const cardContent = (
                <div
                  className="promo-row__card"
                  style={{
                    backgroundColor: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                {/* Content */}
                <div
                  className="promo-row__card-content"
                  style={{
                    padding: '24px 32px 32px 32px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Image */}
                  {(card.image?.value?.src || isEditing) && (
                    <div
                      className="promo-row__card-image"
                      style={{
                        width: '100%',
                        maxWidth: 309,
                        aspectRatio: '309/206',
                        overflow: 'hidden',
                        marginBottom: 20,
                        borderRadius: 4,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <ContentSdkImage
                        field={card.image}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}
                  {/* Title */}
                  {(card.title?.value || isEditing) && (
                    <h3
                      className="promo-row__card-title"
                      style={{
                        color: '#1b1b1d',
                        fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                        fontSize: 22,
                        fontWeight: 700,
                        lineHeight: 1.3,
                        marginBottom: 12,
                      }}
                    >
                      <ContentSdkText field={card.title} />
                    </h3>
                  )}

                  {/* Copy */}
                  {(card.copy?.value || isEditing) && (
                    <p
                      className="promo-row__card-copy"
                      style={{
                        color: '#666',
                        fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                        fontSize: 15,
                        lineHeight: 1.6,
                        marginBottom: 16,
                        flex: 1,
                      }}
                    >
                      <ContentSdkText field={card.copy} />
                    </p>
                  )}

                    {/* Link - rendered as editable field in editing mode */}
                    {card.link && (card.link.value?.href || isEditing) && (
                      <ContentSdkLink
                        field={card.link}
                        className="promo-row__card-link"
                        style={{
                          color: '#c41230',
                          fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                          fontSize: 16,
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
              </div>
            );

              // Make entire card clickable if link exists and not in editing mode
            if (card.link?.value?.href && !isEditing) {
              return (
                <a
                  key={index}
                  href={card.link.value.href}
                  target={card.link.value.target}
                    rel={card.link.value.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className={`promo-row__card-wrapper ${!isLastCard ? 'promo-row__card-wrapper--has-divider' : ''}`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    flex: '1 1 242px',
                    minWidth: 242,
                    position: 'relative',
                  }}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div
                key={index}
                className={`promo-row__card-wrapper ${!isLastCard ? 'promo-row__card-wrapper--has-divider' : ''}`}
                style={{
                  flex: '1 1 242px',
                  minWidth: 242,
                  position: 'relative',
                }}
              >
                {cardContent}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
