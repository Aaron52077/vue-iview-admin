<template>
    <div class="gc-panel">
        <div class="gc-panel__title">VIDEO preview 视频预览</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">示例1</div>
            <sDivider></sDivider>
            <mVideo url="http://vodasqwzlmd.vod.126.net/vodasqwzlmd/9f261a46-71a8-4d1c-bd63-0bc023359d38.mp4" type="mp4"></mVideo>
        </div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">示例2</div>
            <sDivider></sDivider>
            <video id="really-cool-video"
                class="video-js vjs-default-skin vjs-big-play-centered"
                controls
                height="450"
                width="970"
                preload="auto"
                playsinline 
                data-setup="{}">
                <p class="vjs-no-js">
                    您的浏览器需要升级!<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                </p>
            </video>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data () {
        return {
            config: {
                autoplay: false,
                preload: 'auto'
            }
        }
    },
    created() {
        this.handleVideo();
    },
    methods: {
        handleVideo() {
            // 参考https://www.cnblogs.com/afrog/p/6689179.html
            this.dataBase.load('video', () => {
                setTimeout(() => {
                    delete window.videojs.getPlayers()['really-cool-video']
                    let player = window.videojs('really-cool-video', {
                            controlBar: {
                                currentTimeDisplay: true,   // 当前时间
                                fullscreenToggle: true,     // 全屏按钮
                                durationDisplay: false,
                                volumePanel: {
                                    inline: false
                                }
                            },
                            language: 'zh-CN'
                        });
                    player.src({ type: "video/mp4", src: 'http://vodasqwzlmd.vod.126.net/vodasqwzlmd/9f261a46-71a8-4d1c-bd63-0bc023359d38.mp4' });
                }, 0);
            });
        }
    }
}
</script>

<style>
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
}
.video-js.vjs-playing .vjs-tech {
    pointer-events: auto;
}
.video-js .vjs-time-control{ display: block; }
.video-js .vjs-remaining-time{ display: none; }
</style>