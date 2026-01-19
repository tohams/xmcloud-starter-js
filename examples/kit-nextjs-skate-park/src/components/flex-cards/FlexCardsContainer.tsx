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
  Icon1?: { jsonValue?: ImageField };
  Title1?: { jsonValue?: Field<string> };
  Copy1?: { jsonValue?: Field<string> };
  Link1?: { jsonValue?: LinkField };
  Icon2?: { jsonValue?: ImageField };
  Title2?: { jsonValue?: Field<string> };
  Copy2?: { jsonValue?: Field<string> };
  Link2?: { jsonValue?: LinkField };
  Icon3?: { jsonValue?: ImageField };
  Title3?: { jsonValue?: Field<string> };
  Copy3?: { jsonValue?: Field<string> };
  Link3?: { jsonValue?: LinkField };
  Icon4?: { jsonValue?: ImageField };
  Title4?: { jsonValue?: Field<string> };
  Copy4?: { jsonValue?: Field<string> };
  Link4?: { jsonValue?: LinkField };
}

type FlexCardsContainerProps = ComponentProps & {
  fields: {
    data?: {
      datasource?: Fields;
    };
  };
};

const Default = (props: FlexCardsContainerProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  // Safe destructuring with fallbacks
  const { data } = fields || {};
  const { datasource } = data || {};

  // Debug logging
  console.log('FlexCardsContainer DEBUG:', {
    'rendering.dataSource': props.rendering?.dataSource,
    'hasFields': !!fields,
    'hasData': !!data,
    'hasDatasource': !!datasource,
    'datasourceKeys': datasource ? Object.keys(datasource) : 'none',
  });

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
  } = (datasource || {}) as Fields;

  // Extract jsonValue fields
  const cards: CardData[] = [
    {
      icon: Icon1?.jsonValue,
      title: Title1?.jsonValue,
      copy: Copy1?.jsonValue,
      link: Link1?.jsonValue,
    },
    {
      icon: Icon2?.jsonValue,
      title: Title2?.jsonValue,
      copy: Copy2?.jsonValue,
      link: Link2?.jsonValue,
    },
    {
      icon: Icon3?.jsonValue,
      title: Title3?.jsonValue,
      copy: Copy3?.jsonValue,
      link: Link3?.jsonValue,
    },
    {
      icon: Icon4?.jsonValue,
      title: Title4?.jsonValue,
      copy: Copy4?.jsonValue,
      link: Link4?.jsonValue,
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

  if (!datasource && !isEditing) {
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
      <div className="component-content">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
              // In editing mode, show all cards. In preview/live, only show cards with content
              if (!isEditing && !hasCardContent(card)) {
                return null;
              }

              return (
                <div
                  key={index}
                  className="flex-card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center"
                  style={{ width: '262.5px', minHeight: '320px' }}
                >
                  {/* Icon */}
                  {card.icon && (card.icon.value?.src || isEditing) && (
                    <div className="mb-4">
                      <ContentSdkImage
                        field={card.icon}
                        className="flex-card__icon"
                        width={22}
                        height={30}
                        unoptimized={card.icon.value?.src?.endsWith('.svg')}
                      />
                    </div>
                  )}

                  {/* Title */}
                  {card.title && (card.title.value || isEditing) && (
                    <h3 className="flex-card__title text-xl font-bold mb-3">
                      <ContentSdkText field={card.title} />
                    </h3>
                  )}

                  {/* Copy */}
                  {card.copy && (card.copy.value || isEditing) && (
                    <p className="flex-card__copy text-sm text-gray-600 mb-4 flex-grow">
                      <ContentSdkText field={card.copy} />
                    </p>
                  )}

                  {/* Link */}
                  {card.link && (card.link.value?.href || isEditing) && (
                    <div className="mt-auto">
                      <ContentSdkLink
                        field={card.link}
                        className="flex-card__link text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                      />
                    </div>
                  )}
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
