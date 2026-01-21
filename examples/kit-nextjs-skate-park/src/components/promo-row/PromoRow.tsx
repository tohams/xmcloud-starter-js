import React, { JSX } from 'react';
import {
  Text as ContentSdkText,
  NextImage as ContentSdkImage,
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
  Image1?: ImageField;
  Title1?: Field<string>;
  Copy1?: Field<string>;
  Link1?: LinkField;
  Image2?: ImageField;
  Title2?: Field<string>;
  Copy2?: Field<string>;
  Link2?: LinkField;
  Image3?: ImageField;
  Title3?: Field<string>;
  Copy3?: Field<string>;
  Link3?: LinkField;
}

type PromoRowProps = ComponentProps & {
  fields: Fields;
};

const Default = (props: PromoRowProps): JSX.Element => {
  const { fields, params, page } = props;
  const { styles, RenderingIdentifier: id } = params || {};
  const isEditing = page?.mode?.isEditing ?? false;

  const {
    Image1,
    Title1,
    Copy1,
    Link1,
    Image2,
    Title2,
    Copy2,
    Link2,
    Image3,
    Title3,
    Copy3,
    Link3,
  } = fields || {};

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

  return (
    <div className={`component promo-row ${styles || ''}`} id={id}>
      <div
        className="promo-row__container"
        style={{
          width: '100%',
          padding: '60px 24px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          className="promo-row__grid"
          style={{
            maxWidth: 1170,
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}
        >
          {cards.map((card, index) => {
            if (!isEditing && !hasCardContent(card)) return null;

            const cardContent = (
              <div
                className="promo-row__card"
                style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'box-shadow 0.3s ease',
                  height: '100%',
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
                      aspectRatio: '16/10',
                      overflow: 'hidden',
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

                {/* Content */}
                <div
                  className="promo-row__card-content"
                  style={{
                    padding: 24,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
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

                  {/* Link */}
                  {card.link?.value?.href && !isEditing && (
                    <a
                      href={card.link.value.href}
                      className="promo-row__card-link"
                      target={card.link.value.target}
                      rel={
                        card.link.value.target === '_blank'
                          ? 'noopener noreferrer'
                          : undefined
                      }
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
                    >
                      <span>{card.link.value.text}</span>
                      <svg
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.5 1L6.5 6L1.5 11"
                          stroke="#c41230"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );

            // Make entire card clickable if link exists
            if (card.link?.value?.href && !isEditing) {
              return (
                <a
                  key={index}
                  href={card.link.value.href}
                  target={card.link.value.target}
                  rel={
                    card.link.value.target === '_blank'
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="promo-row__card-wrapper"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={index} className="promo-row__card-wrapper">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Default;
