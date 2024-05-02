import { styled } from "@linaria/react";
import { Table, TableBody, TableCell, TableRow } from "@repo/ui";

interface Complex {
    re: number;
    im: number;
}

interface ParameterTableProps {
    data: (number | Complex)[][];
}

export default function MatrixTable({ data }: ParameterTableProps) {
    return (
        <Wrapper>
            <Table>
                <TableBody>
                    {data.map((row, rowIndex) => 
                        { return <TableRow key={rowIndex}>
                            {row.map((col, colIndex) => 
                                { return <TableCell key={colIndex}>
                                    {typeof col === "number" ? (
                                        <span>{col.toPrecision(5)}</span>
                                    ) : (
                                        <span>
                                            {col.re.toFixed(5)} + j
                                            {col.im.toFixed(5)}
                                        </span>
                                    )}
                                </TableCell> }
                            )}
                        </TableRow> }
                    )}
                </TableBody>
            </Table>
        </Wrapper>
    );
}

const Wrapper = styled.div``;
