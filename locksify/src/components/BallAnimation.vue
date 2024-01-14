<template>
    <div class="shadow" id="ball1"></div>
    <div class="shadow" id="ball2"></div>
</template>

<script>
function getRandomPosition() {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 150; 

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    return { x: randomX, y: randomY };
}

const ball1 = document.getElementById("ball1");
const ball2 = document.getElementById("ball2");

function setRandomPosition(element) {
    const { x, y } = getRandomPosition();
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

function animateBalls() {
    setRandomPosition(ball1);
    setRandomPosition(ball2);

   
    requestAnimationFrame(animateBalls);
}


setRandomPosition(ball1);
setRandomPosition(ball2);

animateBalls();

window.addEventListener("resize", () => {
    setRandomPosition(ball1);
    setRandomPosition(ball2);
});
</script>

<style scoped>
    body {
        margin: 0;
        overflow: hidden;
    }

    .shadow {
        position: absolute;
        width: 250px;
        height: 250px;
        background-color: #3498db;
        border-radius: 50%;
        filter: blur(50px); /* Dodajemo efekt zamućenja */
    }

    #ball1{
        background-color: #ae34eb;
    }

    #ball2{
        background-color: #8334eb;
    }
</style>