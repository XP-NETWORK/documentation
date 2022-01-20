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
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/new/fav-icon.png",
  organizationName: "XP.NETWORK", // Usually your GitHub org/user name.
  projectName: "wiki.xp.network", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/facebook/docusaurus/edit/main/website/",
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: "XP.NETWORK Wiki",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "Home",
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
            title: "Docs",
            items: [
              {
                label: "Wiki",
                to: "/docs/Home",
              },
              {
                label: "Whitepaper v 3.0",
                to: "/docs/Whitepaper3.0/introduction",
              },
            ],
          },
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
            title: "More",
            items: [
              {
                label: "Website",
                href: "https://xp.network",
              },
              {
                label: "GitHub",
                href: "https://github.com/xp-network",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} XP.NETWORK Built with Docusaurus.`,
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
