import { SliceSimulator, getSlices, type SliceSimulatorParams } from '@slicemachine/adapter-next/simulator';
import { components } from '@/slices';
import type { CmsSlice } from '@/lib/site-data/types';

export default async function SliceSimulatorPage({ searchParams }: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state) as CmsSlice[];

  return (
    <SliceSimulator>
      {slices.map((slice) => {
        const Component = components[slice.slice_type];

        if (!Component) {
          return null;
        }

        return <Component key={slice.id} slice={slice} />;
      })}
    </SliceSimulator>
  );
}
