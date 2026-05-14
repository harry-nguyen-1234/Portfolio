import type { CollectionConfig } from 'payload'

export const ProjectTags: CollectionConfig = {
  slug: 'projectTags',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
