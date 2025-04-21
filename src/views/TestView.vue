<template>

    <div class="row bg-primary text-white d-flex align-items-center mx-0" style="height:40px">
        <div class="col text-center">
            测试
        </div>
    </div>

    <Content>
    </Content>

    <div class="Test">
        <div>
        </div>
        <div class="Test-son">
            <p>A</p>
            <p>B</p>
            <p>C</p>
            <p>D</p>
        </div>
    </div>



</template>


<script>
import Content from '@/components/ContentBase.vue';

export default {
    name: "TestView",
    components: {
        Content,
    }
}
</script>

<style scoped>
.Test {
    display: flex;
    flex-direction: row;
    justify-content: center;

    background-color: blue;
}

.Test-son {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

p {
    background-color: red;
    margin: 0px;
    padding: 0px;
}
</style>