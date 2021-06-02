import React, { useState } from 'react';
import { Box, Flex, Button, Text } from 'theme-ui';
// import { Label, Input } from 'theme-ui';

import { useForm } from 'react-hook-form';

import Modal from 'react-modal';
// import styled from 'styled-components';
import Field from './Field';
// import { replaceTitles } from '../utils';
import { Field as FieldT, FieldInstance } from '../utils/types';
import FieldDate from './FieldDate';
import { findAll, replaceTitles } from '../utils';

// import { find } from 'lodash';

// const Tag = styled(Box)`
//   border: solid 1px #ddd;
//   padding: 5px;
//   color: #444;
//   border-radius: 7px;
//   margin-bottom: 8px;
//   padding-left: 16px;
//   padding-top: 8px;
//   padding-bottom: 8px;
//   background-color: #ebffe8;
// `;

// import

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    minWidth: '55ch',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: '#000000ba',
    border: 0,
  },
};

export interface IFieldField {
  name: string;
  value: string;
}

export interface IFieldType {
  name: string;
  value: string;
  type: string;
}

const Form = (props: any) => {
  const { fields } = props;
  const { register, handleSubmit, getValues } = useForm();
  //   const token = useSelector(({ login }: any) => login.token);
  const [field_maps, setFieldMap] = useState<Array<IFieldType>>();

  /**
   * Map form values to fields
   * @param fields
   */
  const mapFields = (fields: any) => {
    const vals = getValues();
    let obj: any = [];
    if (fields && fields.length > 0) {
      fields.forEach(function (value: any) {
        const name = vals[`${value.name}`];
        let x: FieldInstance = { ...value, value: name };
        obj.push(x);
      });
    }
    return obj;
  };

  const getInits = (field_maps: any) => {
    let initials: IFieldField[] = [];
    field_maps &&
      field_maps.forEach((i: any) => {
        const item: IFieldField = { name: i.name, value: i.value };
        initials.push(item);
      });
    return initials;
  };

  const onSubmit = (_data: any) => {
    const f: any = mapFields(fields);

    //
    // console.log('Submitted', data);

    setFieldMap(f);
    const vax = getInits(f);
    console.log('Submitted', vax);
    props.setMaps(f);

    const m: string = props.activeTemplate as string;

    if (m && m.length > 0) {
      const selection = findAll(props.templates, m);
      const serialized: any = selection && (selection.serialized as string);

      if (serialized && serialized.data) {
        const bodyValue = JSON.parse(serialized.data);
        console.log('(serialized', bodyValue);
      }
      const newTitle = replaceTitles(selection.title_template, vax);
      props.setValue('title', newTitle);
    }

    closeModal();
    // hide modal
  };

  function closeModal() {
    props.setShowForm(false);
  }

  return (
    <Box>
      <Text sx={{ fontSize: 1, color: 'gray.7', pb: 3, mb: 3 }}>Fields</Text>
      <Box
        p={3}
        bg="gray.0"
        sx={{ mt: 2, border: 'solid 1px', borderColor: 'gray.3' }}>
        {field_maps &&
          field_maps.map((x: any) => (
            <Flex
              key={x.id}
              sx={{
                pb: 2,
                borderBottom: 'solid 0.5px',
                borderColor: 'gray.2',
                mb: 2,
              }}>
              <Text
                sx={{
                  color: 'red.7',
                  fontSize: 0,
                  fontFamily: 'Menlo, monospace',
                }}>
                {x.name}
              </Text>
              <Text
                sx={{
                  fontSize: 0,
                  ml: 'auto',
                  fontWeight: 'heading',
                  fontFamily: 'Menlo, monospace',
                }}>
                {x.value}
              </Text>
              <Text>{x.type}</Text>
            </Flex>
          ))}
      </Box>
      <Button variant="btnSecondary" onClick={props.setShowForm}>
        Fill Form
      </Button>
      <Modal
        isOpen={props.showForm}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal">
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          py={2}
          sx={{ p: 5 }}
          mt={2}>
          <Text sx={{ fontSize: 2 }}>Add Content</Text>
          {fields && fields.length > 0 && (
            <Box sx={{ pt: 4 }}>
              {fields.map((f: FieldT) => (
                <Box key={f.id} sx={{ pb: 2 }}>
                  {f.field_type.name === 'date' && (
                    <FieldDate
                      name={f.name}
                      label={f.name}
                      register={register}
                      sub="Date"
                      // defaultValue={profile?.dob}
                      onChange={() => console.log('x')}
                    />
                  )}

                  {f.field_type.name !== 'date' && (
                    <Field
                      name={f.name}
                      label={f.name}
                      defaultValue=""
                      register={register}
                    />
                  )}
                </Box>
              ))}
            </Box>
          )}
          <Flex sx={{ pt: 3 }}>
            <Button type="submit">Save</Button>
            <Text onClick={closeModal} pl={2} pt={1}>
              Close
            </Text>
          </Flex>
        </Box>
      </Modal>
    </Box>
  );
};
export default Form;
