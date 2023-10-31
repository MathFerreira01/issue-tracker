import IssuesStatusBadge from '@/app/components/IssuesStatusBadge';
import prisma from '@/prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown';

interface Props {
  params: {id: string}
}

const IssueDetailPage = async ({params}: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)}
  })

  if (!issue) {
    notFound()
  }

  return (  
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex className="space-x-3" my="2">
            <IssuesStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className='prose' mt='4'>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <Pencil2Icon/>
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Box>
      </Grid>   
  )
}

export default IssueDetailPage