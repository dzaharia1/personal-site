import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { projects } from "./data";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 80px 48px;
    align-items: flex-start;
  }
`;

const HeaderSection = styled.div`
  flex: 1;
  margin-bottom: 48px;

  @media (min-width: 768px) {
    position: sticky;
    top: 80px;
    margin-bottom: 0;
    padding-right: 48px;
    max-width: 300px;
  }
`;

const HomeLink = styled(Link)`
  color: #cdff8c;
  text-decoration: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  margin-bottom: 24px;

  &:hover {
    text-decoration: underline;
  }
`;

const MainHeading = styled.h1`
  color: #cdff8c;
  font-size: 2.2rem;
  font-weight: normal;
  margin: 0 0 8px 0;
  white-space: pre-wrap;
  line-height: 1.2;
`;

const MetaData = styled.div`
  color: #d7ecbc;
  font-size: 1rem;
`;

const ContentSection = styled.div`
  flex: 2;
  @media (min-width: 768px) {
    padding-top: 52px; /* aligns description somewhat with header depending on spacing */
  }
`;

const OpenLink = styled.a`
  color: #cdff8c;
  text-decoration: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  margin-bottom: 24px;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  color: #d7ecbc;
  font-size: 1rem;
  margin: 0 0 32px 0;
  line-height: 1.4;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 10000;
`;

const NotFound = styled.div`
  color: #cdff8c;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 100px;
`;

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Container>
        <NotFound>project not found.</NotFound>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderSection>
        <HomeLink to="/">← home</HomeLink>
        <MainHeading>{project.title}</MainHeading>
        <MetaData>
          {project.year} | {project.categories.join(" | ")}
        </MetaData>
      </HeaderSection>
      <ContentSection>
        {project.href && <OpenLink href={project.href} target="_blank">play with the app</OpenLink>}
        <Description>{project.description}</Description>
        {project.images && project.images.length > 0 && (
          <ImageGrid>
            {project.images.map((src, idx) => (
              <ProjectImage
                key={idx}
                src={src}
                alt={`${project.title} screenshot ${idx + 1}`}
              />
            ))}
          </ImageGrid>
        )}
      </ContentSection>
    </Container>
  );
}
