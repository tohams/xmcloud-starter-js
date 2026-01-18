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

interface FlexCardContainerFields {
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

type FlexCardContainerProps = ComponentProps & {
  fields: {
    data?: {
      datasource?: FlexCardContainerFields;
    };
  };
};

const Default = (props: FlexCardContainerProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  // Debug everything
  console.log('FlexCardContainer FULL DEBUG:', {
    props,
    fields,
    params,
    rendering: props.rendering,
    hasRendering: !!props.rendering,
  });

  // Safe destructuring with fallbacks
  const { data } = fields || {};
  const { datasource } = data || {};

  // If no datasource data, show placeholder in editing mode or use mock data
  if (!datasource) {
    // In editing mode, show helpful message
    if (isEditing) {
      return (
        <div className={`component flex-card-container ${styles || ''}`} id={id}>
          <div className="component-content">
            <div style={{ padding: '20px', background: '#f5f5f5', border: '2px dashed #ccc' }}>
              <h3 style={{ marginTop: 0 }}>Flex Card Container</h3>
              <p><strong>Status:</strong> Waiting for template deployment</p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                The template fields need to be deployed to XM Cloud, then you can fill in the content.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    // For non-editing mode, show nothing
    return (
      <div className={`component flex-card-container ${styles || ''}`} id={id}>
        <div className="component-content"></div>
      </div>
    );
  }

  // Build cards array from the denormalized fields
  const cards = [
    {
      icon: datasource.Icon1?.jsonValue,
      title: datasource.Title1?.jsonValue,
      copy: datasource.Copy1?.jsonValue,
      link: datasource.Link1?.jsonValue,
    },
    {
      icon: datasource.Icon2?.jsonValue,
      title: datasource.Title2?.jsonValue,
      copy: datasource.Copy2?.jsonValue,
      link: datasource.Link2?.jsonValue,
    },
    {
      icon: datasource.Icon3?.jsonValue,
      title: datasource.Title3?.jsonValue,
      copy: datasource.Copy3?.jsonValue,
      link: datasource.Link3?.jsonValue,
    },
    {
      icon: datasource.Icon4?.jsonValue,
      title: datasource.Title4?.jsonValue,
      copy: datasource.Copy4?.jsonValue,
      link: datasource.Link4?.jsonValue,
    },
  ];

  // Group cards into pairs (2 cards per wrapper div)
  const cardPairs = [
    [cards[0], cards[1]],
    [cards[2], cards[3]],
  ];

  const renderCard = (card: typeof cards[0], index: number) => {
    const { icon: iconField, title: titleField, copy: copyField, link: linkField } = card;

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
