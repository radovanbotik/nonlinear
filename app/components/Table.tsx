import { ReactElement } from "react";
import { cn } from "../lib/helpers";

interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  render?: (column: ColumnProps<T>, item: T) => ReactElement;
  width?: string;
}

type Props<T> = {
  columns: Array<ColumnProps<T>>;
  data?: T[];
};

export default function Table<T>({ data, columns }: Props<T>) {
  const headers = columns.map((column, index) => {
    return (
      <th
        scope="col"
        key={`headCell-${index}`}
        className={cn(
          "hidden [&:not(:first-of-type)]:pl-1.5 pr-1.5 text-left text-xs text-gray-400  font-normal py-1   lg:table-cell last-of-type:text-right last-of-type:pr-4",
          column.width ?? ""
        )}
      >
        {column.title}
      </th>
    );
  });

  const rows = !data?.length ? (
    <tr>
      <td colSpan={columns.length} className="text-center">
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr
          key={`row-${index}`}
          className="group/track bg-gray-700/60 hover:bg-gray-700/70 bg-clip-padding backdrop-filter"
        >
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return (
              <td
                key={`cell-${index2}`}
                className={cn(
                  "hidden [&:not(:first-of-type)]:pl-1.5 pr-1.5 text-sm  lg:table-cell last-of-type:text-right last-of-type:pr-4",
                  column.width ?? ""
                )}
              >
                {value}
              </td>
            );
          })}
        </tr>
      );
    })
  );

  return (
    <table className="table-auto //min-w-full w-full border-t border-gray-700   border-spacing-y-1  border-separate ">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
