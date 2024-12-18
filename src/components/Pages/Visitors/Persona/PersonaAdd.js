import React from "react";
import DataTable from "../../../../modules/DataTable";
import Search from "../../../../modules/Search";
import VisitorBlockButton from "./VisitorBlockButton";
import { useFetchVisitors } from "../../../../hooks/useVisitors";
import { AppPaths } from "../../../../constants/appPaths";
import "./style.scss";
import Avatar from "../../../../modules/Avatar";
import { useTranslation } from "react-i18next";

const PersonaAdd = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useFetchVisitors();
  const visitors = data?.data?.filter((visitor) => !visitor.is_blocked) || [];

  const headItems = [
    t("persona.add.photo"),
    t("persona.add.doc_id"),
    t("persona.add.name"),
    t("persona.add.email"),
    t("persona.add.address"),
    t("persona.add.phone"),
    t("persona.add.actions"),
  ];

  const items = visitors.map((visitor) => ({
    id: visitor.id,
    photo: <Avatar size="50px" src={visitor.avatar} alt={visitor.name} />,
    doc_id: visitor.doc_id,
    name: visitor.name,
    email: visitor.email,
    address: visitor.address,
    phone: visitor.phone,
    action: <VisitorBlockButton visitor={visitor} />,
  }));

  return (
    <div className="user-container">
      <div className="head-wrapper">
        <Search
          path={AppPaths.persona.add}
          placeholder={t("persona.add.search_placeholder")}
        />
      </div>
      <DataTable
        withAction
        headItems={headItems}
        items={items}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PersonaAdd;
