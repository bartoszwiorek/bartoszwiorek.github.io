import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Privacy","description":"How wiorek.net handles consent, optional Ackee analytics and external services, and how to contact Bartosz Wiorek about privacy.","frontmatter":{"title":"Privacy","description":"How wiorek.net handles consent, optional Ackee analytics and external services, and how to contact Bartosz Wiorek about privacy."},"headers":[],"relativePath":"privacy.md","filePath":"privacy.md"}');
const _sfc_main = { name: "privacy.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="privacy-simply-put" tabindex="-1">Privacy, simply put. <a class="header-anchor" href="#privacy-simply-put" aria-label="Permalink to &quot;Privacy, simply put.&quot;">​</a></h1><p>This is the personal website of Bartosz Wiorek. For questions about your privacy, contact <a href="mailto:bartoszwiorek@gmail.com" target="_blank" rel="noreferrer">bartoszwiorek@gmail.com</a>.</p><h2 id="your-choice" tabindex="-1">Your choice <a class="header-anchor" href="#your-choice" aria-label="Permalink to &quot;Your choice&quot;">​</a></h2><p>When consent management is enabled, Cookiebot lets you choose which optional services may run. You can revisit your choice using “Cookie settings” in the footer. Without consent management configured, optional analytics remain disabled.</p><h2 id="website-analytics" tabindex="-1">Website analytics <a class="header-anchor" href="#website-analytics" aria-label="Permalink to &quot;Website analytics&quot;">​</a></h2><p>When configured, this website uses Ackee to understand visits. Tracking starts only after you allow the statistics category in Cookiebot. Detailed visitor tracking is disabled. Withdrawing statistics consent stops further visit-duration updates; it does not remove data already sent.</p><h2 id="external-services" tabindex="-1">External services <a class="header-anchor" href="#external-services" aria-label="Permalink to &quot;External services&quot;">​</a></h2><p>Cookiebot is loaded when configured to manage your preferences. Ackee connects to the website owner&#39;s configured analytics server only after statistics consent. These services receive network requests, which include your IP address. Hosting also processes requests to deliver this website.</p><p>LinkedIn opens an external website with its own privacy practices. Sending an email uses your chosen email provider.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("privacy.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const privacy = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  privacy as default
};
