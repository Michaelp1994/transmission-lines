import { styled } from "@linaria/react";
import { Layer, Line, Rect, Stage, Text } from "react-konva";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import ROUTES from "@/router/routes";
import trpc, { RouterOutputs } from "@/utils/trpc";

interface Props {
    data: RouterOutputs["solution"]["towerFault"];
}

const CircuitDiagram: React.FC<Props> = () => {
    const { lineId, towerId } = useTypedParams(ROUTES.TRANSMISSION_FAULT);

    const width = 950;
    const numTowers = 3;
    const towers = [...Array(numTowers).keys()];
    const height = 500;
    const rectWidth = 100;
    const rectHeight = 100;
    const { data, refetch, isLoading, isError } = trpc.circuitDiagram.useQuery({
        location: {
            transmissionLine: lineId,
            tower: towerId,
        },
    });
    const offset = { x: rectWidth / 2, y: rectHeight / 2 };
    if (isLoading) return <div>Loading!</div>;

    if (isError) return <div>Error!</div>;
    return (
        <Wrapper>
            <StyledStage width={width} height={height}>
                <Layer>
                    {towers.map((tower) => {
                        const offset = tower * 250;
                        return (
                            <>
                                <Rect
                                    x={200 + offset}
                                    y={height / 2 - 50}
                                    width={rectWidth}
                                    height={rectHeight}
                                    stroke="black"
                                    strokeWidth={2}
                                />
                                <Line
                                    points={[
                                        250 + offset,
                                        300,
                                        250 + offset,
                                        500,
                                    ]}
                                    stroke="black"
                                    strokeWidth={2}
                                />

                                <Text
                                    x={200 + offset}
                                    y={250}
                                    text={`Tower ${tower + 1}`}
                                    align="center"
                                    width={rectWidth}
                                />
                                {/* {transmissionLine?.conductors.map(
                                    (_conductor, index) => (
                                        <Line
                                            key={`line1${index}`}
                                            points={[
                                                50 + offset,
                                                210 + index * 10,
                                                200 + offset,
                                                210 + index * 10,
                                            ]}
                                            stroke="black"
                                            strokeWidth={2}
                                        />
                                    )
                                )} */}
                            </>
                        );
                    })}

                    {/* {transmissionLine?.conductors.map((_conductor, index) => (
                        <Line
                            key={`line4${index}`}
                            points={[
                                800,
                                210 + index * 10,
                                1000,
                                210 + index * 10,
                            ]}
                            stroke="black"
                            strokeWidth={2}
                        />
                    ))} */}
                </Layer>
            </StyledStage>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const StyledStage = styled(Stage)`
    border: 1px solid black;
`;
export default CircuitDiagram;
