<template>
    <div class="loading">
        <svg version="1.2" height="300" width="400"  viewport="0 0 60 60" >
            <path id="pulsar" stroke="rgba(255,255,255,0.3)" fill="none" stroke-width="3" stroke-linejoin="round" d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210" />
        </svg>
    </div>
</template>

<script>
    export default {
        name: "Ecg"
    }
</script>

<style scoped>
    .loading {
        width: 100%;
        height: 210px;
        padding: 0;

        position: absolute;
    }
     svg {
        width: 100%;
        height: 100%;
    }
    .loading #pulsar {
        stroke-dasharray: 281;
        -webkit-animation: dash 2.5s infinite linear forwards;
        animation: dash 2.5s infinite linear forwards;
    }
    /*Animation*/

    @-webkit-keyframes dash {
        from {
            stroke-dashoffset: 814;
        }
        to {
            stroke-dashoffset: -814;
        }
    }
    @keyframes dash {
        from {
            stroke-dashoffset: 814;
        }
        to {
            stroke-dashoffset: -814;
        }
    }
</style>
