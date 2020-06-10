import React, { FC } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Link as _Link,
  useColorMode,
} from "@chakra-ui/core";
import Link from "next/link";
import IPublication from "types/publication";
import { IoMdClock, IoMdArrowRoundForward } from "react-icons/io";

interface Props {
  publications: IPublication[];
  hideViewAllLinksNode?: boolean;
}

const Publications: FC<Props> = ({
  publications = [],
  hideViewAllLinksNode = false,
}) => {
  const { colorMode } = useColorMode();
  const cardBgColor = { light: "white", dark: "gray.900" };
  const cardColor = { light: "gray.900", dark: "white" };

  const viewAllLinksNode = () => {
    return (
      <Link href="/publications">
        <_Link p={2} href="/publications" rounded="md">
          <Stack spacing={2} isInline alignItems="center">
            <Box fontWeight="bold">View all publications</Box>
            <Box as={IoMdArrowRoundForward} size="15px" />
          </Stack>
        </_Link>
      </Link>
    );
  };

  const headingNode = () => {
    if (hideViewAllLinksNode) {
      return (
        <Stack spacing={2}>
          <Heading as="h2" size="xl">
            Publications
          </Heading>
          <Text>Articles which have been published on other websites</Text>
        </Stack>
      );
    }

    return (
      <Box d="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="xl">
          Publications
        </Heading>
        {viewAllLinksNode()}
      </Box>
    );
  };

  const dateNode = (date: string) => {
    return (
      <Stack spacing={2} isInline alignItems="center">
        <Box as={IoMdClock} />
        <Text fontSize="sm">{date}</Text>
      </Stack>
    );
  };

  const titleNode = (title: string) => {
    return (
      <Heading as="h3" size="md">
        {title}
      </Heading>
    );
  };

  const descriptionNode = (description: string) => {
    return <Text>{description}</Text>;
  };

  const ctaNode = () => {
    return (
      <Button rightIcon="external-link" variant="link" fontSize="sm">
        Read more
      </Button>
    );
  };

  return (
    <Stack spacing={8}>
      {headingNode()}
      <Stack spacing={8}>
        {publications.map((publication: IPublication, index: number) => {
          return (
            <Box
              key={index}
              bg={cardBgColor[colorMode]}
              color={cardColor[colorMode]}
              p={8}
              rounded="md"
              shadow="md"
            >
              <a href={publication.url} target="_blank" rel="noopener">
                <Box>
                  <Stack spacing={4}>
                    {dateNode(publication.date)}
                    {titleNode(publication.title)}
                    {descriptionNode(publication.description)}
                    <Box>{ctaNode()}</Box>
                  </Stack>
                </Box>
              </a>
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Publications;
