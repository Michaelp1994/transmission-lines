import { styled } from "@linaria/react";
import { Table, TableBody, TableCell, TableRow } from "@repo/ui";
import React from "react";

interface ParameterTableProps {
    data: number[][];
}

const ParameterTable: React.FC<ParameterTableProps> = ({ data }) => {
    const { length } = data;

    return (
        <Wrapper>
            <Table>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((col, colIndex) => (
                                <TableCell key={colIndex}>{col}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default ParameterTable;
