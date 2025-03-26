import { NoData } from "neetoui";

const EmptyPage = ({ text }) => (
  // const { t } = useTranslation();

  <div className="my-20 flex h-full justify-center">
    <NoData title={text} />
  </div>
);
export default EmptyPage;
