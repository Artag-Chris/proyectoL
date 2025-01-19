import CategoryPage from '@/app/category/[slug]/page'

export async function getServerSideProps(context) {
  const { slug } = context.params;

  return {
    props: { slug }, // Pasar el slug como prop al componente CategoryPage
  };
}

export default CategoryPage;