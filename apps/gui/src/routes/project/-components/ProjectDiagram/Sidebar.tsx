import { useDnD } from "./DnDContext";

export default function Sidebar() {
    const [_, setType] = useDnD();

    function onDragStart(event, nodeType) {
        setType(nodeType);
        event.dataTransfer.effectAllowed = "move";
    }

    return (
        <aside className="w-72 bg-background border rounded p-4">
            <div
                className="h-5 p-1 border rounded mb-2 flex justify-center items-center cursor-grab"
                draggable
                onDragStart={(event) => onDragStart(event, "source")}
            >
                Source
            </div>

            {/* <Button disabled={!dirty} onClick={handleSave}>
                Save
            </Button> */}
        </aside>
    );
}
