# Test Documents for Semantic Document Intelligence

This folder contains sample documents for testing the system.

## Creating Test Documents

### 1. Engineering Document
Create a text file with this content and save as PDF:

```
TECHNICAL SPECIFICATION DOCUMENT

Project: Cloud Infrastructure Migration
Department: Engineering

Overview:
This document outlines the technical requirements for migrating our on-premises infrastructure to a cloud-based solution. The migration will involve moving all application servers, databases, and storage systems to AWS.

Technical Requirements:
- Migrate 50 virtual machines to EC2 instances
- Set up RDS databases for all SQL workloads
- Implement S3 for object storage
- Configure VPC with proper security groups
- Set up CloudWatch monitoring and alerting

Architecture:
The new architecture will utilize a multi-tier approach with separate VPCs for development, staging, and production environments. All environments will be isolated using network ACLs and security groups.

Timeline:
Phase 1: Infrastructure setup (2 weeks)
Phase 2: Data migration (3 weeks)
Phase 3: Testing and validation (2 weeks)
Phase 4: Production cutover (1 week)
```

### 2. Safety Document (with Alerts)
```
WORKPLACE SAFETY INCIDENT REPORT

Date: November 17, 2025
Department: Safety
Report ID: SR-2025-1117

URGENT - IMMEDIATE ACTION REQUIRED

Incident Description:
A hazardous chemical spill occurred in Building A, Room 205 at 2:30 PM today. Approximately 2 liters of sulfuric acid was spilled due to improper storage container failure.

Safety Hazards Identified:
- Chemical exposure risk to personnel
- Inadequate storage containers being used
- Lack of proper safety signage in chemical storage area
- Missing secondary containment systems

Immediate Actions Taken:
- Area evacuated immediately
- Emergency response team notified
- Spill contained using neutralization kit
- Air quality monitoring initiated

Required Follow-up Actions (URGENT):
1. Replace all chemical storage containers within 48 hours
2. Install secondary containment systems in all chemical storage areas
3. Mandatory safety training for all personnel handling chemicals
4. Update safety protocols and signage
5. Conduct full safety audit of all storage facilities

Risk Level: HIGH
Regulatory Compliance: This incident must be reported to OSHA within 24 hours

This situation requires immediate attention to prevent future incidents and ensure workplace safety.
```

### 3. HR Document
```
EMPLOYEE BENEFITS PACKAGE OVERVIEW

Human Resources Department
Effective Date: January 1, 2026

Introduction:
This document outlines the comprehensive benefits package available to all full-time employees. We are committed to providing competitive benefits that support our employees' health, wellness, and financial security.

Health Benefits:
- Medical insurance with multiple plan options
- Dental coverage including preventive care
- Vision insurance with annual eye exams
- Mental health support and counseling services
- Employee Assistance Program (EAP)

Financial Benefits:
- 401(k) retirement plan with 5% company match
- Life insurance coverage (2x annual salary)
- Disability insurance (short-term and long-term)
- Flexible Spending Accounts (FSA)
- Health Savings Accounts (HSA)

Time Off:
- 20 days paid vacation annually
- 10 paid holidays per year
- Sick leave as needed
- Parental leave (12 weeks paid)
- Bereavement leave

Professional Development:
- Annual training budget of $2,000 per employee
- Tuition reimbursement program
- Conference attendance opportunities
- Mentorship programs

Enrollment:
New employees must enroll in benefits within 30 days of hire date. Annual open enrollment occurs in November each year.

For questions, contact HR at benefits@company.com
```

### 4. Regulatory/Compliance Document
```
REGULATORY COMPLIANCE REPORT
Q4 2025

Regulatory Affairs Department

Executive Summary:
This quarterly compliance report summarizes our adherence to federal and state regulations, upcoming regulatory deadlines, and compliance initiatives.

Regulatory Framework:
Our organization is subject to the following regulatory requirements:
- FDA 21 CFR Part 11 (Electronic Records)
- HIPAA Privacy and Security Rules
- SOX (Sarbanes-Oxley) Financial Reporting
- GDPR (Data Protection)
- ISO 27001 Information Security

Current Compliance Status:
✓ All FDA submissions up to date
✓ HIPAA audit completed - no findings
✓ SOX controls tested and certified
✓ GDPR data processing agreements renewed
✗ ISO 27001 recertification pending

URGENT REGULATORY DEADLINES:
1. FDA Annual Report - Due December 15, 2025
2. SOX Certification - Due December 31, 2025
3. ISO 27001 Audit - Scheduled January 10, 2026
4. GDPR Data Protection Impact Assessment - Due January 31, 2026

Non-Compliance Risks Identified:
- Delayed ISO recertification could affect client contracts
- Missing the FDA deadline would result in $10,000 daily penalties
- SOX certification delay could trigger financial audit

Required Actions:
1. Complete ISO documentation by November 30
2. Submit FDA annual report by December 10 (5-day buffer)
3. Finalize SOX testing by December 20
4. Begin GDPR assessment by December 1

Compliance Training:
All employees must complete annual compliance training by December 31, 2025. Current completion rate: 78%

This report highlights several time-sensitive regulatory requirements that require immediate attention to maintain compliance and avoid penalties.
```

## How to Use These Test Documents

1. Copy any of the above content
2. Paste into a Word document or text editor
3. Save as PDF
4. Upload to the system
5. Select the appropriate department
6. Compare system's prediction with your selection

## Expected Results

- **Engineering Doc**: Should classify as "Engineering" with high confidence
- **Safety Doc**: Should classify as "Safety" AND trigger multiple alerts (urgent, safety hazards, risk)
- **HR Doc**: Should classify as "HR" with high confidence
- **Regulatory Doc**: Should classify as "Regulatory" AND trigger alerts (regulatory deadlines, compliance)

## Testing Misfiling Detection

Upload the Safety document but select "HR" as the department. The system should:
- Predict "Safety" department
- Flag as misfiled
- Provide reason explaining the mismatch

---

Save this guide for reference when testing the system!
