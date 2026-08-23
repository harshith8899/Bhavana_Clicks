# Photography Website

## Project Rules & Development Guidelines

> This document is the **single source of truth for AI-assisted development of this project**.
>
> Every AI pair-programming session must read and follow this document before making changes.

---

# 1. Project Vision

Build a professional photography portfolio and business website that allows:

1. Visitors to explore the photographer's work.
2. Visitors to view photography categories and services.
3. Visitors to view pricing/packages.
4. Visitors to submit enquiries.
5. The photographer to receive enquiry notifications.
6. The photographer/admin to manage enquiries.
7. The photographer/admin to manage photography content.
8. The photographer/admin to upload and manage images/videos through Cloudinary.
9. The website to dynamically load content from Firebase.
10. The final website to be production-ready and deployable.

The website should eventually function as a **photography business management + portfolio platform**, not just a static portfolio.

---

# 2. Current Technology Stack

The current project uses:

* React
* Vite
* React Router
* Plain CSS
* Firebase Firestore
* Firebase Authentication — to be implemented
* Cloudinary — media hosting
* Git/GitHub

Current project audit indicates:

* React 19
* Vite 8
* React Router DOM 7
* Firebase SDK 12
* Cloudinary currently used through manually stored URLs
* No custom backend server currently exists

The existing application is a frontend SPA that communicates directly with Firebase.

---

# 3. Core Architecture

The target architecture is:

```text
                         ┌────────────────────┐
                         │      Visitor       │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │   React Website    │
                         └─────────┬──────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
                ▼                  ▼                  ▼
           Firestore          Cloudinary          Email
                │                  │                  │
                │                  │                  │
                ▼                  ▼                  ▼
          Website Data        Images/Videos       Enquiries
                                   │
                                   │
                                   ▼
                         ┌────────────────────┐
                         │   Admin Dashboard  │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         Firebase Authentication
```

The exact implementation may evolve, but the system should maintain clear separation between:

* UI
* Data access
* Authentication
* Media management
* Business logic
* Configuration

---

# 4. Main Functional Areas

The completed project should contain these major areas.

## Public Website

* Home
* About
* Gallery
* Weddings
* Couples
* Elopement Guides
* Services
* Pricing
* Contact

## Enquiry System

* Contact form
* Firestore persistence
* Email notification
* Enquiry status
* Admin enquiry management

## Admin System

* Admin login
* Protected admin routes
* Dashboard
* Enquiry management
* Gallery management
* Media management
* Logout

## Media System

* Cloudinary image storage
* Cloudinary video support
* Media URLs stored in Firestore
* Image metadata
* Categories
* Featured images
* Ordering

---

# 5. Development Philosophy

This project is being developed using **AI as a pair programmer**.

The AI is NOT the sole developer.

The AI should:

* Inspect before changing.
* Explain before making architectural changes.
* Make small logical changes.
* Test after changes.
* Report what changed.
* Avoid unnecessary refactoring.
* Preserve working functionality.
* Never assume missing information.
* Ask when an architectural decision is unclear.

The AI must behave like a careful senior developer working alongside the project owner.

---

# 6. Golden Rule

## DO NOT BREAK WORKING FEATURES TO IMPLEMENT NEW FEATURES.

Before modifying existing functionality:

1. Understand the existing implementation.
2. Identify dependencies.
3. Determine whether the change affects other pages.
4. Make the smallest appropriate change.
5. Test the affected functionality.
6. Test related functionality.
7. Commit the change.

---

# 7. Development Phases

The project will be developed in controlled phases.

---

## Phase 1 — Stabilization + Enquiries

### Goal

Make the existing website reliable and complete the enquiry workflow.

### Deliverables

* Existing website stabilized
* Broken image references fixed
* Contact form connected to Firestore
* Enquiries persisted
* Email notification system
* Firebase Authentication
* Protected admin login
* Admin enquiry dashboard
* Enquiry status management
* Firebase security rules verified

### Result

```text
Visitor
   ↓
Contact Form
   ↓
Firestore
   ↓
Email Notification
   ↓
Admin Dashboard
```

---

## Phase 2 — Dynamic Photography Content

### Goal

Move the photography content from hardcoded/local references to a proper Firebase + Cloudinary data system.

### Deliverables

* Firestore gallery data model
* Gallery retrieval service
* Dynamic Gallery page
* Dynamic Weddings page
* Dynamic Couples page
* Dynamic Elopement content
* Dynamic Home gallery
* Loading states
* Empty states
* Error handling
* Image metadata

### Result

```text
Cloudinary
    ↓
Image URL
    ↓
Firestore
    ↓
React
    ↓
Public Website
```

---

## Phase 3 — Full Admin Content Management

### Goal

