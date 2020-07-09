import Layout from "../../../components/Layout"
import Edit from "../../../components/Edit"
import withPrivateRoute from "../../../components/withPrivateRoute"

export default withPrivateRoute(() => {
  return (
    <Layout>
      <Edit />
    </Layout>
  )
})