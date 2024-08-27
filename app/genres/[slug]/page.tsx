export default function Page({ params, searchParams }) {
  console.log(params, searchParams);

  return <main>this is a {params.slug} aaaa page</main>;
}
