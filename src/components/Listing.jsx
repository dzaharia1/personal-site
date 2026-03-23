import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListingContainer = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.div`
  color: #cdff8c;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const TitleLink = styled.a`
  color: #cdff8c;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const RouterTitleLink = styled(Link)`
  color: #cdff8c;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.div`
  color: #d7ecbc;
  font-size: 0.9rem;
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
