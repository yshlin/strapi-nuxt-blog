// import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "prismjs/themes/prism.css";
import Vue from "vue";
import { Viewer } from "@toast-ui/vue-editor";
import chart from "@toast-ui/editor-plugin-chart";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";
import Prism from "prismjs";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
import abc from "@toast-ui/editor-plugin-abc";
import alphaTex from "@toast-ui/editor-plugin-alphatex";
import mathjax from "@toast-ui/editor-plugin-mathjax";

Vue.component("TuiEditorViewer", {
  extends: Viewer,
  props: {
    initialEditType: {
      type: String,
      default: () => "markdown",
    },
    options: {
      type: Object,
      default: () => {
        return {
          plugins: [
            [codeSyntaxHighlight, { highlighter: Prism }],
            tableMergedCell,
            chart,
            uml,
            abc,
            alphaTex,
            mathjax,
          ],
        };
      },
    },
  },
});
