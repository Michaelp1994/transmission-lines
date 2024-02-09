import { styled } from "@linaria/react";
import { Button, Input } from "@repo/ui";

interface Props {
    table: any;
}
const ConductorTypeToolbar: React.FC<Props> = () => (
        <ToolbarContainer>
            <LeftSide>
                <StyledInput />
                <Button size="sm" variant="outline" />
            </LeftSide>
            <Input />
        </ToolbarContainer>
    );

const ToolbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LeftSide = styled.div`
    display: flex;
    gap: 0.5rem;
    flex: 1 1 0%;
    align-items: center;
`;

const StyledInput = styled(Input)`
    width: 150px;
`;

export default ConductorTypeToolbar;
