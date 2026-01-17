import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface FlexCardFields {
  Icon?: {
    jsonValue?: ImageField;
  };
  Title?: {
    jsonValue?: Field<string>;
  };
  Copy?: {
    jsonValue?: Field<string>;
  };
  Link?: {
    jsonValue?: LinkField;
  };
}

type FlexCardContainerProps = ComponentProps & {
  fields: {
    data?: {
      datasource?: {
        children?: {
          results?: FlexCardFields[];
        };
      };
    };
  };
};

const Default = (props: FlexCardContainerProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  // Safe destructuring with fallbacks
  const { data } = fields || {};
  const { datasource } = data || {};
  const { children } = datasource || {};
  const flexCards = children?.results || [];

  if (!flexCards.length && !isEditing) {
    return (
      <div className={`component flex-card-container ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Flex Card Container</span>
        </div>
      </div>
    );
  }

  // Group cards into pairs (2 cards per wrapper div)
  const cardPairs: FlexCardFields[][] = [];
  for (let i = 0; i < flexCards.length; i += 2) {
    cardPairs.push(flexCards.slice(i, i + 2));
  }

  const renderCard = (card: FlexCardFields, index: number) => {
    // Safe destructuring with fallbacks
    const { Icon, Title, Copy, Link } = card || {};
    const iconField = Icon?.jsonValue;
    const titleField = Title?.jsonValue;
    const copyField = Copy?.jsonValue;
    const linkField = Link?.jsonValue;

    // Check if card has content or we're in editing mode
    const hasContent =
      iconField?.value?.src ||
      titleField?.value ||
      copyField?.value ||
      linkField?.value?.href;

    if (!hasContent && !isEditing) {
      return null;
    }

    return (
      <li key={index} className="flex-card-grid--item">
        {(linkField?.value?.href || isEditing) && linkField ? (
          <ContentSdkLink
            field={linkField}
            className="flex-card-grid--link white-100 card-drop-shadow"
          >
            <div className="flex-card-grid--content">
              {iconField && (iconField.value?.src || isEditing) && (
                <div className="flex-card-grid--icon-holder flex-card-grid--icon-holder--red">
                  <ContentSdkImage
                    field={iconField}
                    className="flex-card-grid--icon"
                    width={22}
                    height={30}
                    unoptimized={iconField.value?.src?.endsWith('.svg')}
                  />
                </div>
              )}
              {titleField && (titleField.value || isEditing) && (
                <h2 className="flex-card-grid--title">
                  <Text field={titleField} />
                </h2>
              )}
              {copyField && (copyField.value || isEditing) && (
                <p className="flex-card-grid--copy">
                  <Text field={copyField} />
                </p>
              )}
            </div>
          </ContentSdkLink>
        ) : (
          <div className="flex-card-grid--link white-100 card-drop-shadow">
            <div className="flex-card-grid--content">
              {iconField && (iconField.value?.src || isEditing) && (
                <div className="flex-card-grid--icon-holder flex-card-grid--icon-holder--red">
                  <ContentSdkImage
                    field={iconField}
                    className="flex-card-grid--icon"
                    width={22}
                    height={30}
                    unoptimized={iconField.value?.src?.endsWith('.svg')}
                  />
                </div>
              )}
              {titleField && (titleField.value || isEditing) && (
                <h2 className="flex-card-grid--title">
                  <Text field={titleField} />
                </h2>
              )}
              {copyField && (copyField.value || isEditing) && (
                <p className="flex-card-grid--copy">
                  <Text field={copyField} />
                </p>
              )}
            </div>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className={`component flex-card-container ${styles || ''}`} id={id}>
      <div className="component-content">
        <div className="container container-fluid">
          <div className="flex-card-container--wrapper">
            {cardPairs.map((pair, pairIndex) => (
              <div key={pairIndex} className="flex-card-pair">
                <ul className="flex-card-grid">
                  {pair.map((card, cardIndex) => renderCard(card, pairIndex * 2 + cardIndex))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
