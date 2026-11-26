"use client";

import {

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table";

type Props = {

    columns: string[];

    data: any[];
};

const PremiumTable = ({
    columns,
    data,
}: Props) => {

    return (

        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-md overflow-hidden border border-zinc-200">

            <Table>

                <TableHeader className="bg-zinc-100 dark:bg-zinc-800">

                    <TableRow>

                        {columns.map((column) => (

                            <TableHead
                                key={column}
                                className="font-bold text-black dark:text-white"
                            >
                                {column}
                            </TableHead>

                        ))}

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {data.map((row, index) => (

                        <TableRow
                            key={index}
                            className="hover:bg-zinc-50 transition"
                        >

                            {columns.map((column) => (

                                <TableCell
                                    key={column}
                                    className="text-zinc-700 dark:text-zinc-300"
                                >

                                    {row[column]}

                                </TableCell>

                            ))}

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </div>
    );
};

export default PremiumTable;