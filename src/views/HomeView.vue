<template>

    <header>
        <el-icon class="location-icon">
            <Location />
        </el-icon>
        <div class="location-text">
            云南大学软件学院
            <i class="fa fa-caret-down"></i>
        </div>
    </header>

    <div class="search">
        <div class="search-fixed-top">
            <el-input v-model="search_input" @keyup.enter="searchFunction" style="width: 90%;"
                placeholder="搜索饿了么商家、商品名称" />
        </div>
    </div>

    <ul class="foodtype">
        <li>
            <img src="img/dcfl01.png">
            <p>美食</p>
        </li>
        <li>
            <img src="img/dcfl02.png">
            <p>早餐</p>
        </li>
        <li>
            <img src="img/dcfl03.png">
            <p>跑腿代购</p>
        </li>
        <li>
            <img src="img/dcfl04.png">
            <p>汉堡披萨</p>
        </li>
        <li>
            <img src="img/dcfl05.png">
            <p>甜品饮品</p>
        </li>
        <li>
            <img src="img/dcfl06.png">
            <p>速食简餐</p>
        </li>
        <li>
            <img src="img/dcfl07.png">
            <p>地方小吃</p>
        </li>
        <li>
            <img src="img/dcfl08.png">
            <p>米粉面馆</p>
        </li>
        <li>
            <img src="img/dcfl09.png">
            <p>包子粥铺</p>
        </li>
        <li>
            <img src="img/dcfl10.png">
            <p>炸鸡炸串</p>
        </li>
    </ul>

    <div class="banner">
        <h3>品质套餐</h3>
        <p>搭配齐全吃得好</p>
        <a>立即抢购 &gt;</a>
    </div>

    <div class="supermember">
        <div class="left">
            <img src="img/super_member.png">
            <h3>超级会员</h3>
            <p>&#8226; 每月享超值权益</p>
        </div>
        <div class="right">
            立即开通 &gt;
        </div>
    </div>

    <div class="recommend">
        <div class="recommend-line"></div>
        <p>推荐商家</p>
        <div class="recommend-line"></div>
    </div>

    <ul class="recommendtype">
        <li>综合排序<i class="fa fa-caret-down"></i></li>
        <li>距离最近</li>
        <li>销量最高</li>
        <li>筛选<i class="fa fa-filter"></i></li>
    </ul>


</template>


<script>
import { ref } from 'vue'

export default {
    name: "HomeView",
    setup() {
        const search_input = ref('');
        const searchFunction = () => {
            console.log(search_input.value);
        };

        return {
            search_input,
            searchFunction,
        }

    }
}
</script>


<style scoped>
header {
    width: 100%;
    height: 8vw;
    background-color: #0097FF;

    display: flex;
    align-items: center;
}

.location-icon {
    font-size: 5vw;
    color: #FFF;

    margin-left: 5vw;
}

.location-text {
    font-size: 4.5vw;
    font-weight: 700;
    color: #FFF;

    margin-left: 0.5vw;
}

.search {
    width: 100%;
    height: 13vw;
}

.search .search-fixed-top {
    width: 100%;
    height: 13vw;
    background-color: #0097FF;

    display: flex;
    justify-content: center;
    align-items: center;
}

.foodtype {
    width: 100%;
    height: 48vw;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;

    padding-left: 0;
}

.foodtype li {

    width: 18vw;
    height: 20vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    user-select: none;
    cursor: pointer;
}

.foodtype li img {
    width: 12vw;
    height: 10.3vw;
}

.foodtype li p {
    font-size: 3.2vw;
    color: #666;
}

.banner {
    width: 95%;
    margin: 0 auto;
    height: 29vw;


    background-image: url("../img/index_banner.png");
    background-repeat: no-repeat;
    background-size: cover;

    box-sizing: border-box;
    padding: 2vw 6vw;
}

.banner h3 {
    font-size: 4.2vw;
    margin-bottom: 1.2vw;
}

.banner p {
    font-size: 3.4vw;
    color: #666;
    margin-bottom: 2.4vw;
}

.banner a {
    font-size: 3vw;
    color: #C79060;
    font-weight: 700;
}

.supermember {
    width: 95%;
    margin: 0 auto;
    height: 11.5vw;
    background-color: #FEEDC1;
    margin-top: 1.3vw;
    border-radius: 2px;
    color: #644F1B;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.supermember .left {
    display: flex;
    align-items: center;
    margin-left: 4vw;
    user-select: none;
}

.supermember .left img {
    width: 6vw;
    height: 6vw;
    margin-right: 2vw;
}

.supermember .left h3 {
    font-size: 4vw;
    margin-right: 2vw;
}

.supermember .left p {
    font-size: 3vw;
}

.supermember .right {
    font-size: 3vw;
    margin-right: 4vw;
    cursor: pointer;
}

.recommend {
    width: 100%;
    height: 14vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.recommend .recommend-line {
    width: 6vw;
    height: 0.2vw;
    background-color: #888;
}

.recommend p {
    font-size: 4vw;
    margin: 0 4vw;
}

.recommendtype {
    width: 100%;
    height: 5vw;
    margin-bottom: 5vw;

    display: flex;
    justify-content: space-around;
    align-items: center;

    padding-left: 0;
}

.recommendtype li {
    font-size: 3.5vw;
    color: #555;
}
</style>
