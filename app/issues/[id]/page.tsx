import IssuesStatusBadge from '@/app/components/IssuesStatusBadge';
import prisma from '@/prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown';
import IssueDetails from './IssueDetails';
import EditIssueButton from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

interface Props {
  params: {id: string}
}

const IssueDetailPage = async ({params}: Props) => {
  const session = await getServerSession(authOptions)

  const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)}
  })

  if (!issue) {
    notFound()
  }

  return (  
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className='md:col-span-4'>
          <IssueDetails issue={issue}/>
        </Box>
        {session && (
          <Box>
            <EditIssueButton issueId={issue.id}/>
            <DeleteIssueButton issueId={issue.id}/>
          </Box>
        )}
      </Grid>   
  )
}

export default IssueDetailPage