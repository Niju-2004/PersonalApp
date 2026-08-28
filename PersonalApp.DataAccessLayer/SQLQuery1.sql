USE PersonalDashboardDB;
GO

INSERT INTO Tasks (UserId, Title, Description, Priority, Status, DueDate, CompletedAt)
VALUES
    -- 5 Rows for UserId = 1
    (1, 'Setup Database', 'Create tables and initial schema', 'High', 'Completed', '2026-03-01', '2026-03-01 10:30:00'),
    (1, 'Build Authentication API', 'Implement JWT login and registration', 'High', 'In Progress', '2026-03-05', NULL),
    (1, 'Design Dashboard UI', 'Create wireframes for user analytics', 'Medium', 'Pending', '2026-03-10', NULL),
    (1, 'Write Unit Tests', 'Add test coverage for user services', 'Low', 'Pending', '2026-03-15', NULL),
    (1, 'Deploy to Staging', 'Configure CI/CD pipeline deployment', 'Medium', 'Pending', '2026-03-20', NULL),

    -- 5 Rows for UserId = 2
    (3, 'Client Onboarding Call', 'Initial requirements gathering discussion', 'High', 'Completed', '2026-03-02', '2026-03-02 15:00:00'),
    (3, 'Prepare Project Proposal', 'Draft scope of work and timeline', 'High', 'In Progress', '2026-03-06', NULL),
    (3, 'Review Security Audit', 'Check compliance reports and vulnerabilities', 'Medium', 'Pending', '2026-03-12', NULL),
    (3, 'Update Documentation', 'Document REST API endpoints in Swagger', 'Low', 'Pending', '2026-03-18', NULL),
    (3, 'Quarterly Budget Planning', 'Estimate cloud infrastructure costs', 'Medium', 'Pending', '2026-03-25', NULL);
GO

INSERT INTO JobApplications (UserId, CompanyName, JobTitle, JobUrl, AppliedDate, Status, Salary, InterviewDate, Notes)
VALUES
    -- 5 Rows for UserId = 1
    (1, 'Google', 'Software Engineer', 'https://careers.google.com/jobs/101', '2026-08-01', 'Interviewing', 125000.00, '2026-09-02 14:00:00', 'Passed technical screening, preparing for system design round.'),
    (1, 'Microsoft', 'Backend Developer', 'https://careers.microsoft.com/jobs/202', '2026-08-05', 'Applied', 115000.00, NULL, 'Applied via employee referral.'),
    (1, 'Amazon', 'Full Stack Developer', 'https://amazon.jobs/en/jobs/303', '2026-08-10', 'Interviewing', 130000.00, '2026-08-30 11:30:00', 'OA completed, scheduled for hiring manager chat.'),
    (1, 'Spotify', 'Data Engineer', 'https://www.lifeatspotify.com/jobs/404', '2026-08-12', 'Rejected', 110000.00, NULL, 'Received automated rejection after resume review.'),
    (1, 'Stripe', 'API Platform Engineer', 'https://stripe.com/jobs/505', '2026-08-18', 'Offer', 140000.00, '2026-08-25 16:00:00', 'Received written offer, currently reviewing benefits.'),

    -- 5 Rows for UserId = 2
    (3, 'Netflix', 'Product Manager', 'https://jobs.netflix.com/jobs/601', '2026-08-02', 'Interviewing', 150000.00, '2026-09-05 10:00:00', 'Portfolio review round scheduled.'),
    (3, 'Meta', 'Frontend Engineer', 'https://metacareers.com/jobs/702', '2026-08-08', 'Applied', 120000.00, NULL, 'Applied on LinkedIn.'),
    (3, 'Uber', 'iOS Developer', 'https://uber.com/careers/803', '2026-08-14', 'Applied', 128000.00, NULL, 'Tailored resume for Swift/SwiftUI experience.'),
    (3, 'Airbnb', 'UI/UX Engineer', 'https://careers.airbnb.com/positions/904', '2026-08-15', 'Rejected', 118000.00, NULL, 'Position closed internally.'),
    (3, 'Adobe', 'Cloud Systems Engineer', 'https://adobe.com/careers/1005', '2026-08-20', 'Interviewing', 122000.00, '2026-09-01 15:30:00', 'Initial HR recruiter call.');
GO

select * from Tasks;