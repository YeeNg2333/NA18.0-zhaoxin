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
    imageSrc: "/images/uploads/tech_party.jpeg"
  },
  {
    slug: "secretary",
    title: "秘书部",
    intro:
      "秘书部是中心的枢纽部门，连接着宣传、外联、资源等各部门，是一个融合管理运营与温馨社群的独特团体。",
    details: [
      "我们不仅是保障校园网络稳定运行的幕后力量，更是汇聚创意与友爱的大家庭。",
      "我们以“交友”为导向，坚信轻松愉快的氛围能激发最高效率。部门活动丰富多元： ",
      "・文化休闲：组织集体观影，共享感动；",
      "・温情时刻：举办生日会，传递家一般的温暖；",
        "・户外挑战：夜爬白云山、素质拓展，锤炼意志也加深友谊；",
        "・才华舞台：参与晚会筹办，展示才艺、锻炼表达。",
        "在这里，你将收获： ",
      "・管理与领导能力：从策划到执行，全面激发潜力；",
      "・沟通与协调能力：在跨部门协作中大幅提升；",
      "・深厚同窗情谊：结识志同道合、并肩成长的伙伴；",
      "・难忘大学回忆：每一次欢笑都是璀璨篇章。",
    ],
    gradient: "from-secondary/25 via-secondary/10 to-background",
    imageSrc: "/images/uploads/sec.jpg"
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
    imageSrc: "/images/uploads/pro.jpg"
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
    imageSrc: "/images/uploads/com1.jpg"
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
