import Layout from '../../../components/Layout';
import EditPassword from '../../../components/EditPassword';
import withPrivateRoute from '../../../components/withPrivateRoute';

export default withPrivateRoute(() => {
  return (
    <Layout>
      <EditPassword />
    </Layout>
  )
});