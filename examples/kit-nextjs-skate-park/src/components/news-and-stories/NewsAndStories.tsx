'use client';

import React, { JSX } from 'react';
import Image from 'next/image';
import { ComponentProps } from 'lib/component-props';
import './news-and-stories.css';

type NewsAndStoriesProps = ComponentProps;

const Default = ({ params }: NewsAndStoriesProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = params || {};
  const featuredStory = {
    image: '/images/news/woman_choking.jpg',
    date: 'Jan 16, 2026',
    byline: 'By American Heart Association News',
    title: 'CPR – and knowing how to help someone choking – could prevent a heart crisis',
    href: '#',
  };

  const secondaryStories = [
    {
      image: '/images/news/Hispanic-man-on-phone_Noticias_SC_SC.jpg',
      title: 'Noticias en español sobre la salud de su corazón y cerebro',
      href: '#',
    },
    {
      image: '/images/news/HP-image-5_SC.jpg',
      title: 'Around the American Heart Association',
      href: '#',
    },
  ];

  const recentStories = [
    {
      title: 'New U.S. nutrition guidance emphasizes importance of healthier eating',
      date: 'Jan 15, 2026',
      href: '#',
    },
    {
      title: 'Faced with heart failure, he took on the challenge to change – and found a new calling helping others',
      date: 'Jan 15, 2026',
      href: '#',
    },
    {
      title: 'What kids should know about how to spot, respond to and prevent stroke',
      date: 'Jan 12, 2026',
      href: '#',
    },
    {
      title: "Her life remains 'a work in progress' after a stroke at 30 – and she wants to inspire others",
      date: 'Jan 8, 2026',
      href: '#',
    },
    {
      title: "What's the best way to use AI in your workout?",
      date: 'Jan 5, 2026',
      href: '#',
    },
    {
      title: 'Questions about heart attack, blood pressure, BMI or stroke? Find answers here',
      date: 'Dec 30, 2025',
      href: '#',
    },
    {
      title: "The 'gift' of a heart transplant gave him another chance at life – and a new purpose",
      date: 'Dec 18, 2025',
      href: '#',
    },
  ];

  return (
    <section className={`component news-and-stories ${styles || ''}`} id={id}>
      <div className="news-and-stories__container">
        {/* Header */}
        <div className="news-and-stories__header">
          <div className="news-and-stories__header-text">
            <h2 className="news-and-stories__title">News and Stories</h2>
            <p className="news-and-stories__subtitle">News and Stories from the American Heart Association</p>
          </div>
          <a href="#" className="news-and-stories__cta news-and-stories__cta--desktop">
            Read more News and Stories
          </a>
        </div>

        {/* Mobile CTA */}
        <a href="#" className="news-and-stories__cta news-and-stories__cta--mobile">
          Read more News and Stories
        </a>

        <hr className="news-and-stories__divider" />

        {/* Content Grid */}
        <div className="news-and-stories__content">
          {/* Left Column - Featured & Secondary Stories */}
          <div className="news-and-stories__left">
            {/* Featured Story */}
            <a href={featuredStory.href} className="news-and-stories__featured">
              <div className="news-and-stories__featured-image">
                <Image src={featuredStory.image} alt="" width={800} height={600} />
                <div className="news-and-stories__featured-overlay">
                  <div className="news-and-stories__featured-meta">
                    <span className="news-and-stories__featured-date">{featuredStory.date}</span>
                    <span className="news-and-stories__featured-separator"> / </span>
                    <span className="news-and-stories__featured-byline">{featuredStory.byline}</span>
                  </div>
                  <h3 className="news-and-stories__featured-title">{featuredStory.title}</h3>
                </div>
              </div>
            </a>

            {/* Secondary Stories */}
            <div className="news-and-stories__secondary">
              {secondaryStories.map((story, index) => (
                <a key={index} href={story.href} className="news-and-stories__secondary-item">
                  <div className="news-and-stories__secondary-image">
                    <Image src={story.image} alt="" width={400} height={300} />
                  </div>
                  <p className="news-and-stories__secondary-title">{story.title}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Recent Stories List */}
          <div className="news-and-stories__right">
            <div className="news-and-stories__recent-list">
              {recentStories.map((story, index) => (
                <a key={index} href={story.href} className="news-and-stories__recent-item">
                  <h4 className="news-and-stories__recent-title">{story.title}</h4>
                  <span className="news-and-stories__recent-date">{story.date}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Default;
