import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Logo?: {
    jsonValue?: ImageField;
  };
  Title?: {
    jsonValue?: Field<string>;
  };
  Subheading?: {
    jsonValue?: Field<string>;
  };
  DonateOnceLink?: {
    jsonValue?: LinkField;
  };
  DonateMonthlyLink?: {
    jsonValue?: LinkField;
  };
  HeroImage?: {
    jsonValue?: ImageField;
  };
}

type FullWidthHeroCardProps = ComponentProps & {
  fields: {
    data?: {
      datasource?: Fields;
    };
  };
};

const Default = (props: FullWidthHeroCardProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  // Safe destructuring with fallbacks
  const { data } = fields || {};
  const { datasource } = data || {};
  
  // Debug
  console.log('FullWidthHeroCard DEBUG:', {
    'hasFields': !!fields,
    'hasData': !!data,
    'hasDatasource': !!datasource,
    'datasourceKeys': datasource ? Object.keys(datasource) : 'none'
  });
  const {
    Logo,
    Title,
    Subheading,
    DonateOnceLink,
    DonateMonthlyLink,
    HeroImage,
  } = (datasource || {}) as Fields;
  
  // Extract jsonValue from Integrated GraphQL structure
  const logoField = Logo?.jsonValue;
  const titleField = Title?.jsonValue;
  const subheadingField = Subheading?.jsonValue;
  const donateOnceLinkField = DonateOnceLink?.jsonValue;
  const donateMonthlyLinkField = DonateMonthlyLink?.jsonValue;
  const heroImageField = HeroImage?.jsonValue;

  // Debug logging - remove after debugging
  if (typeof window !== 'undefined') {
    console.log('FullWidthHeroCard Debug:', {
      hasDatasource: !!datasource,
      datasource,
      Logo,
      Title,
      Subheading,
      DonateOnceLink,
      DonateMonthlyLink,
      HeroImage,
      logoField,
      titleField,
      subheadingField,
    });
  }

  if (!datasource && !isEditing) {
    return (
      <div className={`component full-width-hero-card ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Full Width Hero Card</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`component full-width-hero-card ${styles || ''}`} id={id}>
      <div className="component-content">
        <div className="full-width-hero-card">
          <div className="full-width-hero-card__container container">
            <div className="full-width-hero-card__logo">
              {logoField && (logoField.value?.src || isEditing) && (
                <ContentSdkImage 
                  field={logoField} 
                  className="full-width-hero-card__icon"
                  width={typeof logoField.value?.width === 'number' ? logoField.value.width : 200}
                  height={typeof logoField.value?.height === 'number' ? logoField.value.height : 200}
                  unoptimized={logoField.value?.src?.endsWith('.svg')}
                />
              )}
              <span>American Heart Association</span>
            </div>
            {titleField && (titleField.value || isEditing) && (
              <h1 className="full-width-hero-card__title">
                <ContentSdkRichText field={titleField} />
              </h1>
            )}
            <div className="full-width-hero-card__content">
              <div className="full-width-hero-card__body-content">
                <div className="full-width-hero-card__cta">
                  {subheadingField && (subheadingField.value || isEditing) && (
                    <div className="full-width-hero-card__subheading">
                      <ContentSdkRichText field={subheadingField} />
                    </div>
                  )}
                  <div className="full-width-hero-card__btns">
                    {donateOnceLinkField && (donateOnceLinkField.value?.href || isEditing) && (
                      <ContentSdkLink
                        field={donateOnceLinkField}
                        className="btn btn-round btn-outline-primary col h-theme--red"
                      >
                        Donate Once
                      </ContentSdkLink>
                    )}
                    {donateMonthlyLinkField && (donateMonthlyLinkField.value?.href || isEditing) && (
                      <ContentSdkLink
                        field={donateMonthlyLinkField}
                        className="btn btn-round btn-outline-primary col h-theme--red"
                      >
                        Donate Monthly
                      </ContentSdkLink>
                    )}
                  </div>
                </div>
              </div>
              <div className="full-width-hero-card__img">
                <div>
                  {heroImageField && (heroImageField.value?.src || isEditing) && (
                    <ContentSdkImage 
                      field={heroImageField} 
                      className="is-loaded"
                      width={typeof heroImageField.value?.width === 'number' ? heroImageField.value.width : 1200}
                      height={typeof heroImageField.value?.height === 'number' ? heroImageField.value.height : 800}
                      unoptimized={heroImageField.value?.src?.endsWith('.svg')}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
