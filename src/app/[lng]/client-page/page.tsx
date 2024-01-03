import Test from "@/components/test";

export default function Page({ params: { lng } }: { params: { lng: string } }) {
  return (
    <div>
      <Test lng={lng} />
    </div>
  );
}
