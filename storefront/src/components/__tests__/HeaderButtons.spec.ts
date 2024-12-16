import {describe, it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import {createI18n} from "vue-i18n";
import HeaderButtons from "@/components/layout/header/HeaderButtons.vue";
import router from "@/router";

const messages = {
  en: {contact: "Contact"},
  de: {contact: "Kontakt"},
};

describe("HeaderButtons.vue", () => {
  const i18n = createI18n({
    locale: "de",
    fallbackLocale: "de",
    messages,
    legacy: false
  });

  const createWrapper = async (path: string) => {
    const language = path.startsWith("/en") ? "en" : "de";
    i18n.global.locale.value = language;

    await router.push(path);
    await router.isReady();

    return mount(HeaderButtons, {
      global: {
        plugins: [router, i18n],
      },
    });
  };

  it("renders German text for /", async () => {
    const wrapper = await createWrapper("/");
    expect(wrapper.find('[data-test-id="contact"]').text()).toBe("Kontakt");
  });

  it("renders German text for /de", async () => {
    const wrapper = await createWrapper("/de");
    expect(wrapper.find('[data-test-id="contact"]').text()).toBe("Kontakt");
  });

  it("renders English text for /en", async () => {
    const wrapper = await createWrapper("/en");
    expect(wrapper.find('[data-test-id="contact"]').text()).toBe("Contact");
  });

  it("redirects /ru to German text", async () => {
    const wrapper = await createWrapper("/ru");
    expect(wrapper.find('[data-test-id="contact"]').text()).toBe("Kontakt");
  });
});
