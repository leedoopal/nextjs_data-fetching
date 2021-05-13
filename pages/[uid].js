function UserIDPage(props) {
  return <h1>{props.id}</h1>
}

export default UserIDPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const userID = params.uid;

  return {
    props: {
      id: 'userid-' + userID
    }
  }
}
