<template>
    
    <div class="container-fluid px-0">
        <div class="card">
            <div class="card-body">
                <slot></slot>
            </div>
        </div>
    </div>

</template>


<script>


export default {
    name: "ContentBase",
}


</script>


<style scoped>

.container-fluid {
    margin-bottom: 50px;
}

</style>