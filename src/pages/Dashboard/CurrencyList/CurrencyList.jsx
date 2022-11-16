import { ReactTableWithPaginationCard as Table } from "containers/ui/ReactTableCards-main";
import Layout from "layout/AppLayout";

export default function CurrencyList() {
  return (
    <Layout>
      <Table title="لیست قیمت ارزها" />
    </Layout>
  );
}
