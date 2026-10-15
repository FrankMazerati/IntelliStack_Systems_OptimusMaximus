-- Configurable enterprise department catalog.
-- Apply after creating an organization. Replace the example slug with the target organization's slug.
-- Example:
-- insert into public.organizations (name, slug) values ('Example Corporation','example-corp') on conflict (slug) do nothing;
-- Then replace 'example-corp' below with the organization slug.

with org as (
  select id from public.organizations where slug = 'example-corp'
), department_catalog(name, slug, department_type, description, sort_order) as (
  values
  ('Executive Leadership & Corporate Strategy','executive-strategy','executive','CEO office, board support, corporate strategy, enterprise performance, M&A, and business continuity',10),
  ('Finance, Accounting & Treasury','finance-accounting','finance','CFO office, accounting, AP/AR, budgets, forecasting, treasury, tax, expenses, and financial reporting',20),
  ('Human Resources & Workforce','human-resources','people','Recruiting, onboarding, employee records, benefits, performance, compensation, leave, and offboarding',30),
  ('Information Technology & Infrastructure','it-infrastructure','technology','Service desk, identity, endpoints, cloud, networking, applications, deployment, backup, and recovery',40),
  ('Cybersecurity, Risk & Compliance','cybersecurity-risk-compliance','security','SOC, incident response, threat intelligence, vulnerabilities, governance, audit, privacy, and controls',50),
  ('Business Operations & Service Delivery','business-operations','operations','Operational planning, service delivery, quality, resources, process improvement, and continuity',60),
  ('Sales, Marketing & Communications','sales-marketing','revenue','Sales pipeline, accounts, CRM, campaigns, brand, market research, PR, and internal communications',70),
  ('Legal, Privacy & Corporate Affairs','legal-privacy','legal','Contracts, legal matters, IP, privacy requests, regulatory obligations, retention, and corporate governance',80),
  ('Procurement, Vendors & Supply Chain','procurement-supply-chain','supply-chain','Purchasing, vendor onboarding, supplier risk, purchase orders, inventory, renewals, and procurement approvals',90),
  ('Product, Engineering & Innovation','product-engineering','engineering','Product management, software engineering, QA, R&D, roadmaps, releases, architecture, and innovation',100),
  ('Customer Experience & Customer Success','customer-experience','customer','Customer support, onboarding, complaints, service quality, feedback, retention, and satisfaction',110),
  ('Facilities, Physical Security & Workplace','facilities-workplace','facilities','Buildings, physical access, visitors, maintenance, workplace safety, fleet, and facilities requests',120),
  ('Project, Program & Portfolio Management','project-portfolio','delivery','Projects, programs, milestones, dependencies, resources, risks, issues, and portfolio reporting',130),
  ('Data, Analytics & Business Intelligence','data-analytics','data','Enterprise reporting, data governance, quality, dashboards, forecasting, analytics, and data engineering',140),
  ('Learning, Development & Organizational Effectiveness','learning-development','people','Training, certifications, skills, career development, organizational design, and change management',150),
  ('Manufacturing & Production','manufacturing-production','industry','Production planning, manufacturing operations, quality, maintenance, and plant performance',160),
  ('Logistics & Distribution','logistics-distribution','supply-chain','Warehousing, shipping, routing, distribution, and logistics performance',170),
  ('International & Regional Operations','regional-operations','operations','Regional teams, country operations, localization, and cross-region coordination',180),
  ('Environmental Health & Safety','environmental-health-safety','safety','Workplace safety, environmental obligations, incidents, inspections, and corrective actions',190),
  ('Investor Relations','investor-relations','corporate-affairs','Investor communications, earnings materials, disclosures coordination, and shareholder reporting',200),
  ('Research & Laboratory Operations','research-laboratory','research','Research programs, lab assets, protocols, results, and controlled research workflows',210),
  ('Franchise & Partner Management','franchise-partners','partners','Franchise operations, partner onboarding, agreements, compliance, and partner performance',220)
)
insert into public.departments(organization_id,name,slug,department_type,description,sort_order)
select org.id, c.name, c.slug, c.department_type, c.description, c.sort_order
from org cross join department_catalog c
on conflict (organization_id,slug) do update
set name=excluded.name,
    department_type=excluded.department_type,
    description=excluded.description,
    sort_order=excluded.sort_order;
