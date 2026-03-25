import Layout from '@/components/layout/Layout';
import ProjectDetailClient, { type ProjectData } from '@/components/projects/ProjectDetailClient';
import projectsData from '@/data/projects.json';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return (projectsData as ProjectData[]).map((p) => ({ id: String(p.id) }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = (projectsData as ProjectData[]).find((p) => String(p.id) === params.id);
  if (!project) return notFound();

  return (
    <Layout>
      <ProjectDetailClient project={project} />
    </Layout>
  );
}

