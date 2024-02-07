import { TowerGeometryInput } from "@repo/validators/schemas/TowerGeometry.schema";
import { useWatch } from "react-hook-form";
import { Stage, Layer, Circle, Line } from "react-konva";
import { styled } from "@linaria/react";

const SCALE = 5;

interface Props {}
const TowerGeometryDiagram: React.FC<Props> = () => {
    const fields = useWatch<TowerGeometryInput>({ name: "conductors" });

    return (
        <StyledStage width={500} height={500}>
            <Layer offsetX={-250} offsetY={-250}>
                <Line
                    points={[-200, 0, 200, 0]}
                    stroke="black"
                    strokeWidth={2}
                    lineCap="round"
                    lineJoin="round"
                />
                <Line
                    points={[0, 200, 0, -200]}
                    stroke="black"
                    strokeWidth={2}
                    lineCap="round"
                    lineJoin="round"
                />
                {fields &&
                    Array.isArray(fields) &&
                    fields.map((location, index) => (
                        <Circle
                            key={index}
                            x={location.x * SCALE}
                            y={-location.y * SCALE}
                            width={10}
                            height={10}
                            fill="black"
                        />
                    ))}
            </Layer>
        </StyledStage>
    );
};

const StyledStage = styled(Stage)`
    border: 1px solid black;
`;

export default TowerGeometryDiagram;
