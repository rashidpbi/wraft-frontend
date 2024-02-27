import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Flex, Button, Text, Input } from 'theme-ui';
import { Label, Select } from 'theme-ui';
import { useImmer } from 'use-immer';
import { Drawer } from '@wraft-ui/Drawer';

import { fetchAPI } from '../utils/models';
import { ContentType } from '../utils/types';
import Field from './Field';
import FieldColor from './FieldColor';
import FieldText from './FieldText';
import { IFlow, ICreator } from './FlowList';
import MenuStepsIndicator from './MenuStepsIndicator';
import Form from './ContentTypeForm';

export interface IFlowItem {
  flow: IFlow;
  creator: ICreator;
}

// Generated by https://quicktype.io

export interface Layouts {
  total_pages: number;
  total_entries: number;
  page_number: number;
  layouts: Layout[];
}

export interface Layout {
  width: number;
  updated_at: string;
  unit: string;
  slug_file: string;
  slug: string;
  screenshot: string;
  name: string;
  inserted_at: string;
  id: string;
  height: number;
  engine: Engine;
  description: string;
}

export interface Engine {
  updated_at: string;
  name: string;
  inserted_at: string;
  id: string;
  api_route: string;
}

// Generated by https://quicktype.io
export interface FieldTypeList {
  total_pages: number;
  total_entries: number;
  page_number: number;
  field_types: FieldType[];
}

export interface FieldType {
  updated_at: string;
  name: string;
  inserted_at: string;
  id: string;
}

export interface ILayout {
  width: number;
  updated_at: string;
  unit: string;
  slug: string;
  name: string;
  id: string;
  height: number;
  description: string;
}

export interface IField {
  id: string;
  name: string;
  layout_id: string;
  layout: ILayout;
  description: string;
}

export interface IFieldItem {
  name: string;
  type: string;
}

export interface FieldTypeItem {
  key: string;
  name?: string;
  field_type_id: string;
}

