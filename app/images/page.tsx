

import { GetServerSideProps } from 'next';

type ProductProps = {
  productName: string;
  imageUrl: string;
};

const ProductPage: React.FC<ProductProps> = ({ productName, imageUrl }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>{productName}</h1>
      <img src={imageUrl} alt={productName} style={{ width: '500px', height: 'auto' }} />
    </div>
  );
};

// Assume `getServerSideProps` fetches product data from a database
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  
  // Simulated product data fetching based on `id`
  const product = {
    productName: 'Sample Product',
    imageUrl: 'https://cdn.filestackcontent.com/yourImageHandle',
  };

  return {
    props: {
      productName: product.productName,
      imageUrl: product.imageUrl,
    },
  };
};

export default ProductPage;
