<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Block {
  id: string;
  type: string;
  x: number;
  y: number;
  text: string;
}

const blocks = ref<Block[]>([]);
const selectedBlock = ref<Block | null>(null);
const isDragging = ref(false);
const offsetX = ref(0);
const offsetY = ref(0);

const addBlock = (type: string) => {
  const block: Block = {
    id: `block-${Date.now()}`,
    type,
    x: 100,
    y: 100,
    text: `New ${type}`
  };
  blocks.value.push(block);
};

const startDrag = (event: MouseEvent, block: Block) => {
  selectedBlock.value = block;
  isDragging.value = true;
  
  const element = event.target as HTMLElement;
  const rect = element.getBoundingClientRect();
  
  offsetX.value = event.clientX - rect.left;
  offsetY.value = event.clientY - rect.top;
};

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value || !selectedBlock.value) return;
  
  const canvas = document.querySelector('.canvas') as HTMLElement;
  const rect = canvas.getBoundingClientRect();
  
  selectedBlock.value.x = event.clientX - rect.left - offsetX.value;
  selectedBlock.value.y = event.clientY - rect.top - offsetY.value;
};

const stopDrag = () => {
  isDragging.value = false;
  selectedBlock.value = null;
};

onMounted(() => {
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
});
</script>

<template>
  <div class="flowchart-editor">
    <div class="toolbar">
      <button @click="addBlock('rectangle')">Add Rectangle</button>
      <button @click="addBlock('diamond')">Add Diamond</button>
      <button @click="addBlock('circle')">Add Circle</button>
    </div>
    
    <div class="canvas" @mousemove="onDrag" @mouseup="stopDrag">
      <div
        v-for="block in blocks"
        :key="block.id"
        class="block"
        :class="block.type"
        :style="{ left: block.x + 'px', top: block.y + 'px' }"
        @mousedown="(e) => startDrag(e, block)"
      >
        {{ block.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.flowchart-editor {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}

.toolbar button {
  margin-right: 1rem;
}

.canvas {
  flex: 1;
  position: relative;
  background-color: #fff;
  background-image: 
    linear-gradient(#ccc 1px, transparent 1px),
    linear-gradient(90deg, #ccc 1px, transparent 1px);
  background-size: 20px 20px;
}

.block {
  position: absolute;
  min-width: 100px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 2px solid #333;
  cursor: move;
  user-select: none;
  padding: 10px;
}

.rectangle {
  border-radius: 4px;
}

.diamond {
  transform: rotate(45deg);
}

.diamond > * {
  transform: rotate(-45deg);
}

.circle {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
</style>