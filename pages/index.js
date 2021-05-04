import path from 'path';
import fs from 'fs/promises';

function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map(product => <li
        key={product.id}>{product.title}</li>)}
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
      notFound: true,
    }
  }

  return {
    props: {
      products: data.products
    }
  }
}

export default Home;
