import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  fields: [
    {
      name: 'title',
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
    },
    {
      name: 'project-image',
      type: 'relationship',
      relationTo: 'media',
    }
  ],
}