Allow the photographer to manage website content without modifying code.

### Deliverables

* Admin dashboard
* Gallery management
* Image upload
* Image update
* Image deletion
* Category management
* Featured image management
* Image ordering
* Video management
* Cloudinary integration
* Content management UI

### Result

```text
Admin
  ↓
Upload Media
  ↓
Cloudinary
  ↓
Firestore Metadata
  ↓
Public Website
```

---

## Phase 4 — Production & Business Features

### Goal

Make the website production-ready.

### Deliverables

* Services page
* Final public UI
* SEO
* Responsive optimization
* Performance optimization
* Image optimization
* Error handling
* Security review
* Firebase rules review
* Deployment
* Production environment variables
* Production testing
* Final documentation

---

# 8. Phase Discipline

Do not skip phases unnecessarily.

However, phases may overlap when a dependency requires it.

For example:

```text
Phase 1
   ↓
Establish enquiry data model
   ↓
Phase 3
   ↓
Admin manages same enquiry data
```

The same data model should not be redesigned repeatedly without a clear reason.

---

# 9. Data Architecture Rules

Firebase Firestore should contain **application data and metadata**.

Cloudinary should contain **media files**.

Do not store large media files directly in Firestore.

Recommended architecture:

```text
Cloudinary
├── Images
└── Videos

Firestore
├── gallery
├── enquiries
├── about_images
├── admins
└── other content collections
```

Firestore should store information such as:

```text
id
title
category
description
mediaUrl
thumbnailUrl
publicId
type
featured
order
createdAt
updatedAt
```

The exact schema should be finalized before implementing the corresponding feature.

---

# 10. Enquiry Data Rules

Enquiries should contain the minimum information required by the business.

Possible structure:

```text
enquiries
├── id
├── name
├── email
├── phone
├── eventType
├── eventDate
├── message
├── status
├── createdAt
└── updatedAt
```

Possible statuses:

```text
new
contacted
completed
archived
```

Do not add unnecessary fields without a functional reason.

---

# 11. Authentication Rules

Admin functionality must never rely on frontend-only protection.

The target model is:

```text
User
 ↓
Firebase Authentication
 ↓
Authenticated Admin
 ↓
Firestore Security Rules
 ↓
Authorized Data
```

The frontend hiding `/admin` is NOT considered security.

Firebase security rules must enforce access control.

---

# 12. Firestore Security Rules

Security rules are mandatory before production deployment.

At minimum:

### Public users

Should be able to:

* Read publicly intended content.
* Create an enquiry.

Should NOT be able to:

* Read other enquiries.
* Modify enquiries.
* Delete enquiries.
* Modify gallery data.
* Modify website content.

### Admin

Should be able to:

* Read enquiries.
* Update enquiry status.
* Manage gallery content.
* Manage authorized website content.

Exact rules must be designed around the final authentication model.

---

# 13. Cloudinary Rules

Cloudinary is responsible for media storage and delivery.

Do not expose Cloudinary secrets in frontend code.

The AI must distinguish between:

### Public configuration

Safe to expose where appropriate.

### Private credentials

Must never be committed.

Never place:

* API secrets
* service-account JSON
* private keys
* authentication tokens

inside Git.

---

# 14. Environment Variables

Environment-specific configuration should eventually use environment variables.

Example:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Only values intended for frontend exposure should use `VITE_` variables.

Secrets must never be placed in frontend environment variables if doing so would expose them to the browser.

---

# 15. Email Rules

Email functionality must be implemented securely.

The frontend must NOT contain private email API credentials.

Preferred architecture:

```text
Contact Form
     ↓
Firestore
     ↓
Secure server-side/email mechanism
     ↓
Photographer Email
```

An email failure should not cause the enquiry itself to be lost.

The enquiry should be persisted first or otherwise handled with reliable failure semantics.

---

# 16. Admin Dashboard Rules

The admin dashboard should remain simple.

Do not build unnecessary enterprise features.

Initial admin system:

```text
/admin/login
/admin/dashboard
/admin/enquiries
/admin/gallery
```

Features should be added only when required.

Avoid:

* complicated state management without need
* unnecessary UI libraries
* over-engineered permissions
* unnecessary backend infrastructure

---

# 17. UI/UX Rules

The existing design should be preserved unless a redesign is explicitly requested.

AI must not:

* Replace the entire UI unnecessarily.
* Introduce Tailwind if the project uses plain CSS.
* Replace the styling system without approval.
* Change branding without approval.
* Change typography globally without a reason.
* Remove existing animations without verification.

Use the existing component and CSS structure wherever practical.

---

# 18. Responsive Design

Every new feature must work on:

* Desktop
* Laptop
* Tablet
* Mobile

At minimum test:

```text
Desktop
Tablet
Mobile
```

