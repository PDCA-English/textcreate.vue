<template>
  <div id="app">
    <router-view/>
    <PDFJSViewer :path="`${path}`" :fileName="`${name}`"/>
  </div>
</template>


<script>
import PDFJSViewer from './components/PDFJSViewer'

export default {
  name: 'app',
  components: {
    PDFJSViewer
  },
  data () {
    return {
      name: 'demo.pdf', //change which pdf file loads
      path: 'lib/pdfjs-2.3.200-dist/web/viewer.html' //path of the PDF.js viewer.html
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
