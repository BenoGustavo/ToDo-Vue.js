export default {
    watch: {
      title(newTitle) {
        document.title = newTitle;
      }
    },
    created() {
      if (this.title) {
        document.title = this.title;
      }
    }
  };