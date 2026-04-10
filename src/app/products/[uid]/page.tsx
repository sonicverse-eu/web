import { redirect } from 'next/navigation';

type LegacyProductPageProps = {
  params: Promise<{ uid: string }>;
};

export default async function LegacyProductPage({ params }: LegacyProductPageProps) {
  const { uid } = await params;
  redirect(`/projects/${uid}`);
}
