function DropDownCommponent({
  defaultValue,
  itemList,
}: {
  defaultValue: string;
  itemList: any;
}) {
  return (
    <select
      className="select select-bordered select-primary select-sm h-10 w-full md:max-w-[25%] xl:max-w-[12%]"
      defaultValue={defaultValue}
      style={{ borderWidth: "1px" }}
    >
      {itemList.map((item: any, index: number) => {
        return <option key={index}>{item}</option>;
      })}
    </select>
  );
}

export default DropDownCommponent;
