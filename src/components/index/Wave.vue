<template>
    <div><canvas id="canvi"></canvas></div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    // import {addresize, run} from "./wave1";

    // eslint-disable-next-line no-unused-vars
    // import {addresize,  run} from "@/components/wave1";
    // import i from 'https://s1.ax1x.com/2020/05/25/t9Cmx1.jpg'
    export default {
        name: "Wave",
        mounted() {
            let c = document.getElementById('canvi');
            let $ = c.getContext('2d');

            let w = c.width = window.innerWidth;
            let h = c.height = window.innerHeight;
            let img=new Image()
            img.src='https://s1.ax1x.com/2020/05/25/t9Cmx1.jpg'
            let pat=$.createPattern(img,'repeat-y')
            img.onload=function () {
                pat=$.createPattern(img,'repeat-y')
                run()
            }
            const txt = function () {
                const _t = "".split("").join(String.fromCharCode(0x2004));
                $.font = "pt sans";
                $.fillStyle = 'hsla(277, 90%, 50%, .8)';
                $.fillText(_t, (c.width - $.measureText(_t).width) * 0.5, c.height * 0.5);
                return _t;
            };

            const draw = function (a, b, t) {
                $.lineWidth = 0.8;
                // let  my_gradient  =  $.createLinearGradient(0,0,0,h)
                // my_gradient.addColorStop(0,"#F4A7B9")
                // my_gradient.addColorStop(1,"#FADBD8")
                // $.fillStyle = my_gradient;
                $.fillStyle=pat
                $.fillStyle=pat
                $.fillRect(0,0,w,h);
                for (let i = -60; i < 60; i += 1) {
                    $.strokeStyle = 'hsla(0,15%,40%, .15)';
                    $.beginPath();
                    $.moveTo(0, h / 2);
                    for (let j = 0; j < w; j += 10) {
                        $.lineTo(10 * Math.sin(i / 10) +
                            j + 0.008 * j * j,
                            Math.floor(h / 2 + j / 2 *
                                Math.sin(j / 50 - t / 50 - i / 118) +
                                (i * 0.9) * Math.sin(j / 25 - (i + t) / 65)));
                    }
                    $.strokeStyle="white"
                    $.stroke();
                }
            };
            let t = 0;

                window.addEventListener('resize', function () {
                    c.width = w = window.innerWidth;
                    c.height = h = window.innerHeight;
                    $.fillStyle = 'hsla(277, 95%, 55%, 1)';
                }, false);


            const run = function () {
                window.requestAnimationFrame(run);
                t += 5;
                draw(33, 52 * Math.sin(t / 2400), t);
                txt();
            };

        }
    }
</script>

<style scoped>
    #canvi{
        position: absolute;
        width: 100%;
        height: 250px;
        /*background: rgba(0,0,0,0);*/

    }
</style>
