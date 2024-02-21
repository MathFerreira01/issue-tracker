'use client';

import { Button, Callout, Select, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/createIssueSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/issues/components/ErrorMessage';
import Spinner from '@/app/issues/components/Spinner';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

interface FormData {
  status: "OPEN" | "IN_PROGRESS" | "CLOSED"; 
}

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue } ) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {

      setSubmitting(true);
      if(issue) await axios.patch('/api/issues/' + issue.id, data)
      else await axios.post('/api/issues', data);
      router.push('/issues/list');
      router.refresh();

    } catch (error) {

      setSubmitting(false);
      setError('An unexpected error occurred.');

    }
  });
  
  const handleSelectChange = (value: string) => {
    setValue('status', value as FormData['status']);
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
      {issue && ( 
          <Select.Root
            {...register('status')}
            onValueChange={handleSelectChange}
            defaultValue={issue?.status || 'OPEN'} 
          >
            <Select.Trigger/>
            <Select.Content>
              <Select.Item value="OPEN">Open</Select.Item>
              <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
              <Select.Item value="CLOSED">Closed</Select.Item>
            </Select.Content>
          </Select.Root>
        )}
        <TextField.Root>
          <TextField.Input 
            defaultValue={issue?.title} 
            placeholder="Title" 
            {...register('title')} 
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;