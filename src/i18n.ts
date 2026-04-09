export type Lang = 'en' | 'zh';

interface Strings {
  [key: string]: { en: string; zh: string };
}

export const strings: Strings = {
  // App
  'app.name': { en: 'GongYi', zh: 'GongYi' },
  'app.subtitle': { en: '工易', zh: '工易' },
  'app.tagline': { en: 'OPT Work Authorization Tracker', zh: 'OPT工作许可追踪器' },

  // Nav
  'nav.dashboard': { en: 'Dashboard', zh: '控制台' },
  'nav.unemployment': { en: 'Unemployment Counter', zh: '失业天数计算' },
  'nav.stemCheck': { en: 'STEM Eligibility', zh: 'STEM资格查询' },
  'nav.everify': { en: 'E-Verify Guide', zh: 'E-Verify指南' },
  'nav.timeline': { en: 'Timeline', zh: '时间线' },
  'nav.statusWizard': { en: 'Status Check', zh: '身份检查' },
  'nav.reporting': { en: 'Reporting', zh: '报告清单' },
  'nav.i983': { en: 'I-983 Guide', zh: 'I-983指南' },
  'nav.calendar': { en: 'Calendar Export', zh: '日历导出' },

  // Language toggle
  'lang.switch': { en: '中文', zh: 'EN' },

  // Dashboard
  'dashboard.title': { en: 'Your OPT Status', zh: '你的OPT状态' },
  'dashboard.setupCta': { en: 'Set up your tracker', zh: '设置你的追踪器' },
  'dashboard.setupDesc': { en: 'Enter your OPT dates to start tracking unemployment days', zh: '输入你的OPT日期开始追踪失业天数' },
  'dashboard.daysRemaining': { en: 'days remaining', zh: '天剩余' },
  'dashboard.daysUsed': { en: 'days used', zh: '天已用' },
  'dashboard.of': { en: 'of', zh: '/' },
  'dashboard.tools': { en: 'Tools', zh: '工具' },
  'dashboard.reference': { en: 'Quick Reference', zh: '快速参考' },

  // Dashboard cards
  'card.unemployment.title': { en: 'Unemployment Counter', zh: '失业天数计算' },
  'card.unemployment.desc': { en: 'Track your unemployment days against the 90/150-day limit', zh: '追踪你的失业天数（90/150天限制）' },
  'card.stemCheck.title': { en: 'STEM OPT Eligibility', zh: 'STEM OPT资格查询' },
  'card.stemCheck.desc': { en: 'Check if your CIP code qualifies for STEM OPT extension', zh: '查询你的CIP代码是否符合STEM OPT延期' },
  'card.everify.title': { en: 'E-Verify Employer Guide', zh: 'E-Verify雇主指南' },
  'card.everify.desc': { en: 'How to verify your employer is enrolled in E-Verify', zh: '如何确认你的雇主已注册E-Verify' },
  'card.timeline.title': { en: 'Timeline & Deadlines', zh: '时间线和截止日期' },
  'card.timeline.desc': { en: 'Calculate key OPT dates and upcoming deadlines', zh: '计算关键OPT日期和即将到来的截止日期' },
  'card.statusWizard.title': { en: 'Am I In Status?', zh: '我的身份合规吗？' },
  'card.statusWizard.desc': { en: 'Step-by-step check of your F-1 OPT compliance', zh: '逐步检查你的F-1 OPT合规状态' },
  'card.reporting.title': { en: 'Reporting Checklist', zh: '报告清单' },
  'card.reporting.desc': { en: 'Track what you need to report to your DSO and SEVP Portal', zh: '追踪你需要向DSO和SEVP门户报告的事项' },
  'card.i983.title': { en: 'I-983 Training Plan', zh: 'I-983培训计划' },
  'card.i983.desc': { en: 'Section-by-section guide to completing Form I-983', zh: '逐节指导如何填写I-983表格' },
  'card.calendar.title': { en: 'Calendar Export', zh: '日历导出' },
  'card.calendar.desc': { en: 'Export key deadlines to your calendar app', zh: '将关键截止日期导出到你的日历应用' },
  'card.about.title': { en: 'About GongYi', zh: '关于工易' },
  'card.about.desc': { en: 'Free, private, bilingual OPT compliance tool', zh: '免费、隐私、双语OPT合规工具' },
  'card.resources.title': { en: 'Official Resources', zh: '官方资源' },
  'card.resources.desc': { en: 'Links to USCIS, ICE SEVP, and SEVP Portal', zh: 'USCIS、ICE SEVP和SEVP门户链接' },
  'card.privacy.title': { en: 'Your Data is Private', zh: '你的数据是私密的' },
  'card.privacy.desc': { en: 'All data stays in your browser. No accounts, no servers, no tracking.', zh: '所有数据保存在浏览器中。无账户、无服务器、无跟踪。' },

  // Common
  'common.back': { en: 'Back to Dashboard', zh: '返回控制台' },
  'common.save': { en: 'Save', zh: '保存' },
  'common.cancel': { en: 'Cancel', zh: '取消' },
  'common.delete': { en: 'Delete', zh: '删除' },
  'common.edit': { en: 'Edit', zh: '编辑' },
  'common.add': { en: 'Add', zh: '添加' },
  'common.yes': { en: 'Yes', zh: '是' },
  'common.no': { en: 'No', zh: '否' },
  'common.next': { en: 'Next', zh: '下一步' },
  'common.previous': { en: 'Previous', zh: '上一步' },
  'common.download': { en: 'Download', zh: '下载' },
  'common.reset': { en: 'Reset', zh: '重置' },
  'common.current': { en: 'Current', zh: '至今' },

  // Disclaimer
  'disclaimer.text': { en: 'For informational purposes only. This is not legal advice. Consult your DSO or an immigration attorney for guidance specific to your situation.', zh: '仅供参考。这不构成法律建议。请咨询你的DSO或移民律师以获取针对你具体情况的指导。' },
  'disclaimer.government': { en: 'This tool is not affiliated with, endorsed by, or operated by USCIS, DHS, ICE, or any government agency.', zh: '本工具与USCIS、DHS、ICE或任何政府机构无关联、无背书、无运营关系。' },

  // Unemployment counter
  'unemployment.title': { en: 'Unemployment Day Counter', zh: '失业天数计算器' },
  'unemployment.optType': { en: 'OPT Type', zh: 'OPT类型' },
  'unemployment.standard': { en: 'Standard OPT (90-day limit)', zh: '标准OPT（90天限制）' },
  'unemployment.stem': { en: 'STEM OPT (150-day limit)', zh: 'STEM OPT（150天限制）' },
  'unemployment.eadStart': { en: 'EAD Start Date', zh: 'EAD开始日期' },
  'unemployment.eadEnd': { en: 'EAD End Date', zh: 'EAD结束日期' },
  'unemployment.saveSetup': { en: 'Save OPT Information', zh: '保存OPT信息' },
  'unemployment.employment': { en: 'Employment Periods', zh: '工作时段' },
  'unemployment.addEmployment': { en: 'Add Employment Period', zh: '添加工作时段' },
  'unemployment.employer': { en: 'Employer Name', zh: '雇主名称' },
  'unemployment.startDate': { en: 'Start Date', zh: '开始日期' },
  'unemployment.endDate': { en: 'End Date', zh: '结束日期' },
  'unemployment.currentJob': { en: 'Currently employed here', zh: '目前在此工作' },
  'unemployment.hoursPerWeek': { en: 'Hours per Week', zh: '每周工时' },
  'unemployment.relatedToField': { en: 'Related to field of study?', zh: '与专业相关？' },
  'unemployment.qualifying': { en: 'Qualifying', zh: '有效' },
  'unemployment.nonQualifying': { en: 'Non-qualifying', zh: '无效' },
  'unemployment.nonQualifyingReason': { en: 'Less than 20 hrs/week — does not stop the unemployment clock', zh: '每周不足20小时——不能停止失业计时' },
  'unemployment.daysRemaining': { en: 'unemployment days remaining', zh: '失业天剩余' },
  'unemployment.daysUsed': { en: 'unemployment days used', zh: '失业天已用' },
  'unemployment.limit': { en: 'day limit', zh: '天限制' },
  'unemployment.warningBanner': { en: 'Warning: Less than 15 unemployment days remaining. Find qualifying employment soon.', zh: '警告：剩余失业天数不足15天。请尽快找到符合要求的工作。' },
  'unemployment.criticalBanner': { en: 'Critical: You have reached or exceeded the unemployment limit. Contact your DSO immediately.', zh: '紧急：你已达到或超过失业天数限制。请立即联系你的DSO。' },
  'unemployment.rulesTitle': { en: 'Counting Rules Reference', zh: '计算规则参考' },
  'unemployment.rule1': { en: 'The unemployment clock starts on your EAD start date, not when you receive the card.', zh: '失业计时从你的EAD开始日期算起，而不是你收到卡的日期。' },
  'unemployment.rule2': { en: 'Every calendar day without qualifying employment counts — including weekends and holidays.', zh: '没有合格工作的每一个日历日都算——包括周末和假期。' },
  'unemployment.rule3': { en: 'The count is cumulative (aggregate), not consecutive. Getting a new job pauses the clock but does not reset it.', zh: '计数是累积的（合计），不是连续的。找到新工作会暂停计时但不会重置。' },
  'unemployment.rule4': { en: 'Work must be at least 20 hours/week and related to your field of study to stop the clock.', zh: '工作必须每周至少20小时且与专业相关才能停止计时。' },
  'unemployment.rule5': { en: 'STEM OPT extends the limit from 90 to 150 days total (includes initial OPT days).', zh: 'STEM OPT将限制从90天延长到总共150天（包括初始OPT期间的天数）。' },
  'unemployment.rule6': { en: 'Days spent abroad while unemployed still count as unemployment days.', zh: '失业期间在国外的天数仍然算作失业天数。' },
  'unemployment.citation': { en: 'Source: 8 CFR 214.2(f)(10)(ii)(E)', zh: '来源：8 CFR 214.2(f)(10)(ii)(E)' },

  // STEM check
  'stem.title': { en: 'STEM OPT Eligibility Checker', zh: 'STEM OPT资格查询器' },
  'stem.search': { en: 'Search by CIP code or program name', zh: '按CIP代码或专业名称搜索' },
  'stem.searchPlaceholder': { en: 'e.g., 11.0101 or Computer Science', zh: '例如：11.0101 或 Computer Science' },
  'stem.eligible': { en: 'STEM OPT Eligible', zh: 'STEM OPT合格' },
  'stem.notEligible': { en: 'Not on STEM List', zh: '不在STEM清单上' },
  'stem.notEligibleDesc': { en: 'This CIP code is not on the DHS STEM Designated Degree Program List. You may not qualify for the 24-month STEM OPT extension with this degree.', zh: '该CIP代码不在DHS STEM指定学位项目清单上。你可能无法凭此学位申请24个月的STEM OPT延期。' },
  'stem.additionalChecks': { en: 'Additional Eligibility Factors', zh: '其他资格因素' },
  'stem.sevpSchool': { en: 'Is your degree from a SEVP-certified school?', zh: '你的学位来自SEVP认证学校吗？' },
  'stem.employerEverify': { en: 'Is your employer enrolled in E-Verify?', zh: '你的雇主注册了E-Verify吗？' },
  'stem.relatedJob': { en: 'Will your job be directly related to your STEM degree?', zh: '你的工作与STEM学位直接相关吗？' },
  'stem.likelyQualify': { en: 'You likely qualify for the STEM OPT extension', zh: '你很可能符合STEM OPT延期资格' },
  'stem.mayNotQualify': { en: 'You may not qualify — consult your DSO', zh: '你可能不符合资格——请咨询你的DSO' },
  'stem.lastUpdated': { en: 'STEM list last updated: July 23, 2024', zh: 'STEM清单最后更新：2024年7月23日' },
  'stem.sourceLink': { en: 'View official DHS STEM list', zh: '查看官方DHS STEM清单' },
  'stem.noResults': { en: 'No matching programs found', zh: '未找到匹配的项目' },

  // E-Verify
  'everify.title': { en: 'E-Verify Employer Guide', zh: 'E-Verify雇主指南' },
  'everify.intro': { en: 'E-Verify is required for STEM OPT employers. Use the official search tool to check if your employer is enrolled.', zh: 'E-Verify是STEM OPT雇主的强制要求。使用官方搜索工具检查你的雇主是否已注册。' },
  'everify.searchLink': { en: 'Search E-Verify Employers (Official)', zh: '搜索E-Verify雇主（官方）' },
  'everify.stepsTitle': { en: 'How to Search', zh: '如何搜索' },
  'everify.step1': { en: 'Go to the E-Verify Employer Search page', zh: '访问E-Verify雇主搜索页面' },
  'everify.step2': { en: 'Enter the company name (try variations: full legal name, DBA, parent company)', zh: '输入公司名称（尝试不同写法：全称、DBA名、母公司名）' },
  'everify.step3': { en: 'Look for "Active" status — this means the employer is currently enrolled', zh: '查找"Active"状态——这意味着雇主当前已注册' },
  'everify.step4': { en: 'Check the enrollment date — it should be before your STEM OPT start date', zh: '检查注册日期——应在你的STEM OPT开始日期之前' },
  'everify.tipsTitle': { en: 'Tips for Common Issues', zh: '常见问题提示' },
  'everify.tip1': { en: 'Company name variations: Try "Inc.", "LLC", "Corp.", or omit these suffixes', zh: '公司名称变体：尝试"Inc."、"LLC"、"Corp."或省略这些后缀' },
  'everify.tip2': { en: 'Subsidiaries: A subsidiary may have a different E-Verify registration than the parent company', zh: '子公司：子公司可能与母公司有不同的E-Verify注册' },
  'everify.tip3': { en: 'Multiple locations: Some companies register each office separately', zh: '多个地点：有些公司每个办公室单独注册' },
  'everify.tip4': { en: 'Not found? Ask your employer\'s HR department for their E-Verify Company ID number', zh: '找不到？请向雇主的HR部门询问他们的E-Verify公司ID号' },
  'everify.whyTitle': { en: 'Why E-Verify Matters for STEM OPT', zh: '为什么E-Verify对STEM OPT很重要' },
  'everify.whyText': { en: 'Under 8 CFR 214.16, your employer must be enrolled in E-Verify to hire a STEM OPT worker. Without E-Verify enrollment, your employer cannot sign Form I-983, and your STEM OPT application will be denied.', zh: '根据8 CFR 214.16，你的雇主必须注册E-Verify才能雇用STEM OPT员工。没有E-Verify注册，你的雇主无法签署I-983表格，你的STEM OPT申请将被拒绝。' },
  'everify.checklistTitle': { en: 'Before Accepting a STEM OPT Position', zh: '接受STEM OPT职位之前' },
  'everify.check1': { en: 'Employer is enrolled in E-Verify', zh: '雇主已注册E-Verify' },
  'everify.check2': { en: 'Employer will provide proper supervision', zh: '雇主将提供适当的监督' },
  'everify.check3': { en: 'Job is directly related to your STEM degree', zh: '工作与你的STEM学位直接相关' },
  'everify.check4': { en: 'Position is at least 20 hours per week', zh: '职位每周至少20小时' },
  'everify.check5': { en: 'Compensation is commensurate with U.S. workers in similar roles', zh: '薪酬与类似职位的美国员工相当' },

  // Timeline
  'timeline.title': { en: 'Timeline & Deadline Calculator', zh: '时间线和截止日期计算器' },
  'timeline.programEnd': { en: 'Program End Date', zh: '项目结束日期' },
  'timeline.optStart': { en: 'OPT Start Date (EAD)', zh: 'OPT开始日期（EAD）' },
  'timeline.optType': { en: 'OPT Type', zh: 'OPT类型' },
  'timeline.stemStart': { en: 'STEM OPT Start Date', zh: 'STEM OPT开始日期' },
  'timeline.h1bFiled': { en: 'H-1B petition filed?', zh: '是否已递交H-1B申请？' },
  'timeline.h1bDate': { en: 'H-1B Filing Date', zh: 'H-1B递交日期' },
  'timeline.calculate': { en: 'Calculate Timeline', zh: '计算时间线' },
  'timeline.optWindow': { en: 'OPT Application Window', zh: 'OPT申请窗口' },
  'timeline.optPeriod': { en: 'OPT Authorization Period', zh: 'OPT授权期间' },
  'timeline.stemWindow': { en: 'STEM Extension Filing Window', zh: 'STEM延期申请窗口' },
  'timeline.gracePeriod': { en: '60-Day Grace Period', zh: '60天宽限期' },
  'timeline.capGap': { en: 'Cap-Gap Extension', zh: 'Cap-Gap延期' },
  'timeline.validation': { en: '6-Month Validation Report', zh: '6个月验证报告' },
  'timeline.eval12': { en: 'I-983 12-Month Evaluation', zh: 'I-983 12个月评估' },
  'timeline.eval24': { en: 'I-983 24-Month Evaluation', zh: 'I-983 24个月评估' },
  'timeline.today': { en: 'Today', zh: '今天' },
  'timeline.past': { en: 'Past', zh: '已过' },
  'timeline.upcoming': { en: 'Upcoming', zh: '即将到来' },
  'timeline.future': { en: 'Future', zh: '未来' },
  'timeline.daysAway': { en: 'days away', zh: '天后' },
  'timeline.daysAgo': { en: 'days ago', zh: '天前' },

  // Status wizard
  'wizard.title': { en: 'Am I In Status?', zh: '我的身份合规吗？' },
  'wizard.intro': { en: 'Answer these questions to check your F-1 OPT compliance. One question at a time.', zh: '回答这些问题来检查你的F-1 OPT合规状态。每次一个问题。' },
  'wizard.start': { en: 'Start Check', zh: '开始检查' },
  'wizard.stepOf': { en: 'Step {current} of {total}', zh: '第{current}步，共{total}步' },
  'wizard.q1': { en: 'Do you have a valid EAD (Employment Authorization Document) card?', zh: '你有有效的EAD（工作许可证）卡吗？' },
  'wizard.q2': { en: 'Is today within your EAD authorization dates?', zh: '今天在你的EAD授权日期范围内吗？' },
  'wizard.q3': { en: 'Are you currently employed?', zh: '你目前在工作吗？' },
  'wizard.q4': { en: 'Is your employment at least 20 hours per week?', zh: '你的工作每周至少20小时吗？' },
  'wizard.q5': { en: 'Is your work related to your field of study?', zh: '你的工作与你的专业领域相关吗？' },
  'wizard.q6': { en: 'Have you reported your current employer to your DSO?', zh: '你已经向DSO报告了当前雇主吗？' },
  'wizard.q7': { en: 'Is your address up to date with your DSO?', zh: '你的地址在DSO那里是最新的吗？' },
  'wizard.q8': { en: 'Is your employer enrolled in E-Verify? (STEM OPT only)', zh: '你的雇主注册了E-Verify吗？（仅STEM OPT）' },
  'wizard.q9': { en: 'Do you have a current I-983 Training Plan on file? (STEM OPT only)', zh: '你有当前的I-983培训计划存档吗？（仅STEM OPT）' },
  'wizard.q10': { en: 'Are you under the unemployment day limit (90 standard / 150 STEM)?', zh: '你的失业天数在限制之内吗（标准90天/STEM 150天）？' },
  'wizard.resultGreen': { en: 'Likely In Status', zh: '身份可能合规' },
  'wizard.resultGreenDesc': { en: 'Based on your answers, you appear to be maintaining your F-1 OPT status. Continue to monitor your unemployment days and reporting deadlines.', zh: '根据你的回答，你似乎在维持你的F-1 OPT身份。请继续监控你的失业天数和报告截止日期。' },
  'wizard.resultAmber': { en: 'Action Needed', zh: '需要采取行动' },
  'wizard.resultAmberDesc': { en: 'Some issues were identified that may affect your status. Review the items below and take action soon.', zh: '发现了一些可能影响你身份的问题。请查看以下项目并尽快采取行动。' },
  'wizard.resultRed': { en: 'Critical Issues — Contact Your DSO Immediately', zh: '严重问题——请立即联系你的DSO' },
  'wizard.resultRedDesc': { en: 'Critical compliance issues were found. Contact your DSO or an immigration attorney as soon as possible.', zh: '发现严重的合规问题。请尽快联系你的DSO或移民律师。' },
  'wizard.restart': { en: 'Start Over', zh: '重新开始' },

  // Reporting
  'reporting.title': { en: 'DSO Reporting Checklist', zh: 'DSO报告清单' },
  'reporting.intro': { en: 'During OPT, you must report changes within 10 days. Check off items as you complete them.', zh: 'OPT期间，你必须在10天内报告变更。完成后请勾选。' },
  'reporting.dualReminder': { en: 'Important: You must report to BOTH the SEVP Portal AND your DSO separately.', zh: '重要：你必须分别向SEVP门户和你的DSO报告。' },
  'reporting.standardTitle': { en: 'Standard OPT Reporting', zh: '标准OPT报告' },
  'reporting.stemTitle': { en: 'STEM OPT Additional Reporting', zh: 'STEM OPT额外报告' },
  'reporting.item1': { en: 'Employment start — report within 10 days', zh: '开始工作——10天内报告' },
  'reporting.item1Detail': { en: 'Report employer name, address, start date, and how the job relates to your field of study via the SEVP Portal or your DSO.', zh: '通过SEVP门户或DSO报告雇主名称、地址、开始日期以及工作与你专业的关系。' },
  'reporting.item2': { en: 'Employment end — report within 10 days', zh: '工作结束——10天内报告' },
  'reporting.item2Detail': { en: 'Update the end date for your employer. Do NOT delete the employer record — just add an end date.', zh: '更新雇主的结束日期。不要删除雇主记录——只需添加结束日期。' },
  'reporting.item3': { en: 'Employer change — report within 10 days', zh: '更换雇主——10天内报告' },
  'reporting.item3Detail': { en: 'Report the end of the old job AND the start of the new job. For STEM OPT, submit a new Form I-983.', zh: '报告旧工作结束和新工作开始。对于STEM OPT，需提交新的I-983表格。' },
  'reporting.item4': { en: 'Address change — report within 10 days', zh: '地址变更——10天内报告' },
  'reporting.item4Detail': { en: 'Update your residential address via the SEVP Portal or notify your DSO. Also file Form AR-11 with USCIS.', zh: '通过SEVP门户更新你的居住地址或通知DSO。同时向USCIS提交AR-11表格。' },
  'reporting.item5': { en: 'Name change — report to DSO', zh: '姓名变更——向DSO报告' },
  'reporting.item5Detail': { en: 'Contact your DSO directly with legal documentation of the name change.', zh: '携带姓名变更的法律文件直接联系DSO。' },
  'reporting.item6': { en: 'Phone/email change — update in SEVP Portal', zh: '电话/邮箱变更——在SEVP门户更新' },
  'reporting.item6Detail': { en: 'Update your contact information in the SEVP Portal.', zh: '在SEVP门户更新你的联系信息。' },
  'reporting.item7': { en: '6-month validation report — every 6 months from STEM start', zh: '6个月验证报告——从STEM开始每6个月' },
  'reporting.item7Detail': { en: 'Confirm your name, address, employer, and employment status are still correct. Complete via SEVP Portal or DSO.', zh: '确认你的姓名、地址、雇主和就业状态仍然正确。通过SEVP门户或DSO完成。' },
  'reporting.item8': { en: '12-month self-evaluation — within 10 days of 12-month mark', zh: '12个月自我评估——12个月标记后10天内' },
  'reporting.item8Detail': { en: 'Complete and submit the self-evaluation section of Form I-983. Both you and your supervisor must sign.', zh: '完成并提交I-983表格的自我评估部分。你和你的主管都必须签名。' },
  'reporting.item9': { en: '24-month final evaluation — within 10 days of STEM OPT end', zh: '24个月最终评估——STEM OPT结束后10天内' },
  'reporting.item9Detail': { en: 'Complete and submit the final self-evaluation. Covers the entire 24-month STEM OPT period.', zh: '完成并提交最终自我评估。涵盖整个24个月STEM OPT期间。' },
  'reporting.item10': { en: 'Material change to I-983 — report at earliest opportunity', zh: 'I-983重大变更——尽早报告' },
  'reporting.item10Detail': { en: 'Submit a new I-983 when: employer EIN changes, compensation is reduced, hours decrease significantly, or learning objectives change.', zh: '在以下情况提交新的I-983：雇主EIN变更、薪酬减少、工时显著减少或学习目标变更。' },
  'reporting.stemStartDate': { en: 'STEM OPT Start Date (for deadline calculation)', zh: 'STEM OPT开始日期（用于计算截止日期）' },
  'reporting.nextDeadline': { en: 'Next deadline', zh: '下一个截止日期' },
  'reporting.completedOf': { en: '{done} of {total} items complete', zh: '{done}/{total}项已完成' },

  // I-983 guide
  'i983.title': { en: 'I-983 Training Plan Guide', zh: 'I-983培训计划指南' },
  'i983.intro': { en: 'Form I-983 is required for all STEM OPT students. Here is a section-by-section guide to help you and your employer complete it correctly.', zh: 'I-983表格是所有STEM OPT学生的必填表格。以下是逐节指南，帮助你和你的雇主正确填写。' },
  'i983.formLink': { en: 'Download Official Form I-983 (PDF)', zh: '下载官方I-983表格（PDF）' },
  'i983.section1Title': { en: 'Section 1: Student Information', zh: '第一部分：学生信息' },
  'i983.section1Content': { en: 'Fill in your personal information exactly as it appears on your I-20 and EAD card. Include your SEVIS ID, school name, and CIP code from your I-20.', zh: '按照I-20和EAD卡上的信息如实填写个人信息。包括你的SEVIS ID、学校名称和I-20上的CIP代码。' },
  'i983.section2Title': { en: 'Section 2: Student Certification', zh: '第二部分：学生认证' },
  'i983.section2Content': { en: 'You are certifying that you understand your STEM OPT obligations: reporting requirements, maintaining status, and agreeing to the training plan.', zh: '你在此证明你理解STEM OPT的义务：报告要求、维持身份和同意培训计划。' },
  'i983.section3Title': { en: 'Section 3: Employer Information', zh: '第三部分：雇主信息' },
  'i983.section3Content': { en: 'Your employer fills this section. Required: company legal name, EIN, E-Verify Company ID, supervisor name and contact info, worksite address.', zh: '此部分由雇主填写。需要：公司法定名称、EIN、E-Verify公司ID、主管姓名和联系方式、工作地点地址。' },
  'i983.section4Title': { en: 'Section 4: Training Plan Details', zh: '第四部分：培训计划详情' },
  'i983.section4Content': { en: 'The most important section. Describe specific learning objectives, how they relate to your STEM degree, supervision methods, and how progress will be measured.', zh: '最重要的部分。描述具体的学习目标、它们与STEM学位的关系、监督方法以及如何衡量进步。' },
  'i983.section5Title': { en: 'Section 5: Employer Certification', zh: '第五部分：雇主认证' },
  'i983.section5Content': { en: 'Your employer signs here, certifying they will provide the described training, maintain E-Verify enrollment, and comply with DHS reporting requirements.', zh: '你的雇主在此签名，证明他们将提供所述培训、保持E-Verify注册并遵守DHS报告要求。' },
  'i983.evalTitle': { en: 'Evaluation Pages', zh: '评估页面' },
  'i983.evalContent': { en: 'Complete evaluations at 12 months and 24 months (or at the end of STEM OPT). Both student and supervisor must sign. Submit to your DSO within 10 days of each milestone.', zh: '在12个月和24个月（或STEM OPT结束时）完成评估。学生和主管都必须签名。在每个里程碑后10天内提交给DSO。' },
  'i983.objectiveTemplate': { en: 'Learning Objective Template', zh: '学习目标模板' },
  'i983.objectiveExample': { en: 'Develop [skill] through [method] in the field of [STEM connection]', zh: '通过[方法]在[STEM关联]领域发展[技能]' },
  'i983.materialChangesTitle': { en: 'Material Changes Requiring New I-983', zh: '需要新I-983的重大变更' },
  'i983.materialChange1': { en: 'Change of employer or employer\'s EIN', zh: '更换雇主或雇主EIN变更' },
  'i983.materialChange2': { en: 'Change in job title or duties', zh: '职位名称或职责变更' },
  'i983.materialChange3': { en: 'Significant decrease in hours per week', zh: '每周工时显著减少' },
  'i983.materialChange4': { en: 'Change in worksite location', zh: '工作地点变更' },
  'i983.materialChange5': { en: 'Reduction in compensation not tied to reduced hours', zh: '非因减少工时而导致的薪酬降低' },
  'i983.materialChange6': { en: 'Changes to learning objectives or training goals', zh: '学习目标或培训目标变更' },
  'i983.employerFaqTitle': { en: 'Employer FAQ', zh: '雇主常见问题' },
  'i983.faq1q': { en: 'What is Form I-983?', zh: '什么是I-983表格？' },
  'i983.faq1a': { en: 'A training plan that documents the practical training opportunity for STEM OPT students. It is required by DHS regulations (8 CFR 214.16).', zh: '一份记录STEM OPT学生实践培训机会的培训计划。这是DHS法规（8 CFR 214.16）要求的。' },
  'i983.faq2q': { en: 'Am I liable for anything?', zh: '我需要承担什么责任吗？' },
  'i983.faq2a': { en: 'You are certifying that you will provide the described training and maintain E-Verify enrollment. DHS may conduct site visits to verify compliance.', zh: '你在证明你将提供所述培训并保持E-Verify注册。DHS可能会进行现场检查以验证合规性。' },
  'i983.faq3q': { en: 'How much time does this take?', zh: '这需要多长时间？' },
  'i983.faq3a': { en: 'The initial form typically takes 30-60 minutes for the employer sections. Annual evaluations take about 15-30 minutes.', zh: '雇主部分的初始表格通常需要30-60分钟。年度评估大约需要15-30分钟。' },

  // Calendar export
  'calendar.title': { en: 'Calendar Export', zh: '日历导出' },
  'calendar.intro': { en: 'Export your OPT deadlines to your calendar app as .ics files. Works with Apple Calendar, Google Calendar, and Outlook.', zh: '将你的OPT截止日期导出到日历应用（.ics文件）。适用于Apple日历、Google日历和Outlook。' },
  'calendar.noData': { en: 'No dates saved yet. Set up your OPT information in the Timeline tool first.', zh: '尚未保存日期。请先在时间线工具中设置你的OPT信息。' },
  'calendar.goToTimeline': { en: 'Go to Timeline', zh: '前往时间线' },
  'calendar.downloadAll': { en: 'Download All Deadlines', zh: '下载所有截止日期' },
  'calendar.downloadSingle': { en: 'Download', zh: '下载' },
  'calendar.optExpiration': { en: 'OPT Expiration', zh: 'OPT到期' },
  'calendar.stemDeadline': { en: 'STEM OPT Filing Deadline', zh: 'STEM OPT申请截止' },
  'calendar.graceEnd': { en: 'Grace Period End', zh: '宽限期结束' },
  'calendar.capGapEnd': { en: 'Cap-Gap Extension End', zh: 'Cap-Gap延期结束' },

  // Status indicators
  'status.safe': { en: 'On Track', zh: '正常' },
  'status.warn': { en: 'Action Needed', zh: '需要行动' },
  'status.critical': { en: 'Act Now', zh: '立即行动' },
  'status.notSetUp': { en: 'Not Set Up', zh: '未设置' },

  // About
  'about.title': { en: 'About GongYi 工易', zh: '关于GongYi 工易' },
  'about.description': { en: 'GongYi 工易 ("Work Made Easy") is a free, bilingual work authorization tracker for F-1 international students on OPT. All data stays in your browser.', zh: 'GongYi 工易是一个免费的双语工作许可追踪工具，专为F-1国际学生的OPT设计。所有数据保存在浏览器中。' },
  'about.privacy': { en: 'All your data stays in your browser. No accounts, no servers, no tracking.', zh: '你所有的数据都保存在浏览器中。没有账户、没有服务器、没有跟踪。' },
  'about.source': { en: 'Data sources: DHS STEM Designated Degree Program List (July 2024), 8 CFR 214.2(f), USCIS Policy Manual.', zh: '数据来源：DHS STEM指定学位项目清单（2024年7月）、8 CFR 214.2(f)、USCIS政策手册。' },

  // Error boundary
  'error.render': { en: 'Something went wrong loading this page.', zh: '加载此页面时出错。' },
  'error.goHome': { en: 'Go to Dashboard', zh: '前往控制台' },

  // Resources
  'resources.uscis': { en: 'USCIS OPT Information', zh: 'USCIS OPT信息' },
  'resources.sevpPortal': { en: 'SEVP Portal (Student)', zh: 'SEVP门户（学生）' },
  'resources.stemList': { en: 'DHS STEM List (PDF)', zh: 'DHS STEM清单（PDF）' },
  'resources.everifySearch': { en: 'E-Verify Employer Search', zh: 'E-Verify雇主搜索' },
  'resources.i983Form': { en: 'Form I-983 (PDF)', zh: 'I-983表格（PDF）' },

  // Data management
  'privacy.clearData': { en: 'Clear All Saved Data', zh: '清除所有保存的数据' },
  'privacy.clearConfirm': { en: 'Are you sure? This will delete all your saved OPT information, employment periods, and settings.', zh: '确定吗？这将删除你所有保存的OPT信息、工作时段和设置。' },
  'privacy.cleared': { en: 'All data cleared.', zh: '所有数据已清除。' },

  // Wizard result next steps
  'wizard.nextSteps': { en: 'Helpful tools', zh: '有用的工具' },

  // STEM next steps
  'stem.nextSteps': { en: 'Next steps', zh: '下一步' },
  'stem.nextStep1': { en: 'Check your employer\'s E-Verify status', zh: '检查雇主的E-Verify状态' },
  'stem.nextStep2': { en: 'Set up your timeline and deadlines', zh: '设置你的时间线和截止日期' },
  'stem.nextStep3': { en: 'Review the I-983 form guide', zh: '查看I-983表格指南' },
};

function getSavedLang(): Lang {
  try { return (localStorage.getItem('gongyi-lang') as Lang) || 'en'; }
  catch { return 'en'; }
}
let currentLang: Lang = getSavedLang();

export function t(key: string, params?: Record<string, string | number>): string {
  const entry = strings[key];
  if (!entry) return key;
  let text = entry[currentLang] || entry.en;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  localStorage.setItem('gongyi-lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

export function toggleLang(): void {
  setLang(currentLang === 'en' ? 'zh' : 'en');
}
