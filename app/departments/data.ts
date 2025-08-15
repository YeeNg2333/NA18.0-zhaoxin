export type Department = {
  slug: string;
  title: string;
  intro: string; // 列表页 2 句话
  details: string[]; // 详情页 4-5 句
  gradient?: string; // 占位封面渐变
  imageSrc?: string; // 可选封面图
  images?: string[]; // 详情页图片，多张按一列向下排列
};

export const departments: Department[] = [
  {
    slug: "tech",
    title: "技术部",
    intro:
      "我们探索前沿技术，推动内部工具与平台持续进化。团队关注工程质量与效率，致力于用技术创造业务价值。",
    details: [
      "技术部负责核心系统与基础设施的研发与维护，关注可扩展性、稳定性与安全性。",
      "我们倡导工程最佳实践与自动化，提升交付效率与质量。",
      "团队持续追踪行业趋势，进行技术预研与落地，形成可复制的工程能力。",
      "同时我们重视知识分享与培训，帮助团队成员跨越技术成长曲线。",
      "在复杂问题面前，保持好奇与务实，是我们的共识。",
    ],
    gradient: "from-primary/25 via-primary/10 to-background",
  },
  {
    slug: "secretary",
    title: "秘书部",
    intro:
      "我们负责统筹协调与流程管理，保障组织高效运转。以细致与专业为基础，打造顺畅协作体验。",
    details: [
      "秘书部负责日常运营支持、会议管理与跨部门协同，保证信息传递准确及时。",
      "我们优化流程、规范文档，提升组织的执行效率与可追溯性。",
      "在关键节点提供节奏把控与资源调度，降低沟通成本。",
      "以服务意识与责任心为核心价值，构建稳定可靠的支撑体系。",
    ],
    gradient: "from-secondary/25 via-secondary/10 to-background",
  },
  {
    slug: "publicity",
    title: "宣传部",
    intro:
      "我们打造品牌形象与内容叙事，传播组织价值与故事。用设计与表达增强外部影响力。",
    details: [
      "宣传部负责品牌视觉、内容策划与多渠道传播，统一传递价值和形象。",
      "我们从受众视角出发，构建清晰的信息结构与一致的设计语言。",
      "通过数据复盘与迭代优化，提升内容的触达与转化效果。",
      "与业务与产品密切协作，形成可持续的内容资产库。",
    ],
    gradient: "from-primary/20 via-secondary/10 to-background",
  },
  {
    slug: "outreach",
    title: "外联部",
    intro:
      "我们建立与维护外部合作关系，拓展资源与机会。以专业与诚信促成双赢合作。",
    details: [
      "外联部负责合作伙伴关系的拓展、维护与项目推进。",
      "我们评估合作价值与风险，构建标准化流程与评审机制。",
      "通过长期经营与持续沟通，建立互信与稳定的合作网络。",
      "注重结果与体验的平衡，推动合作落地并复盘沉淀。",
    ],
    gradient: "from-secondary/20 via-primary/10 to-background",
  },
  {
    slug: "resources",
    title: "资源部",
    intro:
      "我们统筹预算与物资资源，保障项目顺利推进。用数据化与制度化提升资源效率。",
    details: [
      "资源部负责预算管理、供应与资产台账，确保资源合理配置与可视化。",
      "我们建立标准与流程，提升采购与分发的透明度与时效。",
      "通过数据分析与预测，优化资源的利用率与库存健康。",
      "在保障的同时追求效率，形成可持续的资源管理体系。",
    ],
    gradient: "from-primary/15 via-secondary/10 to-background",
  },
];
