import Vue from 'vue';
import RichTextEditor from '@digitalnatives/rich-text-editor';

// Create our vue instance
new Vue({
    el: ".tiptap-wrapper",
    components: {
        'tiptap-editor': RichTextEditor,
    },
});

// Accept HMR as per: https://webpack.js.org/api/hot-module-replacement#accept
if (module.hot) {
    module.hot.accept();
}
