import type { CollectionConfig } from 'payload'

export const ProjectTags: CollectionConfig = {
  slug: 'projectTags',
  admin: { useAsTitle: 'title', },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
