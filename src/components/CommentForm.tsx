import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text } from 'theme-ui';
import { useForm } from 'react-hook-form';

import Field from './FieldText';
import { createEntity, loadEntity } from '../utils/models';
import { useStoreState } from 'easy-peasy';
import CommentCard from './CommentCard';

// Generated by https://quicktype.io

export interface Comments {
  total_pages: number;
  total_entries: number;
  page_number: number;
  comments: Comment[];
}

export interface Comment {
  updated_at: string;
  parent_id: null;
  master_id: string;
  master: string;
  is_parent: boolean;
  inserted_at: string;
  id: string;
  comment: string;
  profile: Profile;
}

interface CommentFormProps {
  master: string;
  master_id: string;
}

export interface Profile {
  uuid: string;
  profile_pic: string;
  name: string;
  gender: string;
  dob: Date;
}

export interface User {
  updated_at: Date;
  name: string;
  inserted_at: Date;
  id: string;
  email_verify: boolean;
  email: string;
}

const CommentForm = (props: CommentFormProps) => {
  const { register, handleSubmit, errors } = useForm();
  const token = useStoreState((state) => state.auth.token);
  const [submiting, setSubmitting] = useState<boolean>(false);

  const [comments, setComments] = useState<Array<Comment>>([]);

  const { master, master_id } = props;

  const onSubmit = (data: any) => {
    setSubmitting(true);
    const commentExample = {
      master_id: master_id,
      master: master,
      is_parent: true,
      comment: data.body,
    };
    createEntity(commentExample, 'comments', token);
    loadEntity(token, `comments?master_id=${master_id}&page=0`, onLoadComments);
  };
  const onLoadComments = (data: any) => {
    if (data.comments) {
      setComments(data.comments);
    }
  };

  useEffect(() => {
    loadEntity(token, `comments?master_id=${master_id}&page=1`, onLoadComments);
  }, [master_id, token]);

  return (
    <>      
      {comments && comments.length > 0 && (
        <Box sx={{ maxWidth: '40vh' }}>
          {comments.map((comment: Comment) => (
            <CommentCard {...comment} />
          ))}
        </Box>
      )}
      <Box as="form" onSubmit={handleSubmit(onSubmit)} py={3} mt={4}>
        <Box mx={0} mb={0}>
          <Flex>
            <Box>
              <Field name="body" label="" defaultValue="" register={register} />
            </Box>
            {errors.body && <Text>This field is required</Text>}
          </Flex>
        </Box>
        <Button variant="btnPrimary" ml={0}>{submiting ? 'Saving ... ' : 'Add Comment'}</Button>
      </Box>
    </>
  );
};
export default CommentForm;
