import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";

const EmptyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="my-20 flex h-full justify-center">
      <NoData title={t("empty.noMovies")} />
    </div>
  );
};

export default EmptyPage;
