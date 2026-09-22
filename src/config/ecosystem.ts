export type EcosystemArea = {
  id: string
  label: string
  status: 'active' | 'building' | 'planned'
  description: string
}

export const ecosystemConfig = {
  version: '1.0',
  stage: 'foundation',
  areas: [
    {
      id: 'portfolio',
      label: 'Portfolio',
      status: 'active',
      description: 'Personal work, education, media, projects, and contact.',
    },
    {
      id: 'projects',
      label: 'Projects',
      status: 'active',
      description: 'Product and project registry for the JRH ecosystem.',
    },
    {
      id: 'tools',
      label: 'Tools',
      status: 'planned',
      description: 'Practical utilities developed under JRH PUSAT.',
    },
    {
      id: 'intelligence',
      label: 'Intelligence',
      status: 'planned',
      description: 'Research, analysis, and knowledge systems.',
    },
  ] satisfies readonly EcosystemArea[],
} as const
