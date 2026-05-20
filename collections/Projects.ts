import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'short_description',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'projectTags',
      hasMany: true,
      required: true,
    },
    {
      name: 'external_link',
      type: 'text',
    },
    {
      name: 'project_image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    }
  ],
}
