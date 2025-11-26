import { CloseRounded, GitHub, LinkedIn } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Date,
  Desc,
  Image,
  Label,
  Member,
  MemberImage,
  MemberName,
  Members,
  NotDeployedNotice,
  Tag,
  Tags,
  Title,
  Wrapper,
} from "./ProjectDetailsStyle";

const ProjectDetails = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;
  return (
    <Modal
      open={true}
      onClose={() => setOpenModal({ state: false, project: null })}
    >
      <Container>
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
              cursor: "pointer",
              zIndex: 20, // Ensure it's above the bookmark
            }}
            onClick={() => setOpenModal({ state: false, project: null })}
          />
          <Image src={project?.image} />
          <Title>{project?.title}</Title>
          <Date>{project?.date}</Date>
          <Tags>
            {project?.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
          <Desc>{project?.description}</Desc>
          {!project?.isDone && (
            <NotDeployedNotice>
              This project is still in development and has not been deployed
              yet. Check back soon for updates!
            </NotDeployedNotice>
          )}
          {project?.member && (
            <>
              <Label>Members</Label>
              <Members>
                {project?.member.map((member, index) => (
                  <Member key={index}>
                    <MemberImage src={member.img} />
                    <MemberName>{member.name}</MemberName>
                    <a
                      href={member.github}
                      target="new"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <GitHub />
                    </a>
                    <a
                      href={member.linkedin}
                      target="new"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <LinkedIn />
                    </a>
                  </Member>
                ))}
              </Members>
            </>
          )}
          <ButtonGroup>
            <Button dull href={project?.github} target="new">
              View Code
            </Button>
            <Button
              href={project?.isDone ? project?.webapp : "#"}
              target={project?.isDone ? "new" : "_self"}
              onClick={(e) => {
                if (!project?.isDone) {
                  e.preventDefault();
                }
              }}
              style={{
                opacity: project?.isDone ? 1 : 0.6,
                cursor: project?.isDone ? "pointer" : "not-allowed",
              }}
            >
              {project?.isDone ? "View Live App" : "Not Deployed Yet"}
            </Button>
          </ButtonGroup>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default ProjectDetails;