const ContentTypeViewForm = () => {
  const [fields, setFields] = useState([]);
  const [content, setContent] = useImmer<ContentType | undefined>(undefined);
  const [layouts, setLayouts] = useState<Array<ILayout>>([]);
  const [flows, setFlows] = useState<Array<IFlowItem>>([]);
  const [themes, setThemes] = useState<Array<any>>([]);
  const [formStep, setFormStep] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm({});
  const router = useRouter();

  const cId: string = router.query.id as string;

  useEffect(() => {
    const convertedArray = content?.content_type.fields.map((item: any) => {
      return {
        name: item.name,
        value: item,
      };
    });
    setFields(convertedArray);
  }, [content]);

  const setContentDetails = (data: any) => {
    const res: ContentType = data;
    setContent((draft) => {
      if (draft) {
        Object.assign(draft, res);
      } else {
        return res;
      }
    });
    if (res && res.content_type) {
      setValue('name', res.content_type.name);
      setValue('description', res.content_type?.description);
      setValue('prefix', res.content_type.prefix);
      setValue('layout_id', res.content_type.layout?.id || undefined);
      setValue('flow_id', res.content_type.flow?.flow?.id || undefined);
      setValue('theme_id', res.content_type?.theme?.id || undefined);
      setValue('edit', res.content_type.id);
      setValue('color', res.content_type.color);
    }
  };

  const loadDataDetails = (id: string) => {
    fetchAPI(`content_types/${id}`).then((data: any) => {
      setContentDetails(data);
    });
    return false;
  };

  const loadLayouts = () => {
    fetchAPI('layouts').then((data: any) => {
      const res: ILayout[] = data.layouts;
      setLayouts(res);
    });
  };

  const loadFlows = () => {
    fetchAPI('flows').then((data: any) => {
      const res: IFlowItem[] = data.flows;
      setFlows(res);
    });
  };

  const loadThemes = () => {
    fetchAPI('themes?page_size=50').then((data: any) => {
      const res: any = data.themes;
      setThemes(res);
    });
  };

  /**
   * On Theme Created
   */

  const isUpdate = cId ? true : false;

  useEffect(() => {
    if (cId) {
      setValue('edit', cId);
      loadDataDetails(cId);
      loadThemes();
    }
  }, [cId]);

  useEffect(() => {
    loadLayouts();
    loadFlows();
    loadThemes();
  }, []);

  const titles = ['Details', 'Configure', 'Fields'];
  const goTo = (step: number) => {
    setFormStep(step);
  };

  return (
    <Box>
      <Flex>
        <MenuStepsIndicator titles={titles} formStep={formStep} goTo={goTo} />
        <Box
          variant="layout.contentFrame"
          sx={{
            maxWidth: '556px',
            height: '100%',
            p: 4,
            bg: 'backgroundWhite',
          }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: formStep === 0 ? 'block' : 'none' }}>
              <Box>
                <Field
                  register={register}
                  error={errors.name}
                  label="Name"
                  name="name"
                  defaultValue=""
                  placeholder="Variant Name"
                  view
                />
              </Box>
              <Box pt={3}>
                <FieldText
                  register={register}
                  label="Description"
                  name="description"
                  defaultValue="Something to guide the user here"
                  view
                />
                {errors.description && errors.description.message && (
                  <Text variant="error">
                    {errors.description.message as string}
                  </Text>
                )}
              </Box>
              <Box pt={3}>
                <Field
                  register={register}
                  error={errors.prefix}
                  label="Prefix"
                  name="prefix"
                  defaultValue=""
                  view
                />
              </Box>
            </Box>
            <Box sx={{ display: formStep === 1 ? 'block' : 'none' }}>
              <Box>
                <FieldColor
                  register={register}
                  label="Color"
                  name="color"
                  defaultValue={(content && content?.content_type.color) || ''}
                  view
                />
                {errors.color && errors.color.message && (
                  <Text variant="error">{errors.color.message as string}</Text>
                )}
              </Box>
              <Box mt={3}>
                <Label htmlFor="layout_id" mb={1}>
                  Layout
                </Label>
                <Select
                  id="layout_id"
                  {...register('layout_id', { required: true })}
                  sx={{ ':disabled': { color: 'text' } }}
                  disabled>
                  {!isUpdate && (
                    <option disabled selected>
                      select an option
                    </option>
                  )}
                  {layouts &&
                    layouts.length > 0 &&
                    layouts.map((m: any) => (
                      <option value={m.id} key={m.id}>
                        {m.name}
                      </option>
                    ))}
                </Select>
                {errors.layout_id && errors.layout_id.message && (
                  <Text variant="error">
                    {errors.layout_id.message as string}
                  </Text>
                )}
              </Box>
              <Box mt={3}>
                <Label htmlFor="flow_id" mb={1}>
                  Flow
                </Label>
                <Select
                  id="flow_id"
                  defaultValue=""
                  {...register('flow_id', { required: true })}
                  sx={{ ':disabled': { color: 'text' } }}
                  disabled>
                  {!isUpdate && (
                    <option disabled selected>
                      select an option
                    </option>
                  )}
                  {flows &&
                    flows.length > 0 &&
                    flows.map((m: any) => (
                      <option value={m.flow.id} key={m.flow.id}>
                        {m.flow.name}
                      </option>
                    ))}
                </Select>
                {errors.flow_id && errors.flow_id.message && (
                  <Text variant="error">
                    {errors.flow_id.message as string}
                  </Text>
                )}
              </Box>

              <Box mt={3}>
                <Label htmlFor="theme_id" mb={1}>
                  Themes
                </Label>
                <Select
                  id="theme_id"
                  defaultValue=""
                  {...register('theme_id', { required: true })}
                  sx={{ ':disabled': { color: 'text' } }}
                  disabled>
                  {!isUpdate && (
                    <option disabled selected>
                      select an option
                    </option>
                  )}
                  {themes &&
                    themes.length > 0 &&
                    themes.map((m: any) => (
                      <option value={m.id} key={m.id}>
                        {m.name}
                      </option>
                    ))}
                </Select>
                {errors.theme_id && errors.theme_id.message && (
                  <Text variant="error">
                    {errors.theme_id.message as string}
                  </Text>
                )}
              </Box>

              <Box sx={{ display: 'none' }}>
                <Input
                  id="edit"
                  defaultValue={0}
                  hidden={true}
                  {...register('edit', { required: true })}
                />
              </Box>
            </Box>
            {errors.exampleRequired && <Text>This field is required</Text>}
            <Box sx={{ display: formStep === 2 ? 'block' : 'none' }}>
              <Label>Fields</Label>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'border',
                  borderRadius: '4px',
                }}>
                {fields &&
                  fields.map((f: any, index: number) => (
                    <Flex
                      key={f.id}
                      sx={{
                        px: 3,
                        py: 2,
                        borderBottom:
                          index < fields.length - 1 ? '1px solid' : 'none',
                        borderColor: 'border',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text as="p" variant="pM">
                        {f.name}
                      </Text>
                      <Text
                        as="p"
                        variant="capR"
                        sx={{ textTransform: 'uppercase', color: 'gray.600' }}>
                        {f.value.field_type.name}
                      </Text>
                    </Flex>
                  ))}
              </Box>
            </Box>

            <Button
              variant="buttonSecondary"
              mt={4}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}>
              Edit
            </Button>
          </Box>
        </Box>
      </Flex>
      <Drawer open={isOpen} setOpen={() => setIsOpen(false)}>
        {isOpen && <Form step={formStep} setIsOpen={setIsOpen} />}
      </Drawer>
    </Box>
  );
};
export default ContentTypeViewForm;
