# Pages to create in Framer

Create these native Framer page paths and place the BalerionSite component inside each one:

| Framer URL | Page property | Detail slug |
|---|---|---|
| `/` | Home | blank |
| `/product` | Product | blank |
| `/research` | Research | blank |
| `/team` | Team | blank |
| `/security` | Security | blank |
| `/press` | Press | blank |
| `/careers` | Careers | blank |
| `/careers/software-engineer` | Job | software-engineer |
| `/careers/forward-deployed-engineer` | Job | forward-deployed-engineer |
| `/careers/ai-engineer` | Job | ai-engineer |

Case studies use `/case-studies/<slug>` with Page set to **Case study**. The exact current slugs are also listed in the package validation report and in `source/src/lib/testimonials.ts`.

Keep all these paths unchanged so navigation, Apply links, and case-study links resolve correctly. The three job IDs are also the allowed application `roleId` values.

`#how-it-works` and `#open-roles` are in-page anchors, not separate Framer pages. Existing job links may include `#application`; that opens the application tab on the selected role.
