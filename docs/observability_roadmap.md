# Observability Implementation Roadmap

This document outlines the strategic roadmap for implementing professional-grade observability in the **My Roadmap** project. These tasks are designed to build real-world skills in logging, monitoring, tracing, and reliability engineering.

---

## 🏗️ Phase 1: High-Cardinality Structured Logging
**Goal**: Move from simple `console.log` to searchable, high-performance JSON logs.

### Issue Draft: `feat: implement structured logging with CloudWatch Insights support`
- **Context**: Standard logs are hard to filter. We need structured logs for better searchability in CloudWatch.
- **Tasks**:
  - [ ] Install and configure `pino` for Next.js (Server Components/Actions) and Lambda.
  - [ ] Implement a unified logging utility in `web/src/lib/logger.ts`.
  - [ ] Add `request_id`, `user_id`, and `correlation_id` to all logs.
  - [ ] Configure log retention (14 days) in CloudWatch Groups via CDK.
- **Skills to Master**:
  - High-cardinality data management.
  - CloudWatch Logs Insights query syntax.
  - Performance impact of logging in high-traffic apps.

---

## 📈 Phase 2: Real User Monitoring (RUM) & Performance
**Goal**: Understand user experience beyond the server.

### Issue Draft: `feat: integrate AWS CloudWatch RUM for client-side observability`
- **Context**: Most user issues happen in the browser. RUM provides visibility into JS errors and page load times.
- **Tasks**:
  - [ ] Provision CloudWatch RUM App Monitor via AWS Console/CLI (or CDK).
  - [ ] Integrate the RUM snippet into the Next.js `layout.tsx`.
  - [ ] Set up custom events for key user actions (e.g., "Task Created").
  - [ ] Monitor Core Web Vitals (LCP, FID, CLS).
- **Skills to Master**:
  - Client-side performance metrics.
  - Tracking user journeys without violating privacy.
  - Mapping client errors to server traces.

---

## 🔍 Phase 3: Distributed Tracing & Distributed Logic
**Goal**: Visualize the end-to-end request lifecycle.

### Issue Draft: `feat: enable distributed tracing with AWS X-Ray`
- **Context**: Identifying which component (AppSync, Lambda, DynamoDB) is causing latency.
- **Tasks**:
  - [ ] Enable X-Ray tracing on AppSync API and Lambda functions in `web/amplify/backend.ts`.
  - [ ] Use AWS X-Ray SDK to create subsegments for specific logic blocks.
  - [ ] Visualize traces in the CloudWatch Service Map.
- **Skills to Master**:
  - Trace propagation (W3C Trace Context).
  - Bottleneck identification in serverless architectures.
  - Profiling API latency.

---

## 🛡️ Phase 4: Reliability Engineering (SLI/SLO)
**Goal**: Define "Healthy" and alert on "Unhealthy".

### Issue Draft: `feat: define SLIs/SLOs and implement CloudWatch Dashboards`
- **Context**: We need to know when we are failing our users.
- **Tasks**:
  - [ ] Define **Service Level Indicators (SLIs)**: API Success Rate, P95 Latency.
  - [ ] Set **Service Level Objectives (SLOs)**: 99.9% Success Rate.
  - [ ] Create a "Mission Control" CloudWatch Dashboard.
  - [ ] Configure composite alarms for critical failures.
- **Skills to Master**:
  - SRE (Site Reliability Engineering) principles.
  - Designing actionable alerts (avoiding alert fatigue).
  - Dashboard design for operational excellence.

---

## 📝 How to Use These Drafts
1. Copy the title and content of an issue draft.
2. Create a new GitHub Issue in this repository.
3. Use the implementation steps as your checklist.
4. Move from Phase 1 to Phase 4 sequentially for the best learning experience.
