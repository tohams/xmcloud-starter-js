import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface CardData {
  icon?: ImageField;
  title?: Field<string>;
  copy?: Field<string>;
  link?: LinkField;
}

interface Fields {
  Icon1?: ImageField;
  Title1?: Field<string>;
  Copy1?: Field<string>;
  Link1?: LinkField;
  Icon2?: ImageField;
  Title2?: Field<string>;
  Copy2?: Field<string>;
  Link2?: LinkField;
  Icon3?: ImageField;
  Title3?: Field<string>;
  Copy3?: Field<string>;
  Link3?: LinkField;
  Icon4?: ImageField;
  Title4?: Field<string>;
  Copy4?: Field<string>;
  Link4?: LinkField;
}

type FlexCardsContainerProps = ComponentProps & {
  fields: Fields;
};

const Default = (props: FlexCardsContainerProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  // With default JSS shaping, fields come directly
  const {
    Icon1,
    Title1,
    Copy1,
    Link1,
    Icon2,
    Title2,
    Copy2,
    Link2,
    Icon3,
    Title3,
    Copy3,
    Link3,
    Icon4,
    Title4,
    Copy4,
    Link4,
  } = fields || {};

  // Build cards array from fields (no need for jsonValue extraction with default JSS)
  const cards: CardData[] = [
    {
      icon: Icon1,
      title: Title1,
      copy: Copy1,
      link: Link1,
    },
    {
      icon: Icon2,
      title: Title2,
      copy: Copy2,
      link: Link2,
    },
    {
      icon: Icon3,
      title: Title3,
      copy: Copy3,
      link: Link3,
    },
    {
      icon: Icon4,
      title: Title4,
      copy: Copy4,
      link: Link4,
    },
  ];

  // Helper to check if a card has any content
  const hasCardContent = (card: CardData): boolean => {
    return !!(
      card.icon?.value?.src ||
      card.title?.value ||
      card.copy?.value ||
      card.link?.value?.href
    );
  };

  // Check if any cards have content
  const hasAnyContent = cards.some(hasCardContent);

  if (!hasAnyContent && !isEditing) {
    return (
      <div className={`component flex-cards-container ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Flex Cards Container</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`component flex-cards-container ${styles || ''}`} id={id}>
      <div className="component-content py-16 mt-16">
        <div className="container mx-auto px-4 max-w-6xl" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {cards.map((card, index) => {
              // In editing mode, show all cards. In preview/live, only show cards with content
              if (!isEditing && !hasCardContent(card)) {
                return null;
              }

              const cardContent = (
                <div className="flex-card bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-start w-full h-full cursor-pointer">
                  {/* Icon with red circle background */}
                  {card.icon && (card.icon.value?.src || isEditing) && (
                    <div className="flex-card__icon-wrapper mb-6 w-[50px] h-[50px] bg-red-600 rounded-full flex items-center justify-center">
                      <ContentSdkImage
                        field={card.icon}
                        className="flex-card__icon"
                        width={30}
                        height={30}
                        unoptimized={card.icon.value?.src?.endsWith('.svg')}
                      />
                    </div>
                  )}

                  {/* Title - 24px font */}
                  {card.title && (card.title.value || isEditing) && (
                    <h3 className="flex-card__title font-bold mb-4 text-gray-900 leading-tight text-left" style={{ fontSize: '24px' }}>
                      <ContentSdkText field={card.title} />
                    </h3>
                  )}

                  {/* Copy - 16px font */}
                  {card.copy && (card.copy.value || isEditing) && (
                    <p className="flex-card__copy text-gray-600 leading-relaxed text-left" style={{ fontSize: '16px' }}>
                      <ContentSdkText field={card.copy} />
                    </p>
                  )}
                </div>
              );

              // Wrap entire card in link if link exists (no visible link text)
              if (card.link?.value?.href && !isEditing) {
                return (
                  <a
                    key={index}
                    href={card.link.value.href}
                    className="w-full block no-underline"
                    target={card.link.value.target}
                    rel={card.link.value.target === '_blank' ? 'noopener noreferrer' : undefined}
                  >
                    {cardContent}
                  </a>
                );
              }

              // In editing mode or no link, just show card
              return <div key={index} className="w-full">{cardContent}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
