import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import DataTable from "../../../../modules/DataTable";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ItemsTable = ({
  initialItems = [],
  onItemsUpdate = () => {},
  canAdd = true,
}) => {
  const { t } = useTranslation();
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    onItemsUpdate(items);
  }, [items, onItemsUpdate]);

  const handleAddItem = () => {
    const uuid = Math.random().toString(36).substring(7);
    setItems([...items, { uuid, name: "", desc: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleRemoveItem = ({ id }) => {
    const updatedItems = items.filter((item) => item.uuid !== id);
    setItems(updatedItems);
  };

  const initialHeadItems = [t("general.name"), t("general.description")];

  const headItems = canAdd
    ? initialHeadItems.concat(t("general.actions"))
    : initialHeadItems;

  return (
    <>
      {items?.length > 0 && (
        <DataTable
          tableProps={{ bordered: true }}
          headItems={headItems}
          items={items.map((item, index) => ({
            id: item.uuid,
            name: (
              <Form.Control
                key={"item-name" + index}
                type="text"
                value={item.name}
                disabled={!canAdd}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
              />
            ),

            desc: (
              <Form.Control
                key={"item-desc" + index}
                type="text"
                disabled={!canAdd}
                value={item.desc}
                onChange={(e) =>
                  handleItemChange(index, "desc", e.target.value)
                }
              />
            ),
          }))}
          actionItems={
            canAdd
              ? [
                  {
                    text: <FaRegTrashAlt />,
                    variant: "danger",
                    tooltip: t("general.delete"),
                    onClick: handleRemoveItem,
                  },
                ]
              : null
          }
        />
      )}
      {canAdd && (
        <Button variant="success" onClick={handleAddItem}>
          {t("visitors.edit.addItem")}
        </Button>
      )}
    </>
  );
};

export default ItemsTable;
