import type { ProjectImage } from "@/data/projects";
import type { CaseStudy } from "./types";

const image = (
  file: string,
  alt: string,
  width: number,
  height: number,
): ProjectImage => ({
  src: `/images/case-studies/personal-projects/${file}`,
  alt,
  width,
  height,
});

// Figma "Case Study - Personal Projects" (450:352).
export const personalProjects: CaseStudy = {
  slug: "personal-projects",
  title: "Personal Projects",
  intro: [
    "Beyond web development, I build apps and tools to solve problems in my own workflows. These projects let me explore new technologies, experiment with ideas, and create software tailored to how I work.",
  ],
  files: [
    {
      name: "Personal Accountant",
      watermarkRepeats: 33,
      watermarkWidth: 1371,
      number: "4001",
      details: [
        { label: "Role", value: "Product Designer & Developer" },
        { label: "Platform", value: "Desktop & Android" },
        { label: "Technologies", value: "Python, PySide6, Kivy, SQLite" },
        { label: "Status", value: "Functional; ongoing development" },
      ],
      fold: "top",
      sections: [
        {
          title:
            "A personal finance tool, built around the way I manage money.",
          body: [
            [
              "I wanted a better way to track cash flow, manage budgets, and understand where my money goes. After relying on spreadsheets and finding existing apps that didn't fit my needs, I decided to build a solution tailored to my own financial workflow.",
            ],
            [
              "What began as an experiment with Python grew into a usable desktop application with an Android companion, making it easier to record transactions and monitor my finances.",
            ],
          ],
          media: {
            type: "image",
            image: image(
              "pa-cashflow.webp",
              "Cash Flow window: Add Expense and Transfer Money buttons, balances for On-hand, BDO, GCash and the total, and a table of dated transactions with prices and Edit buttons",
              1008,
              837,
            ),
            maxWidth: 1008,
          },
        },
        {
          title: "From Spreadsheets to a Dedicated Application",
          body: [
            [
              "I had been tracking income, expenses, and budgets in a spreadsheet, but I wanted a more dedicated workflow for recording transactions and understanding my financial position. Around the same time, I was experimenting with Python scripts for personal use in WSL.",
            ],
            [
              "During the Christmas break of 2025, I brought those interests together and began developing Personal Accountant—a tool designed around my own financial tracking needs.",
            ],
          ],
        },
        {
          title: "The Desktop Application",
          body: [
            [
              "The desktop app is the primary platform, providing the core functionality for managing financial records. It stores transactions in a database, supports monthly spending reviews, and brings balances across bank accounts, e-wallets, and cash into one view.",
            ],
            [
              "This gives me a clearer picture of my overall cash position and helps me monitor how money moves across my accounts.",
            ],
          ],
          media: {
            type: "images",
            items: [
              {
                image: image(
                  "pa-add-expense.webp",
                  "Add Expense window with fields for date, item name, amount, source account, category checkboxes and a description",
                  518,
                  775,
                ),
                caption: "Add expense window.",
              },
              {
                image: image(
                  "pa-transfer-money.webp",
                  "Transfer Money window with a date, withdraw, transfer or income options, from and to accounts, an amount and a note",
                  519,
                  776,
                ),
                caption: "Transfer money window.",
              },
            ],
          },
        },
        {
          title: "A Mobile Companion for Everyday Spending",
          body: [
            [
              "I also developed an Android version to complement the desktop application. The goal was to make transaction recording more convenient when I'm away from home, so I can capture spending as it happens and incorporate those records into my desktop workflow later.",
            ],
            [
              "Rather than duplicating the desktop experience, the mobile app serves as a companion to the primary application.",
            ],
          ],
          // Figma "Frame 51" (477:37).
          media: {
            type: "images",
            layout: { gap: 60, maxWidth: 706 },
            items: [
              {
                image: image(
                  "pa-mobile-home.webp",
                  "Android home screen of Personal Accountant: account balances and total, with Add Expense, Transfer Money, View Records and Download DB buttons",
                  1080,
                  2340,
                ),
              },
              {
                image: image(
                  "pa-mobile-transfer.webp",
                  "Android Transfer Money screen with a date, transaction type, from and to accounts, amount and note, and Save and Back buttons",
                  1080,
                  2340,
                ),
              },
            ],
          },
        },
        {
          title: "A Desktop-First, Cross-Platform Workflow",
          body: [
            [
              "The desktop application serves as the primary environment for managing financial records. Its main window presents a cash flow table with transaction dates, item names, and amounts, alongside individual account balances and a combined total across accounts.",
            ],
            [
              "To extend this workflow to Android, I implemented a file-based transfer process using Google Drive. The desktop database is stored in a Drive folder, allowing its changes to be uploaded to the cloud. The mobile app can download that database using its Google Drive file ID, giving me access to the records while away from my computer.",
            ],
            [
              "For transactions recorded on mobile, the app creates a database dump that I transfer back to the desktop environment. This approach provides a practical way to move financial records between platforms without requiring a dedicated synchronization service.",
            ],
            [
              "The current workflow replaces the desktop database with the transferred mobile copy, prioritizing simplicity for the initial prototype. A more robust approach to merging records remains a potential future improvement.",
            ],
          ],
          media: {
            type: "flow",
            steps: [
              {
                kind: "box",
                icon: "monitor",
                title: "Desktop application",
                detail: "PySide6 · Primary interface · SQLite database",
              },
              {
                kind: "link",
                icon: "arrows-up-down",
                text: "Database file upload / download",
              },
              {
                kind: "box",
                icon: "cloud",
                title: "Google Drive",
                detail: "Cloud-hosted copy of the desktop database",
              },
              {
                kind: "link",
                icon: "arrows-up-down",
                flip: true,
                text: "Download database to mobile; transfer database dump back to desktop",
              },
              {
                kind: "box",
                icon: "phone",
                title: "Android companion",
                detail: "Kivy · Transaction entry · Database download",
              },
            ],
          },
        },
        {
          title: "Prioritizing a Working Prototype",
          body: [
            [
              "With limited time before returning to regular work, I focused on delivering a usable application across desktop and Android. Rather than building a complex synchronization system, I implemented a straightforward file-based workflow using Google Drive and database exports.",
            ],
            [
              "This approach let me establish the core functionality first, while leaving room to improve data merging and synchronization in future iterations.",
            ],
          ],
        },
        {
          title: "Project status",
          body: [
            [
              "Personal Accountant is a functional personal project that I'm continuing to develop. My next planned improvement is filtering cash flow by spending category, making it easier to understand monthly spending on different commodities and use that information to make more informed financial decisions.",
            ],
            [
              "Longer term, I plan to revisit the data-transfer workflow and explore safer ways to merge records between desktop and mobile.",
            ],
          ],
        },
      ],
    },
  ],
};
