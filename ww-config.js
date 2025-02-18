function showObjectPropertyPath(basePropertyKey, { content, boundProps }) { 
    return (
        boundProps[basePropertyKey] &&
        content[basePropertyKey] &&
        typeof wwLib.wwCollection.getCollectionData(content[basePropertyKey])[0] === "object"
    );
}

function getObjectPropertyPathOptions(basePropertyKey, { content }) {
    const data = wwLib.wwCollection.getCollectionData(content[basePropertyKey]);
    if (!data.length || typeof data[0] !== "object") {
        return null;
    }

    return { object: data[0] };
}

export default {
    editor: {
        label: {
            en: "Block Diagram",
        },
        bubble: {
            icon: "shape",
        },
        icon: "shape",
        customSettingsPropertiesOrder: [
            "blocks",
            ["blockKey", "connectedBy", "sortedBy", "sortOrder"],
            "readonly",
            "draggingCursor",
            "customDragHandle",
            ["handleClass"],
        ],
    },
    states: ["readonly"],
    options: {
        displayAllowedValues: ["flex", "inline-flex"],
    },
    triggerEvents: [
        {
            name: "block:moved",
            label: { en: "On block moved" },
            event: {
                block: {},
                from: "",
                to: "",
                oldIndex: 0,
                newIndex: 1,
                updatedList: [],
            },
            getTestEvent: "getTestEvent",
            default: true,
        },
    ],
    properties: {
        blockElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: "5a88036f-22ea-4f8d-b4a5-bc226ef95061",
            },
        },
        wrapBlocks: {
            label: {
                en: "Wrap blocks",
            },
            type: "OnOff",
            defaultValue: true,
            responsive: true,
            bindable: true,
            states: true,
            classes: true,
        },
        blocks: {
            label: {
                en: "Blocks",
            },
            type: "Info",
            options: {
                text: { en: "Bind your data" },
            },
            bindable: true,
            defaultValue: [],
            section: "settings",
        },
        generateBlocksButton: {
            label: {
                en: "Generate Blocks",
            },
            type: "Button",
            section: "settings",
            defaultValue: null,
            onClick: "generateBlocks",
        },
        blockKey: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("blocks", { content, boundProps }),
            label: {
                en: "Block key",
            },
            type: "ObjectPropertyPath",
            options: (content) => getObjectPropertyPathOptions("blocks", { content }),
            defaultValue: null,
            section: "settings",
        },
        connectedBy: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("blocks", { content, boundProps }),
            label: {
                en: "Connected by",
            },
            type: "ObjectPropertyPath",
            options: (content) => getObjectPropertyPathOptions("blocks", { content }),
            defaultValue: null,
            section: "settings",
        },
        sortedBy: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("blocks", { content, boundProps }),
            label: {
                en: "Sorted by",
            },
            type: "ObjectPropertyPath",
            options: (content) => getObjectPropertyPathOptions("blocks", { content }),
            defaultValue: null,
            section: "settings",
        },
        sortOrder: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("blocks", { content, boundProps }) || !content.sortedBy,
            label: {
                en: "Sort order",
            },
            type: "TextRadioGroup",
            options: {
                choices: [
                    {
                        label: { en: "Asc" },
                        value: "asc",
                        default: true,
                    },
                    {
                        label: { en: "Desc" },
                        value: "desc",
                    },
                ],
            },
            defaultValue: "asc",
            bindable: true,
            section: "settings",
        },
        sortable: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("blocks", { content, boundProps }),
            label: {
                en: "Sortable",
            },
            type: "OnOff",
            defaultValue: true,
            section: "settings",
        },
        readonly: {
            label: { en: "Read only" },
            type: "OnOff",
            section: "settings",
            bindable: true,
            defaultValue: false,
        },
        draggingCursor: {
            label: { en: "Dragging cursor" },
            type: "TextSelect",
            section: "settings",
            options: {
                options: [
                    { value: "auto", label: "Auto" },
                    { value: "default", label: "Default" },
                    { value: "pointer", label: "Pointer" },
                    { value: "move", label: "Move" },
                    { value: "grab", label: "Grab" },
                    { value: "grabbing", label: "Grabbing", default: true },
                ],
            },
            bindable: true,
            defaultValue: "grabbing",
        },
        customDragHandle: {
            label: "Custom drag",
            type: "OnOff",
            section: "settings",
            defaultValue: false,
        },
        handleClass: {
            label: "Class name",
            type: "Text",
            bindable: true,
            section: "settings",
            defaultValue: "draggable",
            options: {
                placeholder: "draggable",
            },
        },
    },
};
