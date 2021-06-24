/* eslint-disable */
import Clipboard from 'clipboard';

export default {
  bind: (el, binding) => {
    const clipboard = new Clipboard(el, {
      text: () => binding.value.value
    });
    el.success_callback = binding.value.success;
    el.error_callback = binding.value.error;
    clipboard.on('success', e => {
      const callback = el.success_callback;
      callback && callback(e);
    });
    clipboard.on('error', e => {
      const callback = el.error_callback;
      callback && callback(e);
    });
    el.clipboard = clipboard;
  },
  update: (el, binding) => {
    el.clipboard.text = () => binding.value.value;
    el.success_callback = binding.value.success;
    el.error_callback = binding.value.error;
  },
  unbind: (el, binding) => {
    delete el.success_callback;
    delete el.error_callback;
    el.clipboard.destroy();
    delete el.clipboard;
  }
};