Admin pages must also be usable on smaller screens unless there is a specific reason not to.

---

# 19. Code Organization

Keep responsibilities separated.

Preferred structure:

```text
src/
├── components/
├── pages/
├── services/
├── firebase/
├── routes/
├── hooks/
├── styles/
└── utils/
```

Do not put:

* Firebase queries directly into every component.
* Large business logic inside JSX.
* Authentication logic randomly across pages.
* Cloudinary logic directly into unrelated UI components.

Use service/helper layers where appropriate.

---

# 20. AI Pair Programmer Rules

Before changing code, the AI should:

### Step 1 — Inspect

Understand the relevant files.

### Step 2 — Explain

State:

* What is wrong.
* Why it is wrong.
* Which files need modification.
* What the proposed solution is.

### Step 3 — Implement

Make only the requested logical change.

### Step 4 — Test

Run the appropriate checks.

### Step 5 — Report

Explain:

* Files changed.
* What changed.
* Test results.
* Any remaining issues.

### Step 6 — Commit

Only after verification.

---

# 21. No Unrequested Changes

The AI must NOT:

* Rewrite unrelated components.
* Upgrade dependencies without approval.
* Change frameworks.
* Change architecture unnecessarily.
* Rename large groups of files.
* Delete code simply because it looks unused.
* Modify Firebase configuration without explaining why.
* Modify Cloudinary configuration without explaining why.
* Change deployment infrastructure without approval.

If unrelated problems are discovered, report them separately.

---

# 22. Dependency Rules

Before adding a package, determine whether the functionality can reasonably be implemented using:

1. Existing dependencies.
2. Native browser functionality.
3. Existing project architecture.

Only add a dependency when there is a clear benefit.

When adding a dependency, explain:

* Why it is needed.
* What it solves.
* Whether it introduces security/performance considerations.

Do not add libraries simply for convenience.

---

# 23. Git Rules

Git history should remain clean and understandable.

## One Logical Change = One Commit

Examples:

```text
fix: stabilize contact form

feat: persist enquiries to firestore

feat: add enquiry email notification

feat: add firebase admin authentication

feat: add enquiry dashboard

feat: connect gallery to firestore
```

Avoid commits such as:

```text
update everything
changes
final
final2
fixed stuff
```

---

# 24. Commit Workflow

For every feature:

```text
Inspect
   ↓
Plan
   ↓
Implement
   ↓
Test
   ↓
Review diff
   ↓
Commit
   ↓
Push
```

Never commit blindly.

Before committing:

```bash
git status
git diff
```

Then run the relevant tests/build.

---

# 25. Git Safety

The AI must NOT run destructive commands without explicit approval.

Avoid:

```text
git reset --hard
git clean -fd
git push --force
```

Do not overwrite existing work.

If uncommitted changes already exist:

1. Inspect them.
2. Determine whether they belong to the current task.
3. Preserve them.
4. Do not blindly revert them.

---

# 26. Testing Rules

Every feature must be tested at the appropriate level.

For UI changes:

* Page loads.
* Navigation works.
* Mobile layout works.
* No obvious console errors.

For Firebase changes:

* Read works.
* Write works.
* Error handling works.
* Security rules behave correctly.

For authentication:

* Login works.
* Invalid login fails.
* Logout works.
* Protected routes are protected.

For enquiries:

```text
Submit
 ↓
Validate
 ↓
Save
 ↓
Email
 ↓
Admin Dashboard
 ↓
Update Status
```

The complete workflow must be tested.

---

# 27. Build Requirement

Before considering a phase complete:

```bash
npm run build
```

must succeed.

If the project has linting or testing configured, those checks should also pass.

---

# 28. Error Handling

Every external operation should have appropriate handling.

Examples:

```text
Firebase unavailable
Cloudinary upload failed
Email failed
Authentication failed
Network unavailable
Invalid form data
Empty Firestore collection
```

Do not show raw technical errors to normal website visitors.

User-facing messages should be understandable.

---

# 29. Loading States

Async operations should provide feedback.

Examples:

```text
Loading gallery...
Submitting enquiry...
Signing in...
Uploading image...
Deleting image...
Saving changes...
```

Do not leave users wondering whether an action worked.

---

# 30. Empty States

Every dynamic list should handle an empty state.

Example:

```text
No enquiries yet.
```

or:

```text
No photographs available in this category.
```

Never assume Firestore will always contain data.

---

# 31. Security Rules for AI

The AI must treat these as sensitive:

* Firebase service-account files
* Cloudinary secrets
* API keys that provide privileged access
* Email provider secrets
* Authentication credentials
* Environment secrets

Never:

* Print them into documentation.
* Commit them.
* Paste them into source code.
* Include them in GitHub issues.
* Include them in AI-generated reports.

