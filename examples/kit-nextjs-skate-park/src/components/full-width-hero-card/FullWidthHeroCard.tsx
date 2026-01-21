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
  Logo: ImageField;
  Title: Field<string>;
  Subheading: Field<string>;
  DonateOnceLink: LinkField;
  DonateMonthlyLink: LinkField;
  HeroImage: ImageField;
}

type FullWidthHeroCardProps = ComponentProps & {
  fields: Fields;
};

const Default = (props: FullWidthHeroCardProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  if (!fields) {
    return (
      <div className={`component full-width-hero-card ${styles || ''}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Full Width Hero Card</span>
        </div>
      </div>
    );
  }

  const { Logo, Title, Subheading, DonateOnceLink, DonateMonthlyLink, HeroImage } = fields;

  return (
    <div className={`component full-width-hero-card ${styles || ''}`} id={id}>
      <div className="component-content">
        <div className="full-width-hero-card">
          <div className="full-width-hero-card__container container">
            <div className="full-width-hero-card__logo">
              {(Logo?.value?.src || isEditing) && (
                <ContentSdkImage
                  field={Logo}
                  className="full-width-hero-card__icon"
                  width={typeof Logo?.value?.width === 'number' ? Logo.value.width : 200}
                  height={typeof Logo?.value?.height === 'number' ? Logo.value.height : 200}
                  unoptimized={Logo?.value?.src?.endsWith('.svg')}
                />
              )}
              <span>American Heart Association</span>
            </div>
            {(Title?.value || isEditing) && (
              <h1 className="full-width-hero-card__title">
                <ContentSdkRichText field={Title} />
              </h1>
            )}
            <div className="full-width-hero-card__content">
              <div className="full-width-hero-card__body-content">
                <div className="full-width-hero-card__cta">
                  {(Subheading?.value || isEditing) && (
                    <div className="full-width-hero-card__subheading">
                      <ContentSdkRichText field={Subheading} />
                    </div>
                  )}
                  <div className="full-width-hero-card__btns">
                    {(DonateOnceLink?.value?.href || isEditing) && (
                      <ContentSdkLink
                        field={DonateOnceLink}
                        className="btn btn-round btn-outline-primary col h-theme--red"
                      >
                        Donate Once
                      </ContentSdkLink>
                    )}
                    {(DonateMonthlyLink?.value?.href || isEditing) && (
                      <ContentSdkLink
                        field={DonateMonthlyLink}
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
                  {(HeroImage?.value?.src || isEditing) && (
                    <ContentSdkImage
                      field={HeroImage}
                      className="is-loaded"
                      width={
                        typeof HeroImage?.value?.width === 'number' ? HeroImage.value.width : 1200
                      }
                      height={
                        typeof HeroImage?.value?.height === 'number' ? HeroImage.value.height : 800
                      }
                      unoptimized={HeroImage?.value?.src?.endsWith('.svg')}
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
