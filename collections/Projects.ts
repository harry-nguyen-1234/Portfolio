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
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'projectTags',
      hasMany: true,
      required: true,
    },
    {
      name: 'project-image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    }
  ],
}
