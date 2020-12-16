import React, { useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';


const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.div`
  display: grid;
  width:100%
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 30px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  // &:nth-of-type(odd) {
  //   .project-content {
  //     grid-column: 7 / -1;
  //     text-align: right;

  //     @media (max-width: 1080px) {
  //       grid-column: 5 / -1;
  //     }
  //     @media (max-width: 768px) {
  //       grid-column: 1 / -1;
  //       padding: 40px 40px 30px;
  //     }
  //     @media (max-width: 480px) {
  //       padding: 25px 25px 20px;
  //     }
  //   }
  //   .project-tech-list {
  //     justify-content: flex-end;

  //     li {
  //       margin: 0 0 5px 20px;

  //       @media (max-width: 768px) {
  //         margin: 0 0 5px 10px;
  //       }
  //     }
  //   }
  //   .project-links {
  //     justify-content: flex-end;
  //     margin-left: 0;
  //     margin-right: -10px;
  //   }
  //   .project-image {
  //     grid-column: 1 / 8;

  //     @media (max-width: 768px) {
  //       grid-column: 1 / -1;
  //     }
  //   }
  // }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }
 
  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 25px 0 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  #datelist {
    display: flex;
    justify-content:flex-end;
  }


  .project-overline1 {
    margin: 25px 0 10px;
    padding: 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;

    @media (max-width: 768px) {
      margin: 10px 0;}

  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 20px;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    .archive-link {
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      &:after {
        bottom: 0.1em;
      }
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);
    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(80%);
      }
    }
  }
`;

const Journey = () => {
  const data = useStaticQuery(graphql`
    query {
      journey: allMarkdownRemark(
        filter: { 
          fileAbsolutePath: { regex: "/journey/" } 
          frontmatter: { showInProjects: { ne: false } }}
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              date
              title
              tag
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.journey.edges.filter(({ node }) => node);

  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledProjectsSection>
    <section id="journey">
      <h2 className="numbered-heading" ref={revealTitle}>
        Journey 
      </h2>
      

      <div>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { date, title, tag } = frontmatter;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>

                <div className="project-content">
                  <h3 className="project-title">{title}</h3>
                  <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
                  <div id="datelist">
                  {tag.length && (
                    <ul className="project-tech-list">
                      {tag.map((tag, i) => (
                        <li key={i}>{tag}</li>
                      ))}
                    </ul> 
                  )}
                  <p className="project-overline1">{date}</p>
                  </div>
                </div>
              
              </StyledProject>
              
            );
          })}
      </div>
      <center><Link className="inline-link archive-link" to="/journeys" ref={revealArchiveLink}>
        view all
      </Link></center>
    </section>
    </StyledProjectsSection>
  );
};

export default Journey;