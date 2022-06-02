// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Welcome to the XP.NETWORK Docs",
  tagline: "",
  url: "https://docs.xp.network",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "favicon.png",
  organizationName: "XP.NETWORK", // Usually your GitHub org/user name.
  projectName: "docs.xp.network", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/XP-NETWORK/documentation/blob/main/",
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  // themes: ["@docusaurus/theme-search-algolia"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // If Algolia did not provide you any appId, use 'BH4D9OD16A'
        appId: "H02IL3A4PJ",

        // Public API key: it is safe to commit it
        apiKey: "76386cfbc243f9953cbf09ecd8647be4",

        indexName: "xp_network_docs",

        // Optional: see doc section below
        // contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        // searchParameters: {},

        //... other Algolia params
      },
      navbar: {
        logo: {
          alt: "XP.NETWORK Docs",
          // src: "assets/xp-network-dark.svg",
          src: "/",
        },
        items: [
          {
            type: "doc",
            docId: "home",
            position: "left",
            label: "Home",
          },
          {
            href: "https://github.com/xp-network",
            label: "GitHub",
            position: "left",
          },
          {
            href: "/docs/API/usage",
            label: "API",
            position: "left",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Telegram",
                href: "https://t.me/xp_network",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/XPNetwork_?ref_src=twsrc%5Etfw",
              },
              {
                label: "Medium",
                href: "https://blog.xp.network/",
              },
              {
                label: "Reddit",
                href: "https://www.reddit.com/user/XP_network/",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/xp-network/",
              },
            ],
          },
          {
            title: "Ecosystem",
            items: [
              {
                label: "Website",
                href: "https://xp.network/",
              },
              {
                label: "Bridge",
                href: "https://bridge.xp.network/",
              },
              {
                label: "XPNET-JS API",
                href: "https://xp.network/api/",
              },
              {
                label: "Brand assets",
                href: "https://drive.google.com/drive/folders/1i8evWmyH_8APiDDO89depEw_8JnDSACK",
              },
            ],
          },
          {
            title: "GitHub",
            items: [
              {
                label: "Audits",
                href: "https://github.com/XP-NETWORK/audits",
              },
              {
                label: "JavaScript API",
                href: "https://github.com/XP-NETWORK/xpjs",
              },
              {
                label: "Bridge Factories",
                href: "https://github.com/XP-NETWORK/XP.network-HECO-Migration",
              },
              {
                label: "Documents",
                href: "https://github.com/XP-NETWORK/documentation",
              },
              {
                label: "Language Agnostic REST API",
                href: "https://github.com/XP-NETWORK/xp-rest",
              },
              {
                label: "Bridge UI",
                href: "https://github.com/XP-NETWORK/bridge-interface",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} XP.NETWORK`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      themeConfig: {
        colorMode: {
          defaultMode: "dark",
          disableSwitch: false,
          backgroundColor: "#1D2030",
        },
      },
    }),
};

module.exports = config;
