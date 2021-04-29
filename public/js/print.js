const dummyClient = {
    post(callback) {
      setTimeout(() => {
        callback();
      }, 1500);
    } };
  
  
  
  /**
   * Simple state management Store
   *
   * @plugin
   * @example
   * new Store({
   *   form: {
   *     state: {},
   *     getters: {},
   *     actions: {},
   *   }
   * });
   *
   * {
   *   computed: {
   *     formState() {
   *       return this.$store.form.state,
   *     },
   *   },
   * }
   */
  class Store {
    constructor(obj) {
      this.hydrateStore(obj);
  
      Vue.prototype.$store = this;
    }
  
    hydrateStore(obj) {
      for (const k in obj) {
        this[k] = {
          state: Vue.observable(obj[k].state || {}),
          getters: obj[k].getters || {},
          actions: obj[k].actions || {} };
  
      }
    }}
  ;
  
  
  /**
   * File drag and drop/upload
   *
   * @component
   * @example
   * {
   *   data: {
   *     files: [],
   *     filePickerTrigger: {},
   *   },
   *   template: `
   *     <file-drop
   *       :picker-trigger="filePickerTrigger"
   *       multiple
   *       v-model="files"
   *     >
   *       <template #content>
   *         <button @click="filePickerTrigger = $event">
   *           Upload
   *         </button>
   *       </template>
   *     </file-drop>
   *   `,
   * }
   */
  const FileDrop = {
    name: 'file-drop',
    inheritAttrs: false,
    model: {
      prop: 'model',
      event: 'change' },
  
    props: {
      model: {
        type: Array,
        required: true },
  
      pickerTrigger: {}, // event
      showPickerButton: Boolean,
      disabled: Boolean,
      multiple: Boolean,
      accept: [String, Array] },
  
    data: vm => ({
      dragover: false,
      files: [],
      localValue: vm.model }),
  
    computed: {
      stateClasses() {
        return {
          'disabled': this.disabled,
          'dragover': this.dragover };
  
      },
      acceptTypes() {
        const types = this.accept;
  
        return Array.isArray(types) ? types.join(',') : types;
      } },
  
    watch: {
      pickerTrigger() {
        this.openPicker();
      } },
  
    methods: {
      onFileDrop($event) {
        const droppedFiles = $event.dataTransfer.files;
  
        if (!droppedFiles) {
          return;
        };
  
        this.dragover = false;
  
        this.addFiles(droppedFiles);
      },
  
      onFileUpload($event) {
        const fileList = $event.target.files;
  
        this.addFiles(fileList);
      },
  
      openPicker() {
        this.$refs.input.click();
      },
  
      addFiles(fileList) {
        // convert FileList to array
        const files = [...fileList];
  
        if (this.multiple) {
          files.forEach(file => this.localValue.push(file));
        } else {
          this.localValue = [files[0]];
        }
  
        this.$emit('change', this.localValue);
      } },
  
    template: `
          <div
              :class="['file-drop', stateClasses]"
              @drop.prevent="onFileDrop"
              @dragover.prevent="dragover = true"
              @dragleave.prevent="dragover = false"
          >
              <slot name="content"></slot>
  
              <button
                  v-if="showPickerButton"
                  type="button"
                  :class="['file-drop-button']"
                  @click="openPicker"
              >
                  <slot name="button"></slot>
              </button>
  
              <input
                  type="file"
                  ref="input"
                  v-bind="$attrs"
                  enctype="multipart/form-data"
                  :multiple="multiple"
                  :accept="acceptTypes"
                  :style="{ display: 'none' }"
                  @change="onFileUpload"
              />
          </div>
      ` };
  
  
  
  /**
   * Button with loading and success states
   *
   * @component
   */
  const AppButton = {
    props: {
      loading: {
        type: Boolean },
  
      success: {
        type: Boolean } },
  
  
    methods: {
      onClick() {
        this.$emit('click');
      } },
  
    template: `
          <button type="button" class="button" @click="onClick">
              <template v-if="loading">
                  <div class="spinner"></div>
              </template>
              <template v-else-if="success">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                      <path fill="#fff" d="M13.5 24.26L7.24 18l-2.12 2.12 8.38 8.38 18-18-2.12-2.12z" />
                  </svg>
              </template>
              <slot v-else></slot>
          </button>
      ` };
  
  
  
  /**
   * File upload view
   *
   * @component
   */
  const FileUpload = {
    name: 'file-upload',
    components: {
      FileDrop,
      AppButton },
  
    data: () => ({
      filePickerTrigger: {} // event
    }),
    computed: {
      request() {
        return this.$store.upload.state.request;
      },
      files: {
        get() {
          return this.$store.upload.state.files;
        },
        set(value) {
          this.$store.upload.state.files = value;
        } } },
  
  
    methods: {
      onUpload() {
        this.$store.upload.actions.doUploadFile();
      } },
  
    template: `#file-upload-tpl` };
  
  
  
  /**
   * File uploaded view
   *
   * @component
   */
  const FileUploaded = {
    name: 'file-uploaded',
    components: {
      AppButton },
  
    computed: {
      fileName() {
        return this.$store.upload.getters.fileName();
      } },
  
    methods: {
      onReset() {
        this.$store.upload.actions.resetState();
      } },
  
    template: `#file-uploaded-tpl` };
  
  
  
  /**
   * Global state
   *
   */
  const defaultState = () => ({
    files: [],
    request: {
      uploading: false,
      uploaded: false },
  
    activeView: FileUpload });
  
  
  const state = defaultState();
  
  const getters = {
    fileName() {
      return state.files.length ? state.files[0].name : '';
    } };
  
  
  const actions = {
    doUploadFile() {
      state.request.uploading = true;
  
      dummyClient.post(() => {
        state.request.uploading = false;
        state.request.uploaded = true;
        actions.setView(FileUploaded);
      });
    },
  
    setView(component) {
      state.activeView = component;
    },
  
    resetState() {
      Object.assign(state, defaultState());
    } };
  
  
  new Store({
    upload: {
      state,
      getters,
      actions } });
  
  
  
  
  /**
   * Root instance
   *
   */
  new Vue({
    el: '#app',
    computed: {
      activeView() {
        return this.$store.upload.state.activeView;
      },
      transitionName() {
        return this.activeView.name === 'file-uploaded' ? 'v-view-next' : 'v-view-back';
      } } });