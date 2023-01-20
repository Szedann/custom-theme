<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
  import { onMount } from "svelte";
  import { editor } from "monaco-editor";
  let editorDiv: HTMLDivElement | null;

  let hostname = "";
  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    hostname = new URL(tabs[0].url).hostname;
  });

  const setTabCss = async (css: string) => {
    chrome.storage.local.set({ [hostname]: css });
  };
  onMount(() => {
    self.MonacoEnvironment = {
      getWorker: () => new cssWorker(),
    };
    const x = editor.create(editorDiv, {
      language: "css",
      theme: "vs-dark",
    });
    x.onKeyUp(() => {
      setTabCss(x.getValue());
    });
    chrome.storage.local.get().then((data) => {
      x.setValue(data[hostname] || "");
    });
  });
</script>

<main>
  <h1 class="hostname">{hostname}</h1>
  <div bind:this={editorDiv} class="editor" />
</main>

<style>
  .editor {
    width: 450px;
    height: 500px;
  }
  .hostname {
    text-align: center;
  }
</style>
