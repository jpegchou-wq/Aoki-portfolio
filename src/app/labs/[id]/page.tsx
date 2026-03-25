import Layout from '@/components/layout/Layout';
import LabDetailClient, { type LabData } from '@/components/labs/LabDetailClient';
import labsData from '@/data/labs.json';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return (labsData as LabData[]).map((l) => ({ id: String(l.id) }));
}

export default function LabDetailPage({ params }: { params: { id: string } }) {
  const lab = (labsData as LabData[]).find((l) => String(l.id) === params.id);
  if (!lab) return notFound();

  return (
    <Layout>
      <LabDetailClient lab={lab} />
    </Layout>
  );
}

