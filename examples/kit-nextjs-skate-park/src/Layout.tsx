import React, { JSX } from "react";
import { Field, Page } from "@sitecore-content-sdk/nextjs";
import Scripts from "src/Scripts";
import SitecoreStyles from "components/content-sdk/SitecoreStyles";
import { DesignLibraryApp } from "@sitecore-content-sdk/nextjs";
import { AppPlaceholder } from "@sitecore-content-sdk/nextjs";
import componentMap from ".sitecore/component-map";

interface LayoutProps {
  page: Page;
}

export interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const UTILITY_LINKS = [
  {
    label: "Heart Attack and Stroke Symptoms",
    href: "/en/about-us/heart-attack-and-stroke-symptoms",
    isRed: true,
  },
  { label: "Volunteer", href: "/en/volunteer", isRed: false },
  { label: "Learn CPR", href: "https://cpr.heart.org/en/", isRed: false },
  {
    label: "ShopHeart",
    href: "https://www.shopheart.org/?utm_source=heart.org&utm_medium=Referral&utm_campaign=AHA-Parent-Site-Top-Nav-Desktop",
    isRed: false,
  },
];

const MAIN_NAV_ITEMS = [
  {
    id: "aba6cb402d334e468589ccaf32e09ff6",
    label: "Healthy Living",
    href: "/en/healthy-living",
    items: [
      "Healthy Eating",
      "Healthy Lifestyle",
      "Fitness",
      "Pets and Your Health",
      "Stress Management",
    ],
  },
  {
    id: "f35a4c51b9654fde9f4819e07e00e947",
    label: "Health Topics",
    href: "/en/health-topics",
    items: [
      "Heart Attack",
      "Stroke",
      "High Blood Pressure",
      "Cholesterol",
      "Heart Failure",
      "Diabetes",
    ],
  },
  {
    id: "fb18b5a08fbd412a8491ab790f165fe2",
    label: "Professionals",
    href: "/en/professional",
    items: [
      "Professional Heart Daily",
      "Guidelines & Statements",
      "Journals",
      "Science News",
      "Quality Improvement",
    ],
  },
  {
    id: "86b943465e064abda6ae8b0fc118203f",
    label: "Get Involved",
    href: "/en/get-involved",
    items: ["Volunteer", "Find an Event Near You", "Advocate", "Go Red for Women"],
  },
  {
    id: "a157f473eaf9441da87038da8a1e7ae1",
    label: "Ways to Give",
    href: "/en/get-involved/ways-to-give",
    items: ["Donate Once", "Donate Monthly", "Planned Giving", "Raise Your Way"],
  },
  {
    id: "fb81e164472447da838965259cf2de1b",
    label: "About Us",
    href: "/en/about-us",
    items: ["Our Mission", "Our Impact", "News and Stories", "Careers", "Contact Us"],
  },
  {
    id: "c8d154d959084bca90b55a08aaf9f4db",
    label: "Learn CPR",
    href: "https://cpr.heart.org/en/",
    items: ["CPR and First Aid", "Find A Course", "Find A Training Center"],
  },
];

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const mainClassPageEditing = mode.isEditing ? "editing-mode" : "prod-mode";

  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        {mode.isDesignLibrary ? (
          route && (
            <DesignLibraryApp
              page={page}
              rendering={route}
              componentMap={componentMap}
              loadServerImportMap={() => import(".sitecore/import-map.server")}
            />
          )
        ) : (
          <>
            <header role="banner" aria-label="Defaut Layout" className="l-header">
              <a href="#main-content" className="c-skip-to sr-only">
                Skip to main content
              </a>
              <div className="l-header__utility__desktop">
                <div className="container container-fluid container-wide">
                  <nav aria-label="Site Navigation" className="c-utility-bar">
                    <ul className="c-utility-bar__main-ul">
                      {UTILITY_LINKS.map((link) => (
                        <li key={link.label} className="c-top-nav__item">
                          <a
                            href={link.href}
                            className={`c-top-nav__link c-cta c-cta--icon ${link.isRed ? "h-theme--red" : ""}`}
                          >
                            <span className="c-underline-link">{link.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="l-header__top l-header__top-meganav">
                <div className="container container-fluid container-wide">
                  <div className="c-top_meganav">
                    <nav
                      role="navigation"
                      aria-label="Top Navigation"
                      className="c-top-nav js-mobile-nav-positioning"
                    >
                      <div>
                        <button aria-label="Menu" aria-expanded="false" className="c-top-nav__menu-trigger">
                          <span className="c-top-nav__hamburger">
                            <span>Menu</span>
                          </span>
                        </button>
                        <div className="c-mobile-nav">
                          <div id="mobile-navigation___BV_modal_outer__demo">
                            <div
                              id="mobile-navigation_demo"
                              aria-hidden="true"
                              role="mobile-navigation"
                              aria-label="Mobile Navigation"
                              className="modal fade"
                              style={{ display: "none" }}
                            >
                              <div className="modal-dialog modal-md">
                                <div tabIndex={-1} role="document" className="modal-content">
                                  <div className="modal-body">
                                    <button className="c-top-nav__menu-trigger">
                                      <span className="c-top-nav__hamburger"></span>
                                      <span>Close Menu</span>
                                    </button>
                                    <ul className="c-mobile-nav__list">
                                      <li className="m-3"></li>
                                      {MAIN_NAV_ITEMS.map((item) => (
                                        <li key={item.id}>
                                          <button
                                            className="c-mobile-nav__list-item btn btn-link-plain btn--select c-cta--icon collapsed"
                                            aria-controls={item.id}
                                            aria-expanded="false"
                                          >
                                            <span>{item.label}</span>
                                          </button>
                                          <div id={item.id} className="collapse" style={{ display: "none" }}>
                                            <ul className="c-mobile-nav__sub-list nav flex-column">
                                              <li className="nav-item">
                                                <a href={item.href} className="c-mobile-nav__header h-color--gray-dark">
                                                  {item.label}
                                                </a>
                                              </li>
                                              {item.items?.map((subItem) => (
                                                <li key={subItem} className="nav-item">
                                                  <a href={item.href} className="nav-item h-color--gray-dark">
                                                    {subItem}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a href="https://www.heart.org/en/" className="c-top-nav__logo does-fade-out">
                        <img
                          src="/AHA_Full.svg"
                          alt="American Heart Association heart and torch logo"
                          height="256"
                          width="426"
                        />
                        <div className="sticky__logo">
                          <img
                            src="/AHA_Full.svg"
                            alt="American Heart Association"
                            style={{ display: "block", opacity: 0 }}
                          />
                        </div>
                      </a>
                      <ul className="c-top-nav__nav nav">
                        <li className="c-top-nav__item">
                          <div className="meganav-search coveo-search-section search-input-animation">
                            <div className="coveo-for-sitecore-search-box-container">
                              <div className="CoveoSearchbox">
                                <div className="CoveoOmnibox magic-box" role="search">
                                  <div className="magic-box-input">
                                    <input
                                      autoComplete="off"
                                      type="text"
                                      aria-label="Search input field"
                                      placeholder="Type to search..."
                                    />
                                  </div>
                                  <a className="CoveoSearchButton" role="button" aria-label="Search" tabIndex={0}>
                                    <span className="coveo-search-button">
                                      <svg viewBox="0 0 20 20" aria-hidden="true">
                                        <path
                                          className="coveo-magnifier-circle-svg"
                                          d="m8.368 16.736c-4.614 0-8.368-3.754-8.368-8.368s3.754-8.368 8.368-8.368 8.368 3.754 8.368 8.368-3.754 8.368-8.368 8.368m0-14.161c-3.195 0-5.793 2.599-5.793 5.793s2.599 5.793 5.793 5.793 5.793-2.599 5.793-5.793-2.599-5.793-5.793-5.793"
                                        ></path>
                                        <path d="m18.713 20c-.329 0-.659-.126-.91-.377l-4.552-4.551c-.503-.503-.503-1.318 0-1.82.503-.503 1.318-.503 1.82 0l4.552 4.551c.503.503.503 1.318 0 1.82-.252.251-.581.377-.91.377"></path>
                                      </svg>
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="c-top-nav__item">
                          <a role="button" href="https://mygiving.heart.org/-/XXRCJWZY" className="btn btn-round btn-primary">
                            <span>Donate Once</span>
                          </a>
                        </li>
                        <li className="c-top-nav__item">
                          <a
                            role="button"
                            href="https://mygiving.heart.org/-/XELREEAX?s_subsrc=global_nav"
                            className="btn btn-round btn-outline-primary"
                          >
                            <span>Donate Monthly</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="l-header__main">
                <div className="container container-fluid container-wide">
                  <nav role="navigation" aria-label="Main Navigation" className="c-main-nav">
                    <ul className="mr-auto">
                      {MAIN_NAV_ITEMS.map((item) => (
                        <li key={item.id} id={item.id} data-aha-nav="" className="c-main-nav__item c-mega-nav">
                          <div className="c-nav-dropdown__container">
                            <button
                              aria-haspopup="true"
                              aria-expanded="false"
                              className="c-top-nav__link c-cta c-cta--icon c-underline-nav-link dropdown-toggle"
                            >
                              <span className="c-underline-link">{item.label}</span>
                            </button>
                            <div className="c-nav-dropdown dropdown-menu">
                              <div className="container container-fluid container-wide layout-1">
                                <a href={item.href} className="c-mega-nav__dropdown-header mb-2">
                                  {item.label}
                                </a>
                                <ul className="c-mega-nav__container d-block">
                                  <div className="flex-container">
                                    <div className="column">
                                      <li>
                                        <ul className="c-mega-nav__links c-mega-nav__links--columns mb-4">
                                          {item.items?.map((subItem) => (
                                            <li key={subItem}>
                                              <a href={item.href} className="c-mega-nav__link">
                                                {subItem}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    </div>
                                  </div>
                                </ul>
                              </div>
                              <span className="c-nav-dropdown__arrow"></span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <ul>
                      <li className="c-main-nav__item">
                        <div name="location-selector">
                          <div>
                            <div className="c-nav-dropdown__container">
                              <button
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                className="c-top-nav__link c-cta dropdown-toggle"
                              >
                                <span className="c-underline-link">In Your Community</span>
                              </button>
                              <div role="dialog" className="c-nav-dropdown dropdown-menu">
                                <form noValidate className="location-search">
                                  <div className="location-search__fields">
                                    <div className="form-group">
                                      <label htmlFor="zipcode_94">Zip Code</label>
                                      <input
                                        name="zipcode"
                                        type="text"
                                        pattern="^\\d{5}(?:[-\\s]\\d{4})?$"
                                        placeholder="Zip Code"
                                        className="form-control"
                                        id="zipcode_94"
                                      />
                                    </div>
                                    <span className="location-search__or">or</span>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <div id="State" className="pb-2">
                                          State
                                        </div>
                                        <div className="c-select-dropdown__container position-static">
                                          <button
                                            type="button"
                                            role="listbox"
                                            aria-labelledby="State"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            className="c-search-group__dropdown btn btn-white btn--select mx-0 w-100"
                                          >
                                            State
                                          </button>
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                  <button disabled type="submit" className="location-search__search btn btn-tertiary btn-round">
                                    Search
                                  </button>
                                </form>
                                <span className="c-nav-dropdown__arrow"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="l-header__utility">
                <nav aria-label="Mobile Utility Navigation" className="container container-fluid">
                  <ul className="c-utility-nav nav">
                    <li>
                      <a href="/en/about-us/heart-attack-and-stroke-symptoms" className="c-cta c-cta--icon h-color--red">
                        Heart Attack and Stroke Symptoms
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="l-header__utility">
                <nav aria-label="Mobile Utility Navigation" className="container container-fluid">
                  <ul className="c-utility-nav nav">
                    <li>
                      <a href="https://cpr.heart.org/en/" className="c-cta c-cta--icon h-color--gray-dark">
                        Learn CPR
                      </a>
                    </li>
                    <li>
                      <a href="/en/volunteer" className="c-cta c-cta--icon h-color--gray-dark">
                        Volunteer
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.shopheart.org/?utm_source=heart.org&utm_medium=Referral&utm_campaign=AHA-Parent-Site-Top-Nav-Mobile"
                        className="c-cta c-cta--icon h-color--gray-dark"
                      >
                        ShopHeart
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div name="donation-modal"></div>
            </header>
            <main id="main-content">
              <div id="content">
                {route && (
                  <AppPlaceholder
                    page={page}
                    componentMap={componentMap}
                    name="headless-main"
                    rendering={route}
                  />
                )}
              </div>
            </main>
            <footer>
              <div id="footer">
                {route && (
                  <AppPlaceholder
                    page={page}
                    componentMap={componentMap}
                    name="headless-footer"
                    rendering={route}
                  />
                )}
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
