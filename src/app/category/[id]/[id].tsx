import CategoryPage from '@/app/category/[id]/page'

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: { id }, // Pasar el id como prop al componente CategoryPage
  };
}

export default CategoryPage;