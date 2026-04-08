export interface WizardQuestion {
  id: string;
  key: string; // i18n key for question text
  stemOnly: boolean;
  critical: boolean; // "no" answer = critical issue
  noAdviceKey: string; // i18n key for advice when answer is "no"
}

export const WIZARD_QUESTIONS: WizardQuestion[] = [
  {
    id: 'q1',
    key: 'wizard.q1',
    stemOnly: false,
    critical: true,
    noAdviceKey: 'wizard.advice.q1no',
  },
  {
    id: 'q2',
    key: 'wizard.q2',
    stemOnly: false,
    critical: true,
    noAdviceKey: 'wizard.advice.q2no',
  },
  {
    id: 'q3',
    key: 'wizard.q3',
    stemOnly: false,
    critical: false,
    noAdviceKey: 'wizard.advice.q3no',
  },
  {
    id: 'q4',
    key: 'wizard.q4',
    stemOnly: false,
    critical: false,
    noAdviceKey: 'wizard.advice.q4no',
  },
  {
    id: 'q5',
    key: 'wizard.q5',
    stemOnly: false,
    critical: false,
    noAdviceKey: 'wizard.advice.q5no',
  },
  {
    id: 'q6',
    key: 'wizard.q6',
    stemOnly: false,
    critical: false,
    noAdviceKey: 'wizard.advice.q6no',
  },
  {
    id: 'q7',
    key: 'wizard.q7',
    stemOnly: false,
    critical: false,
    noAdviceKey: 'wizard.advice.q7no',
  },
  {
    id: 'q8',
    key: 'wizard.q8',
    stemOnly: true,
    critical: true,
    noAdviceKey: 'wizard.advice.q8no',
  },
  {
    id: 'q9',
    key: 'wizard.q9',
    stemOnly: true,
    critical: false,
    noAdviceKey: 'wizard.advice.q9no',
  },
  {
    id: 'q10',
    key: 'wizard.q10',
    stemOnly: false,
    critical: true,
    noAdviceKey: 'wizard.advice.q10no',
  },
];

// Advice strings for "no" answers
export const WIZARD_ADVICE: Record<string, { en: string; zh: string }> = {
  'wizard.advice.q1no': {
    en: 'You need a valid EAD card to work on OPT. If you have not yet applied, file Form I-765. If your card is lost or stolen, apply for a replacement.',
    zh: '你需要有效的EAD卡才能在OPT期间工作。如果你还没有申请，请提交I-765表格。如果卡片丢失或被盗，请申请补办。',
  },
  'wizard.advice.q2no': {
    en: 'If your EAD authorization dates have not started yet, you cannot begin working. If they have passed, your OPT period has ended. Check if you are in a grace period or cap-gap extension.',
    zh: '如果你的EAD授权日期尚未开始，你还不能开始工作。如果已经过了，你的OPT期限已结束。检查你是否在宽限期或Cap-Gap延期中。',
  },
  'wizard.advice.q3no': {
    en: 'Every day without qualifying employment counts toward your unemployment limit (90 days standard / 150 days STEM). Find qualifying employment as soon as possible.',
    zh: '每一天没有符合条件的工作都会计入你的失业限制（标准90天/STEM 150天）。请尽快找到符合条件的工作。',
  },
  'wizard.advice.q4no': {
    en: 'Work under 20 hours per week does NOT stop the unemployment clock. You need at least 20 hours per week of qualifying employment.',
    zh: '每周不到20小时的工作不能停止失业计时。你需要每周至少20小时的符合条件的工作。',
  },
  'wizard.advice.q5no': {
    en: 'OPT employment must be directly related to your field of study. Work unrelated to your major does not count as qualifying employment and your unemployment days continue to accrue.',
    zh: 'OPT工作必须与你的专业直接相关。与专业无关的工作不算符合条件的工作，你的失业天数将继续累积。',
  },
  'wizard.advice.q6no': {
    en: 'You must report your employer to your DSO within 10 days. Unreported employment is treated as unemployment in SEVIS. Report via the SEVP Portal or contact your DSO immediately.',
    zh: '你必须在10天内向DSO报告你的雇主。未报告的工作在SEVIS中被视为失业。请立即通过SEVP门户报告或联系DSO。',
  },
  'wizard.advice.q7no': {
    en: 'You must report address changes within 10 days. Update your address in the SEVP Portal and notify your DSO. Also file Form AR-11 with USCIS.',
    zh: '你必须在10天内报告地址变更。在SEVP门户更新地址并通知DSO。同时向USCIS提交AR-11表格。',
  },
  'wizard.advice.q8no': {
    en: 'CRITICAL: Your employer MUST be enrolled in E-Verify for STEM OPT. Without it, your employer cannot sign Form I-983 and your STEM OPT is not valid. Contact your DSO immediately.',
    zh: '紧急：你的雇主必须注册E-Verify才能用于STEM OPT。没有注册，雇主无法签署I-983表格，你的STEM OPT无效。请立即联系DSO。',
  },
  'wizard.advice.q9no': {
    en: 'Form I-983 is required for STEM OPT. Work with your employer to complete and submit it to your DSO as soon as possible.',
    zh: 'STEM OPT需要I-983表格。请尽快与雇主一起完成并提交给DSO。',
  },
  'wizard.advice.q10no': {
    en: 'CRITICAL: Exceeding the unemployment limit results in automatic SEVIS termination and loss of F-1 status. Contact your DSO or an immigration attorney immediately.',
    zh: '紧急：超过失业限制将导致SEVIS自动终止和F-1身份丧失。请立即联系DSO或移民律师。',
  },
};
