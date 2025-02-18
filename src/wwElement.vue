<template>
    <div class="workspace" @click="addBlock($event)">
        <div
            v-for="(block, index) in blocks"
            :key="block.id"
            class="block"
            :style="{ left: block.x + 'px', top: block.y + 'px' }"
            @mousedown="startDrag($event, index)"
        >
            {{ block.label }}
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const blocks = ref([]);
        let draggingBlock = null;

        const addBlock = (event) => {
            blocks.value.push({
                id: Date.now(),
                label: "Bloco",
                x: event.clientX - 50,
                y: event.clientY - 25,
            });
        };

        const startDrag = (event, index) => {
            draggingBlock = { index, offsetX: event.offsetX, offsetY: event.offsetY };
            window.addEventListener("mousemove", drag);
            window.addEventListener("mouseup", stopDrag);
        };

        const drag = (event) => {
            if (draggingBlock) {
                const block = blocks.value[draggingBlock.index];
                block.x = event.clientX - draggingBlock.offsetX;
                block.y = event.clientY - draggingBlock.offsetY;
            }
        };

        const stopDrag = () => {
            draggingBlock = null;
            window.removeEventListener("mousemove", drag);
            window.removeEventListener("mouseup", stopDrag);
        };

        return { blocks, addBlock, startDrag };
    },
};
</script>

<style scoped>
.workspace {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #f4f4f4;
    overflow: hidden;
}

.block {
    position: absolute;
    width: 100px;
    height: 50px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: grab;
}

.block:active {
    cursor: grabbing;
}
</style>

