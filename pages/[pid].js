import React, { Fragment, useEffect } from "react";
import path from "path";
import fs from "fs/promises";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productID = params.pid;
  const data = await getData();

  const product = data.products.find(product => product.id === productID);
  console.log(product);

  return {
    props: {
      loadedProduct: product
    }
  }
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map(product => product.id);
  const pathsWithParams = ids.map(id => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: false
  }
}

export default ProductDetailPage;
