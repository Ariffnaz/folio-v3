import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { Link } from 'gatsby';
import { Icon } from '@components/icons';

const StyledProject = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(9, 1fr);
  // align-items: center;
  // display: flex;
  flex-direction: column;
  .back-button{
    
  }

  &:not(:last-of-type) {
    margin-bottom: 60px;

    @media (max-width: 768px) {
      margin-bottom: 10px;
    }

    @media (max-width: 480px) {
      margin-bottom: 10px;
    }
  }

  &:nth-of-type(odd) {
    // .project-content {
    //   grid-column: 7 / -1;
    //   text-align: right;

    //   @media (max-width: 1080px) {
    //     grid-column: 5 / -1;
    //   }
    //   @media (max-width: 768px) {
    //     grid-column: 1 / -1;
    //     padding: 40px 40px 30px;
    //   }
    //   @media (max-width: 480px) {
    //     padding: 25px 25px 20px;
    //   }
    // }

    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
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
    margin: 10px 0;
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
      background-color: var(--light-navy);
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

    a {
      width: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
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

const JourneyPage = ({ location, data }) => {
  const projects = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig(200, 0));
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Journey" />
      
      <main>
        <header ref={revealTitle}>
          {/* <p className="back-button"><a href="/#projects">&lt;</a></p>  */}
          <Link to="/#journey"><p className="back-button">&lt;</p></Link>
          <h1 className="big-heading">Journey</h1>
          <p className="subtitle">My Journey throughout semesters</p><br/><br/><br/>
        </header>
        <div>
        {projects &&
          projects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { date, title, tag } = frontmatter;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  {/* <p className="project-overline">{date}</p> */}
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
                    <span className="project-overline1">{date}</span>
                    </div>
                </div>
              </StyledProject>
            );
          })}
      </div>
        
      </main>
    </Layout>
  );
};
JourneyPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default JourneyPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/journey/" } }
      sort: { fields: [frontmatter___date], order: ASC }
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
`;



