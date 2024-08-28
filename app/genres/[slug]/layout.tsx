import { ReactNode } from "react";
import { Container } from "../../components/Container";
import SectionHeadingWithTabs from "../../components/SectionHeadingWithTabs";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { slug: string };
}>) {
  const { slug } = params;

  const tabs = [
    { name: "Featured", href: `/genres/${slug}/featured` },
    { name: "Releases", href: `/genres/${slug}/releases` },
    { name: "Tracks", href: `/genres/${slug}/tracks` },
    { name: "Charts", href: `/genres/${slug}/charts` },
  ];

  return (
    <div className="bg-gray-700 py-4">
      <Container size="xl">
        <div className="flex gap-5">
          <div className="w-2/12 bg-gray-500"></div>
          <div className="w-7/12">
            <SectionHeadingWithTabs responsive={false} tabs={tabs} title={slug} />
            {children}
          </div>
          <div className="w-3/12 bg-gray-500"></div>
        </div>
      </Container>
    </div>
  );
}
