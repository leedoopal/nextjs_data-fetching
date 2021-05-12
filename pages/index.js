import path from 'path';
import fs from 'fs/promises';

import Link from 'next/link';

function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map(product => <li
        key={product.id}>
        <Link href={`/${product.id}`}>
          {product.title}
        </Link>
      </li>)}
    </ul>
  )
}

export async function getStaticProps() {
  // cwd = current working directory
  const filePath = path.join(process.cwd(), 'data', 'dummy.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }

  if (!data.products.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10,
  }
}

export default Home;
