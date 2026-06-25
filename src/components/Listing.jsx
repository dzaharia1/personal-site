import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListingContainer = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.div`
  color: var(--color-accent);
  font-size: var(--font-size-title);
  margin-bottom: 0;
`;

const TitleLink = styled.a`
  color: var(--color-accent);
  font-size: var(--font-size-title);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const RouterTitleLink = styled(Link)`
  color: var(--color-accent);
  font-size: var(--font-size-title);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.div`
  color: var(--color-text);
  font-size: var(--font-size-description);
  line-height: 1.4;
`;

export default function Listing({ project }) {
  return (
    <ListingContainer>
      <Title>
        {project.slug ? (
          <RouterTitleLink to={`/project/${project.slug}`}>
            {project.title}
          </RouterTitleLink>
        ) : project.href ? (
          <TitleLink href={project.href} target="_blank" rel="noreferrer">
            {project.title}
          </TitleLink>
        ) : (
          project.title
        )}
      </Title>
      <Description>{project.description}</Description>
    </ListingContainer>
  );
}