---

# 32. Documentation Rules

Important architectural decisions should be documented.

Documentation should explain:

* What was implemented.
* Why it was implemented.
* How it works.
* Required environment variables.
* Required Firebase configuration.
* Required Cloudinary configuration.
* Deployment procedure.

Do not create documentation for trivial code changes.

---

# 33. Current Project Baseline

The initial audit identified the following important baseline:

* Public UI is partially complete.
* About page is the only currently wired Firebase/Cloudinary data flow.
* Enquiry persistence is not yet connected.
* Gallery data services exist but are incomplete/orphaned.
* No admin dashboard currently exists.
* No Firebase Authentication currently exists.
* Cloudinary is currently being used through a manual workflow.
* Gallery and Services pages require further implementation.
* Deployment configuration is not yet finalized.
* Overall project completion was estimated at approximately 30–35%.

These facts should be treated as the starting baseline and updated as development progresses.

---

# 34. Definition of a Completed Project

The project is considered complete when:

## Public Website

* [ ] Home complete
* [ ] About complete
* [ ] Gallery complete
* [ ] Weddings complete
* [ ] Couples complete
* [ ] Elopement Guides complete
* [ ] Services complete
* [ ] Pricing complete
* [ ] Contact complete
* [ ] Responsive across devices

## Enquiries

* [ ] Contact form works
* [ ] Enquiries stored in Firestore
* [ ] Email notifications work
* [ ] Enquiry statuses work
* [ ] Admin can manage enquiries

## Authentication

* [ ] Firebase Authentication implemented
* [ ] Admin login implemented
* [ ] Protected admin routes
* [ ] Logout
* [ ] Firestore rules enforce authorization

## Media

* [ ] Cloudinary integrated
* [ ] Image upload
* [ ] Image display
* [ ] Image update
* [ ] Image deletion
* [ ] Video support
* [ ] Categories
* [ ] Featured media
* [ ] Ordering

## Admin

* [ ] Admin dashboard
* [ ] Enquiry management
* [ ] Gallery management
* [ ] Media management
* [ ] Appropriate loading/error states

## Production

* [ ] Environment variables configured
* [ ] Security reviewed
* [ ] Production build succeeds
* [ ] Deployment configured
* [ ] Production website tested
* [ ] Documentation completed

---

# 35. What We Do NOT Want

This project should NOT become unnecessarily complicated.

Avoid:

* Microservices
* Kubernetes
* Complex backend infrastructure
* Multiple databases without a reason
* Unnecessary AI features
* Complex state management
* Over-engineered permissions
* Excessive dependencies
* Rewriting working code for style preferences
* Building features that the photographer does not need

The goal is a **clean, maintainable, professional photography website**, not an unnecessarily complicated enterprise platform.

---

# 36. Final Development Principle

Always prioritize:

```text
Correctness
    ↓
Security
    ↓
Reliability
    ↓
Maintainability
    ↓
User Experience
    ↓
Performance
    ↓
Extra Features
```

Do not sacrifice security or reliability just to add features faster.

---

# 37. AI Session Startup Rule

At the beginning of every new AI coding session:

1. Read this document.
2. Inspect the current Git status.
3. Inspect recent commits.
4. Understand the current phase.
5. Identify the specific task.
6. Inspect relevant existing code.
7. Propose the smallest safe implementation.
8. Wait for/receive approval where architectural decisions are involved.
9. Implement.
10. Test.
11. Review the diff.
12. Commit.
13. Push only when explicitly requested/approved.

---

# 38. Current Development Priority

Unless explicitly changed by the project owner, follow this order:

```text
1. Stabilize existing website
        ↓
2. Complete enquiry persistence
        ↓
3. Add enquiry email notification
        ↓
4. Add admin authentication
        ↓
5. Add enquiry dashboard
        ↓
6. Secure Firestore
        ↓
7. Build dynamic gallery/data layer
        ↓
8. Build full admin content management
        ↓
9. Integrate Cloudinary upload management
        ↓
10. Complete remaining public pages
        ↓
11. Production optimization
        ↓
12. Deployment
```

---

# 39. Project Owner Rule

The AI is responsible for assisting with implementation.

The project owner makes the final decisions regarding:

* Architecture
* Features
* Design
* Dependencies
* Deployment
* Security policies
* Data structure
* Cost
* Third-party services

When there are multiple valid approaches, the AI should explain the trade-offs and recommend one rather than silently choosing a major architectural direction.

---

# 40. Final Rule

## BUILD SMALL. TEST. COMMIT. PUSH. THEN CONTINUE.

Never attempt to build the entire project in one AI session.

Every major feature should become a verified checkpoint in Git.

The project should always remain in a recoverable state.
